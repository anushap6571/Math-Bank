import time
from datetime import datetime
from flask import Flask, jsonify, request, send_from_directory, Response
from flask_cors import CORS
from basic_math import BasicMath
from advanced_math import AdvancedMath
from equation_solver import EquationSolver
from graph import Graph
from matrix import multiply_matrices, rref, determinant
from flask_sqlalchemy import SQLAlchemy
from user import db, User
from history_section import HistorySection
import json

import os
import logging
logging.basicConfig(level=logging.DEBUG)

# math bank controller

app = Flask(__name__)
CORS(app, supports_credentials=True, resources={r"/*": {"origins": "http://localhost:3000"}}) 

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'

db.init_app(app)

history = HistorySection(user="Guest") # global var

def create_tables():
    db.create_all()

@app.route('/logInReq', methods = ['POST'])
def logInReq():
    global history
    try:
        data = request.get_json()
        print(f"recieved data: {data}")

        testUser = data['username'] # passed username
        testPassword = data['password'] # passed password
        user = User.query.filter_by(username=testUser).first()

        # print("user password = ", user.password) #actual password behind the username

        if user and (user.password == testPassword):
             history = HistorySection(user=user)
             return jsonify({'Log In Successful' : True}), 200
        else:
             return jsonify({'Username or Password invalid' : False}), 200

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': str(e)}), 500
        


@app.route('/sign-up', methods = ['POST'])
def signup():
    try:
        data = request.get_json()

        new_user = User(username=data['username'], email=data['email'], password=data['password'])  # attributes of the user class
        db.session.add(new_user)
        db.session.commit()
        print(f"User created: {new_user}")
        return jsonify({'message': 'User created successfully'}), 201           # confirmation
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/savenotes', methods=['POST'])
def save_notes():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"message": "No data provided"}), 400

        currentUser = data['tempUsername']
        print("current user: ", currentUser)

        user = User.query.filter_by(username=currentUser).first()  # For simplicity, get the first user
        if user:
            user.notes = json.dumps(data['notesList'])  # Save notes as a JSON string
            db.session.commit()
            print("users notes after commit: ", user.notes)
            return jsonify({"message": "Notes saved successfully"}), 200
        else:
            return jsonify({"message": "User not found"}), 404
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": str(e)}), 500

@app.route('/getnotes/<username>', methods = ['GET'])
def get_notes(username):
    try:
        user = User.query.filter_by(username=username).first()
        if user:
            notes = json.loads(user.notes) if user.notes else []
            return jsonify({"notesList": notes}), 200
        else:
            return jsonify({"message": "User not found"}), 404
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": str(e)}), 500

basic_math = BasicMath()
advanced_math = AdvancedMath()
equation_solver = EquationSolver()
graph = Graph()




@app.route('/history', methods=['GET'])
def get_history():
    try:
        #app.logger.info("Fetching history")
        
        history_entries = history.get_all_hist()  # Retrieve history entries
        if not history_entries:
            return jsonify({'history': []}), 200  # Return an empty list if no history

        #app.logger.info(f"Retrieved {len(history_entries)} entries")
        
        # Format the history data to send to the client
        history_data = [{'input': entry['input'], 'output': entry['output'], 'topic': entry['topic'], 'date': entry['date']} for entry in history_entries]
        
        return jsonify({'history': history_data}), 200

    except Exception as e:
        app.logger.error(f"Error: {e}")
        return jsonify({'error': str(e)}), 500


def add_history_entry(input_expr, output, topic):
    history.add_entry(input=input_expr, output=output, topic=topic)
    return {
        'input': input_expr,
        'output': output,
        'topic': topic,
        'date': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    }

# all logic for calculator page routing
@app.route('/calculator', methods=['POST'])
def calculate():

    data = request.get_json()
    expression = data.get('expression')
    isDegreeMode = data.get('isDegreeMode')
    print(expression)

    try:
        # (Rohan) - In code below adding these 2 lines should link advanced_math.py but not adding right now since untested
        if any(func in expression for func in ['sin', 'cos', 'tan', 'log', 'ln', 'sqrt', '^', '|', '!', 'π', 'e']):
            #print("is going to advanced math")
            result = advanced_math.process(expression, isDegreeMode)
            history_entry = add_history_entry(expression, result, "Advanced Math")
        else:
            result = basic_math.process(expression)
            history_entry = add_history_entry(expression, result, "Basic Math")
    
        
        print(f"\nDEBUG STMT: {expression} = {result} added to history.\n")
        #print("\nCurrent history:")
        #history.print_all_entries()
    
        return jsonify({'result': result, 'history_entry': history_entry})
        
    except ZeroDivisionError:
        history_entry = add_history_entry(expression, 'Cannot divide by zero', "Error")
        return jsonify({'error': 'Cannot divide by zero', 'history_entry': history_entry}), 400
    except Exception as e:
        history_entry = add_history_entry(expression, 'Invalid expression', "Error")
        return jsonify({'error': 'Invalid expression', 'history_entry': history_entry}), 400

    



@app.route('/calculator/equation', methods=['POST'])
def equation():
    data = request.get_json()
    expression = data.get('expression')

    # Check if expression is provided
    if not expression:
        return jsonify({'error': 'No equation provided'}), 400
    
    # Implement your equation solving logic here
    solutions = equation_solver.solve_equation(expression)  # Replace this with actual solving logic
    history.add_entry(input=expression, output=solutions, topic="Equation Solving")
    
    return jsonify({'solutions': solutions})



@app.route('/assets/<path:filename>')
def send_assets(filename):
    return send_from_directory('assets', filename)

@app.route('/calculator/graph', methods=['POST'])
def plot_equation():
    data = request.get_json()
    equation = data.get('expression')

    if not equation:
        return jsonify({"error": "No equation provided"}), 400

    try:
        result = graph.plot_equation(equation)
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 400


@app.route('/calculator/matrix_multiply', methods=['POST'])
def matrix_multiply():
    data = request.get_json()
    matrix_a = data.get('matrixA')
    matrix_b = data.get('matrixB')
    result = multiply_matrices(matrix_a, matrix_b)
    return jsonify(result)

@app.route('/calculator/matrix_rref', methods=['POST'])
def matrix_rref():
    data = request.get_json()
    matrix = data.get('matrix')
    result = rref(matrix)
    return jsonify(result)

@app.route('/calculator/matrix_determinant', methods=['POST'])
def matrix_determinant():
    data = request.get_json()
    matrix = data.get('matrix')
    result = determinant(matrix)
    return jsonify(result)




if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
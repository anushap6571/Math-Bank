from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
from basic_math import BasicMath
from advanced_math import AdvancedMath
from equation_solver import EquationSolver
from graph import Graph
from matrix import multiply_matrices, rref, determinant
from flask_sqlalchemy import SQLAlchemy
from user import db, User

import os

# math bank controller

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}}) 


app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'


db.init_app(app)

def create_tables():
    db.create_all()

@app.route('/logInReq', methods = ['POST'])
def logInReq():
    try:
        data = request.get_json()
        print(f"recieved data: {data}")

        testUser = data['username'] # passed username
        testPassword = data['password'] # passed password
        user = User.query.filter_by(username=testUser).first()

        # print("user password = ", user.password) #actual password behind the username

        if user and (user.password == testPassword):
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


basic_math = BasicMath()
advanced_math = AdvancedMath()
equation_solver = EquationSolver()
graph = Graph()

# all logic for calculator page
@app.route('/calculator', methods=['POST'])
def calculate():
    data = request.get_json()
    expression = data.get('expression')
    print(expression)

    try:
        # (Rohan) - In code below adding these 2 lines should link advanced_math.py but not adding right now since untested
        if any(func in expression for func in ['sin', 'cos', 'tan', 'log', 'ln', 'sqrt', '^', '|', '!', 'π', 'e', '%']):
            print("is going to advanced math")
            result = advanced_math.process(expression)
        else:
            result = basic_math.process(expression)
        return jsonify({'result': result})
    except ZeroDivisionError:
        return jsonify({'error': 'Cannot divide by zero'}), 400
    except Exception as e:
        return jsonify({'error': 'Invalid expression'}), 400




@app.route('/calculator/equation', methods=['POST'])
def equation():
    data = request.get_json()
    expression = data.get('expression')

    # Check if expression is provided
    if not expression:
        return jsonify({'error': 'No equation provided'}), 400
    
    # Implement your equation solving logic here
    solutions = equation_solver.solve_equation(expression)  # Replace this with actual solving logic
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



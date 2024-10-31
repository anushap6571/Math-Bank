from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
from basic_math import BasicMath
from advanced_math import AdvancedMath
from equation_solver import EquationSolver
from graph import Graph
import os

# math bank controller 

app = Flask(__name__)
CORS(app)

basic_math = BasicMath()
advanced_math = AdvancedMath()
equation_solver = EquationSolver()
graph = Graph()

# all logic for calculator page
@app.route('/calculator', methods=['POST'])
def calculate():
    data = request.get_json()
    expression = data.get('expression')

    try:
        # (Rohan) - In code below adding these 2 lines should link advanced_math.py but not adding right now since untested
        if any(func in expression for func in ['sin', 'cos', 'tan', 'abs', 'log', 'ln', 'sqrt', '^']):
            result = advanced_math.process(expression)
        elif any(func in expression for func in ['x']):
            result = equation_solver.process(expression)
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

if __name__ == "__main__":
    app.run(debug=True)
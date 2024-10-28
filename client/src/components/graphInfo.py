#Zayd Kazi code for UC 19  
from flask import Flask, request, jsonify
from sympy import symbols, Eq, solve
import sympy as sp
app = Flask(__name__)

@app.route('/calculate', methods=['POST'])
def calculate_intercepts():
    try:
        data = request.json
        equation = data.get('equation')

        # Define x and y as symbols
        x, y = symbols('x y')

        # Parse the equation
        eq = sp.sympify(equation)

        # Find x and y intercepts
        x_intercept = solve(Eq(eq.subs(y, 0), 0), x)
        y_intercept = eq.subs(x, 0)

        return jsonify({
            'x_intercept': [float(val) for val in x_intercept],
            'y_intercept': float(y_intercept)
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
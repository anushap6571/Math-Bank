from flask import Flask, jsonify, request
from flask_cors import CORS
from basic_math import BasicMath
from advanced_math import AdvancedMath

# math bank controller 

app = Flask(__name__)
CORS(app)

basic_math = BasicMath()
advanced_math = AdvancedMath()

# all logic for calculator page
@app.route('/calculator', methods=['POST'])
def calculate():
    data = request.get_json()
    expression = data.get('expression')

    try:
        # using eval for demonstration; be cautious with eval() in production
        # (Rohan) - In code below adding these 2 lines should link advanced_math.py but not adding right now since untested
        #if any(func in expression for func in ['sin', 'cos', 'tan', 'abs', 'log', 'ln', 'sqrt']):
            #result = advanced_math.process(expression)
        result = basic_math.process(expression)
        return jsonify({'result': result})
    except ZeroDivisionError:
        return jsonify({'error': 'Cannot divide by zero.'}), 400
    except Exception as e:
        return jsonify({'error': 'Invalid expression.'}), 400





if __name__ == "__main__":
    app.run(debug=True)
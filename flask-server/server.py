from flask import Flask, jsonify, request
from flask_cors import CORS
from basic_math import BasicMath

# math bank controller 

app = Flask(__name__)
CORS(app)

basic_math = BasicMath()

# all logic for calculator page
@app.route('/calculator', methods=['POST'])
def calculate():
    data = request.get_json()
    expression = data.get('expression')

    try:
        # using eval for demonstration; be cautious with eval() in production
        result = basic_math.process(expression)
        return jsonify({'result': result})
    except ZeroDivisionError:
        return jsonify({'error': 'Cannot divide by zero.'}), 400
    except Exception as e:
        return jsonify({'error': 'Invalid expression.'}), 400





if __name__ == "__main__":
    app.run(debug=True)
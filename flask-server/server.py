from flask import Flask, jsonify, request
from flask_cors import CORS
from basic_math import BasicMath

app = Flask(__name__)
CORS(app)

math_ops = BasicMath()


@app.route('/calculator', methods=['POST'])
def calculate():
    data = request.json
    operation = data.get('operation')
    a = data.get('a')
    b = data.get('b')

    try:
        if operation == 'add':
            result = math_ops.add(a, b)
        elif operation == 'subtract':
            result = math_ops.subtract(a, b)
        elif operation == 'multiply':
            result = math_ops.multiply(a, b)
        elif operation == 'divide':
            result = math_ops.divide(a, b)
        else:
            return jsonify({'error': 'Invalid operation'}), 400

        return jsonify({'result': result})
    except ValueError as e:
        return jsonify({'error': str(e)}), 400





if __name__ == "__main__":
    app.run(debug=True)
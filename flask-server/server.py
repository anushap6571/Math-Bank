from flask import Flask, jsonify, request
from flask_cors import CORS
from basic_math import BasicMath
from flask_sqlalchemy import SQLAlchemy
# math bank controller

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}}) 

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
db = SQLAlchemy(app)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(25), unique =True, nullable = False)
    email = db.Column(db.String(30), unique = True, nullable = False)
    password = db.Column(db.String(120), nullable = False)


@app.route('/sign-up', methods = ['POST'])
def signup():
    #print ("Sign Up EP hit")
    try:
        data = request.get_json()

        new_user = User(username=data['username'], email=data['email'], password=data['password'])  # attributes of the user class
        db.session.add(new_user)
        db.session.commit()
        print(f"User created: {new_user}")
        return jsonify({'message': 'User created successfully'}), 201           # confirmation
    except Exception as e:
        #print ("error statement hit")
        print(f"Error: {e}")
        return jsonify({'error': str(e)}), 500


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
    with app.app_context():
        db.create_all()
    app.run(debug=True)



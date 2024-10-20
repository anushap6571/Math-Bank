from flask import Flask

app = Flask(__name__)

# define the page on the website
@app.route('/home_page')
def home_page():
    return "hello world"




if __name__ == "__main__":
    app.run(debug=True)
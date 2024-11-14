from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)

    '''
    def __init__(self, username, email, password):
        self.username = username
        self.email = email
        self.password = password

    # Accessors
    @property
    def getUsername(self):
        return self.username
    
    @property
    def getEmail(self):
        return self.email
    
    @property
    def getPassword(self):
        return self.password
    
    # Mutators
    @username.setter
    def username(self, username):
        self.username = username

    @email.setter
    def email(self, email):
        self.email = email

    @password.setter
    def password(self, password):
        self.password = password
    '''
# Diego Jimenez DAJ220000: Database for all user information
from server import app
from user import User
from server import db  # Import the SQLAlchemy instance

def query_users():
    users = User.query.all()
    for user in users:  # Prints all of the users in the database
        print(f"ID: {user.id}, Username: {user.username}, Email: {user.email}, Password: {user.password}")
        if user.notes:
            print(user.notes)

def delete_user_by_username(username):
    user = User.query.filter_by(username=username).first()
    if user:
        db.session.delete(user)
        db.session.commit()

if __name__ == "__main__":
    with app.app_context():
        query_users()
       #delete_user_by_username("test2")  # Delete the user with username "test"

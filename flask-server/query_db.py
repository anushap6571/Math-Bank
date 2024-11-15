# Diego Jimenez DAJ220000: Database for all user information
from server import app
from user import User
def query_users():
    users = User.query.all()
    for user in users:          # prints all of the users in database
        print(f"ID: {user.id}, Username: {user.username}, Email: {user.email}, Password: {user.password}")


if __name__ == "__main__":
    with app.app_context():
        query_users()

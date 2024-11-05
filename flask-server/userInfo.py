# userInfo.py

class UserInfo:
    def __init__(self, username=None, password=None):
        self._username = username
        self._password = password
        self.history = []  # This will store all history data
        self.notes = []    # This will store all notes data

    # Getter for username
    def get_username(self):
        return self._username

    # Setter for username
    def set_username(self, username):
        self._username = username

    # Getter for password
    def get_password(self):
        return self._password

    # Setter for password
    def set_password(self, password):
        self._password = password

    # Method to add history data
    def add_history(self, item):
        self.history.append(item)

    # Method to get all history data
    def get_history(self):
        return self.history

    # Method to add a note
    def add_note(self, note):
        self.notes.append(note)

    # Method to get all notes
    def get_notes(self):
        return self.notes

# Example usage:
# user = UserInfo()
# user.set_username("JohnDoe")
# user.set_password("SecurePass123")
# user.add_history("Calculated square root of 16")
# user.add_note("Remember to double-check calculations")

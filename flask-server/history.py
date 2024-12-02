# Alex Bowwman
# History Model

from datetime import datetime
import uuid
from . import db  # Import db instance

# History model for managing user history
class History(db.Model):
    id = db.Column(db.String(36), primary_key=True)  # Unique entry ID (UUID)
    input = db.Column(db.String(500), nullable=False)
    output = db.Column(db.String(500), nullable=False)
    topic = db.Column(db.String(100), nullable=False)
    date = db.Column(db.String(100), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    
    # Back reference to User
    user = db.relationship('User', back_populates="history_entries")

    def __init__(self, input, output, topic, date=None):
        self.id = str(uuid.uuid4())  # Generate a unique UUID for the entry
        self.input = input
        self.output = output
        self.topic = topic
        self.date = date or datetime.now().strftime('%Y-%m-%d %H:%M:%S')



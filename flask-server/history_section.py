# History Section Class
# Written by Alex Bowman

### Notes ###
    # del_all_hist is a method that should only be called if a user has decided
# decided to deactivate their account, because it will delete all their history. 
    # del_entry and get_entry should be called when the user browses the history
# and selects the entry they want to visit. Therefore these methods should never
# return False or None because the user views only entries that exist in history. 

from datetime import datetime # to get current date and time
from collections import defaultdict # helps with nested dict
import uuid # for unique id generation

class HistorySection:
    def __init__(self, user):
        self.user = user

        # Until a database is implemented, a dictionary is to store a user's history
        # Entries are store by topic, then date/session.
        self.history = defaultdict(lambda: defaultdict(dict))


    # Add an entry to the user's history. Assign a unique ID to the entry.
    def add_entry(self, input, output, topic, date=None):
        entry_id = str(uuid.uuid4())  # unique ID assignent
        date = date or datetime.now().strftime('%Y-%m-%d %H:%M:%S')

        # Create entry.
        entry = {
            'id': entry_id,
            'input': input,
            'output':output,
            'topic': topic,
            'date': date
        }
        
        self.history[topic][date][entry_id] = entry # Add entry to dictionary.
        return entry_id     # may (not) need.


    # Delete an entry from the user's history based on its ID. 
    def del_entry(self, entry_id):
        for topic, dates in self.history.items():
            for date, entries in dates.items():
                if entry_id in entries:
                    del entries[entry_id] # delete entry
                if not entries: # remove date where no entries exist
                    del dates[date]
                if not dates: # remove topic where no dates/entries exists
                    del self.history[topic]
                return True # entry successfully deleted.
        return False # entry ID not found.
    

    # Delete a user's entire history. 
    # Use ONLY when deactivating a user's account. 
    def del_all_hist(self):
        self.history.clear()


    # Retrieve all user history for a specific topic.    
    def get_topic(self, topic):
        return self.hist.get(topic, {})
    

    # Retrieve all user history from specific date/session.    
    def get_date(self, date):
        return self.hist.get(date, {})
    

    # Retrieve a history entry via its ID. 
    def get_entry(self, entry_id):
        for topic, dates in self.history.items():
            for date, entries in dates.items():
                if entry_id in entries:
                    return entries[entry_id] # entry found
        return None # entry not found

    def get_all_hist(self):
        # This will flatten the history and return a list of all entries
        hist = []
    
        for topic, dates in self.history.items():
            for date, entries in dates.items():
                for entry_id, entry in entries.items():
                    hist.append(entry)  # Append the entry to the list
        return hist
    
    # Print entire history.
    def print_all_entries(self):
        """Prints all history entries using the print_entry method."""
        if not self.history:
            print("No history to display.")
            return

        for topic, dates in self.history.items():
            for date, entries in dates.items():
                for entry_id, entry in entries.items():
                    self.print_entry(entry)
    
    # Print an entry.
    def print_entry(self, entry):
        if not isinstance(entry, dict):
            print("Invalid entry format. Expected a dictionary.")
            return
        keys = ['input', 'output', 'topic', 'date', 'id']
        if all(key in entry for key in keys):
            print(f"[input: {entry['input']}, output: {entry['output']}, "
                  f"topic: {entry['topic']}, date: {entry['date']}, id: {entry['id']}]")
        else:
            print("Invalid entry format. Missing required keys.")
    
    def has_history(self):
        return bool(self.history) and any(bool(entries) for entries in self.history.values())
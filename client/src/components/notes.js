// Corina Salazar
import React, { useEffect, useState } from 'react';
// import '.App.css';

const Notes = () => {
    const [note, setNote] = useState('');
    const [notesList, setNotesList] = useState([]);

    // Load notes from localStorage on component mount
    useEffect(() => {
        const storedNotes = JSON.parse(localStorage.getItem('mathNotes')) || [];
        setNotesList(storedNotes);
    }, []);

    // Save notes to localStorage whenever notesList changes
    useEffect(() => {
        localStorage.setItem('mathNotes', JSON.stringify(notesList));
    }, [notesList]);

    const handleAddNote = () => {
        if (note) {
            setNotesList([note, ...notesList]); // Add new note at the beginning of the list
            setNote(''); // Clear input after adding
        }
    };

    const handleDeleteNote = (index) => {
        const updatedNotes = notesList.filter((_, i) => i !== index);
        setNotesList(updatedNotes); // Update state to remove deleted note
    };

    return (
        <div style={{ backgroundColor: '#F3F4F6', minHeight: '100vh', minWidth: '100vh' }}>
            <div style={notesContainerStyle}>
                <h2 className="notes-title" style={notesTitleStyle}>Notes</h2>
                <div className="note-input" style={noteInputContainerStyle}>
                    <input
                        type="text"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAddNote()}
                        placeholder="Add a math note"
                        className="note-input-field"
                    />
                    <button onClick={handleAddNote} className="add-note-button">Add</button>
                </div>
                <ul className="notes-list" style={notesListStyle}>
                    {notesList.map((n, index) => (
                        <li key={index} className="note-item">
                            {n}
                            <button onClick={() => handleDeleteNote(index)} className="delete-note-button">X</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

const notesContainerStyle = {
    backgroundColor: '#D1D5DB', // Lighter gray
    width: '20%',
    height: '20vw',
    padding: '10px',
    borderRadius: '8px',
    overflow: 'hidden', // Prevent content from flowing outside
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start', // Align content to the left edge
};

const notesTitleStyle = {
    margin: 0, // Remove default margin for the title
    paddingBottom: '5px', // Small space between title and input
};

const noteInputContainerStyle = {
    display: 'flex',
    width: '100%', // Make input and button take full width
    marginBottom: '10px',
};

const notesListStyle = {
    maxHeight: '15vw', // Limit height of the notes list
    overflowY: 'auto', // Enable vertical scrolling
    width: '100%', // Ensure it takes full width of container
    paddingRight: '5px',
};

export default Notes;

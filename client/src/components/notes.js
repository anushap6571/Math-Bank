// Corina Salazar
import React, { useEffect, useState } from 'react';
import './app.css'; // Ensure to import your CSS file for styling

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
            setNotesList([...notesList, note]);
            setNote(''); // Clear input after adding
        }
    };

    const handleDeleteNote = (index) => {
        const updatedNotes = notesList.filter((_, i) => i !== index);
        setNotesList(updatedNotes); // Update state to remove deleted note
    };

    return (
        <div className="notes-container">
            <h2>Math Notes</h2>
            <div className="note-input">
                <input
                    type="text"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Add a math note"
                    className="note-input-field"
                />
                <button onClick={handleAddNote} className="add-note-button">Add Note</button>
            </div>
            <ul className="notes-list">
                {notesList.map((n, index) => (
                    <li key={index} className="note-item">
                        {n}
                        <button onClick={() => handleDeleteNote(index)} className="delete-note-button">Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Notes;

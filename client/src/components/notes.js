// // Corina Salazar
// // notes.js

import React, { useEffect, useState } from 'react';

const Notes = () => {
    const [note, setNote] = useState('');
    const [notesList, setNotesList] = useState([]);

    useEffect(() => {
        const storedNotes = JSON.parse(localStorage.getItem('mathNotes')) || [];
        setNotesList(storedNotes);
    }, []);

    useEffect(() => {
        localStorage.setItem('mathNotes', JSON.stringify(notesList));
    }, [notesList]);

    const handleAddNote = () => {
        if (note) {
            setNotesList([note, ...notesList]);
            setNote('');
        }
    };

    const handleDeleteNote = (index) => {
        const updatedNotes = notesList.filter((_, i) => i !== index);
        setNotesList(updatedNotes);
    };

    
    useEffect(() =>{
        const fetchNotes = async () =>{ 
            const tempUsername = localStorage.getItem('username');
            console.log('currently inside of fetchNotes in notes.js.');
            try{
                const response = await fetch(`http://127.0.0.1:5000/getnotes/${tempUsername}`)
                if(!response.ok){
                    throw new Error('Failed to fetch notes');
                }
                const data = await response.json();
                setNotesList(data.notesList || []);
            } catch (error){
                console.log('Error from catch: ', error);
            }
        };
        fetchNotes();
    }, []);

    const handleSaveNotes = () => {
        const tempUsername = localStorage.getItem('username');
        fetch('http://127.0.0.1:5000/savenotes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ notesList, tempUsername }),
        })
        .then(Response => {
            if (!Response.ok)
            {
                throw new Error('Network Response Bad.');
            }
            alert('Notes have been Saved!');
            return Response.json();
        })
        .catch((error) => {
            console.error('Save notes error:', error);
        });
    };

    return (
        <div style={notesContainerStyle}>
            <h2 style={notesTitleStyle}>Notes</h2>
            <div style={noteInputContainerStyle}>
                <input
                    type="text"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddNote()}
                    placeholder="Add a math note"
                    style={noteInputStyle}
                />
                <button onClick={handleAddNote} style={buttonStyle}>Add</button>
            </div>
            <ul style={notesListStyle}>
                {notesList.map((n, index) => (
                    <li key={index} style={noteItemStyle}>
                        {n}
                        <button onClick={() => handleDeleteNote(index)} style={deleteButtonStyle}>X</button>
                    </li>
                ))}
            </ul>
            <button onClick={handleSaveNotes} style={buttonStyle}>Save Notes</button>
            
        </div>
    );
};

export default Notes;

// Styles
const notesContainerStyle = {
    
    left: '0%',          // Adjust this based on where the notes should align horizontally
    top: '16%',           // Match this value with the calculator's `top` position
    
    backgroundColor: '#FFFFFF',
    width: '24vw',
    padding: '3vh',
    position: 'absolute',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
    fontFamily: 'Arial, sans-serif',
    fontSize: '1.8vh',
};


const notesTitleStyle = {
    fontSize: '2.5vh',
    marginBottom: '2vh',
    color: '#374151',
};

const noteInputContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '2vh',
};

const noteInputStyle = {
    flex: 1,
    padding: '1vh',
    fontSize: '1.8vh',
    borderRadius: '0.5rem',
    border: '1px solid #D1D5DB',
    marginRight: '1vw',
};

const buttonStyle = {
    backgroundColor: '#0084D1',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '0.5rem',
    padding: '1vh 2vw',
    fontSize: '1.8vh',
    cursor: 'pointer',
};

const notesListStyle = {
    maxHeight: '40vh',
    overflowY: 'auto',
    marginBottom: '2vh',
};

const noteItemStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '1vh',
    marginBottom: '1vh',
    border: '1px solid #E5E7EB',
    borderRadius: '0.5rem',
    backgroundColor: '#F9FAFB',
};

const deleteButtonStyle = {
    backgroundColor: '#EF4444',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '0.5rem',
    padding: '0.5vh 1vw',
    fontSize: '1.5vh',
    cursor: 'pointer',
};

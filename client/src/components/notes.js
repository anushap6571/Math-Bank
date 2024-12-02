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

// import React, { useEffect, useState } from 'react';
// // import '.App.css';

// const Notes = () => {
//     const [note, setNote] = useState('');
//     const [notesList, setNotesList] = useState([]);

//     // Load notes from localStorage on component mount
//     useEffect(() => {
//         const storedNotes = JSON.parse(localStorage.getItem('mathNotes')) || [];
//         setNotesList(storedNotes);
//         console.log(localStorage.getItem('mathNotes'));
//     }, []);

//     // Save notes to localStorage whenever notesList changes
//     useEffect(() => {
//         localStorage.setItem('mathNotes', JSON.stringify(notesList));
//     console.log(localStorage.getItem('mathNotes'));
//     }, [notesList]);

//     const handleAddNote = () => {
//         if (note) {
            
//             setNotesList([note, ...notesList]); // Add new note at the beginning of the list
//             setNote(''); // Clear input after adding
//     }
//     };

//     const handleDeleteNote = (index) => {
//         const updatedNotes = notesList.filter((_, i) => i !== index);
//         setNotesList(updatedNotes); // Update state to remove deleted note
//     };
    
    
//     useEffect(() =>{
//         const fetchNotes = async () =>{ 
//             const tempUsername = localStorage.getItem('username');
//             console.log('currently inside of fetchNotes in notes.js.');
//             try{
//                 const response = await fetch(`http://127.0.0.1:5000/getnotes/${tempUsername}`)
//                 if(!response.ok){
//                     throw new Error('Failed to fetch notes');
//                 }
//                 const data = await response.json();
//                 setNotesList(data.notesList || []);
//             } catch (error){
//                 console.log('Error from catch: ', error);
//             }
//         };
//         fetchNotes();
//     }, []);
    
    
//     const handleSaveNotes = () => {
//         const tempUsername = localStorage.getItem('username');
//         console.log("inside save notes.");
//         console.log(notesList);
        
//         fetch('http://127.0.0.1:5000/savenotes', {
//             method: 'POST',
//             headers: {
//                 'Content-Type' : 'application/json'
//             },
//             body: JSON.stringify({notesList, tempUsername})
//         })
//         .then(Response => {
//             if (!Response.ok)
//             {
//                 throw new Error('Network Response Bad.');
//             }
//             return Response.json();
//         })
//         .catch((error) => {
//             console.log("error from catch: ", error);
//             alert('Error from catch');
//         })
        

//     }

//     return (
//         <div style={{ backgroundColor: '#F3F4F6', minHeight: '100vh', minWidth: '100vh' }}>
//             <div style={notesContainerStyle}>
//                 <h2 className="notes-title" style={notesTitleStyle}>Notes</h2>
//                 <div className="note-input" style={noteInputContainerStyle}>
//                     <input
//                         type="text"
//                         value={note}
//                         onChange={(e) => setNote(e.target.value)}
//                         onKeyDown={(e) => e.key === 'Enter' && handleAddNote()}
//                         placeholder="Add a math note"
//                         className="note-input-field"
//                     />
//                     <button onClick={handleAddNote} className="add-note-button">Add</button>
//                 </div>
//                 <ul className="notes-list" style={notesListStyle}>
//                     {notesList.map((n, index) => (
//                         <li key={index} className="note-item">
//                             {n}
//                             <button onClick={() => handleDeleteNote(index)} className="delete-note-button">X</button>
//                         </li>
//                     ))}
//                 </ul>
//                 <button onClick={handleSaveNotes}> Save Notes </button>
//             </div>
//         </div>
//     );
// };

// const notesContainerStyle = {
//     backgroundColor: '#D1D5DB', // Lighter gray
//     width: '20%',
//     height: '20vw',
//     padding: '10px',
//     borderRadius: '8px',
//     overflow: 'hidden', // Prevent content from flowing outside
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'flex-start', // Align content to the left edge
// };

// const notesTitleStyle = {
//     margin: 0, // Remove default margin for the title
//     paddingBottom: '5px', // Small space between title and input
// };

// const noteInputContainerStyle = {
//     display: 'flex',
//     width: '100%', // Make input and button take full width
//     marginBottom: '10px',
// };

// const notesListStyle = {
//     maxHeight: '15vw', // Limit height of the notes list
//     overflowY: 'auto', // Enable vertical scrolling
//     width: '100%', // Ensure it takes full width of container
//     paddingRight: '5px',
// };


// export default Notes;


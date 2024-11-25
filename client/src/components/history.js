// History.js
import React from 'react';

const History = ({ history }) => {
    return (
        <div style={historyContainerStyle}>
            <h2>History</h2>
            {Object.keys(history).length === 0 ? (
                <p>No history available.</p>
            ) : (
                Object.entries(history).map(([topic, dates]) =>
                    Object.entries(dates).map(([date, entries], index) => (
                        <div key={`${topic}-${date}-${index}`} style={dateContainerStyle}>
                            {/* Render topic and date */}
                            {index === 0 && <h3 style={headerStyle}>{`<${topic}> | ${formatDate(date)}`}</h3>}
                            {Object.values(entries).map((entry, entryIndex) => (
                                <div
                                    key={entry.id}
                                    style={{
                                        ...entryStyle,
                                        marginLeft: entryIndex === 0 ? '0' : '1rem', // Apply indentation dynamically
                                    }}
                                >
                                    <p>{`${entry.input} = ${entry.output}`}</p>
                                </div>
                            ))}
                        </div>
                    ))
                )
            )}
        </div>
    );
};

// Helper function to format the date
const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
    });
};

const historyContainerStyle = {
    position: 'absolute',
    right: '0%', // Align the container to the right side with some margin
    top: '60%', // Center it vertically
    transform: 'translateY(-50%)', // Adjust for proper vertical alignment
    backgroundColor: 'white',
    borderColor: 'white',
    height: '82vh', // Match calculator container height
    width: '24vw', // Match calculator container width
    alignContent: 'center',
    alignItems: 'center',
    padding: '3vh', // Match calculator container padding
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)', // Match calculator box shadow
    overflowY: 'scroll', // Allow scrolling for history entries
};

const dateContainerStyle = {
    marginBottom: '1rem',
};

const headerStyle = {
    marginBottom: '0.5rem',
};

const entryStyle = {
    marginBottom: '0.5rem',
};

export default History;

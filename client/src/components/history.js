// Alex Bowman - AAB210003
// History Frontend
import React, { useEffect, useState } from 'react';

const History = ({ refresh }) => {
  const [history, setHistory] = useState([]);

  const fetchHistory = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/history');
      if (response.ok) {
        const data = await response.json();
        setHistory(data.history || []); // Update state with fetched history
      } else {
        console.error("Failed to fetch history:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  };

  useEffect(() => {
    fetchHistory(); // Fetch history on component mount
  }, [refresh]);

  /* Error display
  //if (error) {
      return (
          <div style={styles.historyPanel}>
              <h2 style={styles.title}>History</h2>
              <p style={styles.noHistoryText}>{error}</p>
          </div>
      );
  }*/

  // Group history by topic
  const groupedHistory = history.reduce((acc, entry) => {
    const { topic, date, input, output } = entry;
    if (!acc[topic]) {
      acc[topic] = [];
    }
    acc[topic].push({ date, input, output });
    return acc;
  }, {});


  return (
    <div style={styles.historyPanel}>
      <div style={styles.title}>History</div>
      {Object.keys(groupedHistory).map((topic) => (
        <div key={topic}>
          <div style={styles.topicHeader}>
            {topic} | {formatDate(groupedHistory[topic][0].date)}  {/* Formatted date */}
          </div>
          {groupedHistory[topic].map((entry, index) => (
            <div key={index} style={styles.entry}>
              <span style={styles.inputOutput}>{entry.input} = {(entry.output)}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

// Function that formats the date string.
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
  });
};

const styles = {
  historyPanel: {
    position: 'absolute',
    top: '60%',
    right: '5px',
    transform: 'translateY(-50%)',
    backgroundColor: 'white',
    border: '1px solid lightgray',
    height: '82vh',
    width: '22vw',
    padding: '3vh',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
    overflowY: 'scroll',
    zIndex: 9999,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    borderRadius: '8px',
  },
  title: {
    fontWeight: 'bold',
    marginBottom: '1rem',
    fontSize: '18px',
    color: 'black',
    textAlign: 'center',
    width: '100%',
    fontFamily: '"Arial", sans-serif',
  },
  topicHeader: {
    marginBottom: '0.5rem',
    fontSize: '16px',
    color: '#333',
    fontWeight: 'bold',
    textTransform: 'capitalize',  // Capitalize the topic name
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    fontFamily: '"Arial", sans-serif',
  },
  entry: {
    marginBottom: '0.5rem',
    display: 'flex',
    flexDirection: 'column', // Align input/output vertically
    width: '100%',  // Ensure the entry takes up full width
    fontFamily: '"Arial", sans-serif',
  },
  inputOutput: {
    //fontWeight: 'bold',
    marginLeft: '20px',
  },
  noHistoryText: {
    fontSize: '18px',
    color: 'gray',
    textAlign: 'center',
    marginTop: '20px',
  },
};

export default History;

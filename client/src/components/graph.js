// Anusha Patel - use case display graph interface
import React, { useState } from 'react';

const Graph = ({ equation }) => {
    const [graphUrl, setGraphUrl] = useState('');
    const [error, setError] = useState('');

    const graphEquation = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/calculator/graph', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ expression: equation }),
            });

            const data = await response.json();
            if (response.ok) {
                setGraphUrl(`http://127.0.0.1:5000/${data.graph}`);
                setError('');
            } else {
                setError(data.error);
                setGraphUrl(null);
            }
        } catch (err) {
            setError('Error communicating with server.');
            setGraphUrl(null);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>Graph Solver</h2>
                <button onClick={graphEquation} style={styles.button}>Generate Graph</button>

                {graphUrl && (
                    <div style={styles.graphContainer}>
                        <h3 style={styles.graphTitle}>Graph:</h3>
                        <iframe
                            src={graphUrl}
                            style={styles.graphIframe}
                            title="Graph of the Equation"
                        ></iframe>
                    </div>
                )}

                {error && <p style={styles.error}>{error}</p>}
            </div>
        </div>
    );
};

export default Graph;

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        minHeight: '100vh',
        backgroundColor: '#f5f7fa',
        padding: '20px',
        fontFamily: '"Arial", sans-serif',
    },
    card: {
        marginTop: '80px', // Adjust this value to position below the top bar
        backgroundColor: '#fff',
        borderRadius: '15px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        padding: '30px',
        maxWidth: '800px',
        width: '100%',
        textAlign: 'center',
    },
    title: {
        marginBottom: '20px',
        color: '#333',
        fontSize: '24px',
        fontWeight: 'bold',
    },
    button: {
        padding: '12px 24px',
        backgroundColor: '#007BFF',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: 'bold',
        transition: 'background-color 0.3s ease',
        marginBottom: '20px',
    },
    buttonHover: {
        backgroundColor: '#0056b3',
    },
    graphContainer: {
        marginTop: '20px',
        textAlign: 'center',
        width: '80%',
    },
    graphTitle: {
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#28a745',
        marginBottom: '10px',
    },
    graphIframe: {
        width: '40vw',
        height: '60vh',
        border: 'none',
    },
    error: {
        marginTop: '20px',
        color: 'red',
        fontWeight: 'bold',
    },
};

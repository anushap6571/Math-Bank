
// Anusha Patel - use case display equation solver interface

import React, { useState } from 'react';
import Graph from './graph'

const EquationSolver = ({ equation, setEquation }) => {
    const [solutions, setSolutions] = useState(null);
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        setEquation(e.target.value);
    };

    const solveEquation = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/calculator/equation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ expression: equation }),
            });

            const data = await response.json();

            if (response.ok) {
                setSolutions(data.solutions); // Ensure the backend returns a `solutions` array
                setError('');
            } else {
                setError(data.error || 'Unknown error occurred.');
                setSolutions(null);
            }
        } catch (err) {
            setError('Error communicating with server.');
            setSolutions(null);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>Equation Solver</h2>
                <input
                    type="text"
                    value={equation}
                    onChange={handleInputChange}
                    placeholder="Enter equation (e.g., x + 3 = 9)"
                    style={styles.input}
                />
                <button
                    onClick={solveEquation}
                    style={styles.button}
                    onMouseEnter={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
                    onMouseLeave={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
                >
                    Solve
                </button>

                {solutions && (
                    <div style={styles.solutionsContainer}>
                        <h3 style={styles.solutionsTitle}>Solution:</h3>
                        <p style={styles.solution}>{solutions.join(', ')}</p>
                    </div>
                )}

                {error && <p style={styles.error}>{error}</p>}
            </div>
            <Graph equation={equation} setEquation={setEquation} />
        </div>
    );
};

export default EquationSolver;

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
    input: {
        width: '80%',
        padding: '10px',
        fontSize: '16px',
        border: '1px solid #ddd',
        borderRadius: '5px',
        marginBottom: '15px',
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
    },
    buttonHover: {
        backgroundColor: '#0056b3',
    },
    solutionsContainer: {
        marginTop: '20px',
        textAlign: 'left',
        width: '80%',
        backgroundColor: '#e9f9e9',
        padding: '15px',
        borderRadius: '8px',
        border: '1px solid #d4edda',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    solutionsTitle: {
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#28a745',
        marginBottom: '10px',
    },
    solution: {
        fontSize: '16px',
        color: '#333',
    },
    error: {
        marginTop: '20px',
        color: 'red',
        fontWeight: 'bold',
    },
};

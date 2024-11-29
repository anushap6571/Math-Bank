//Rohan - UI changes
import React, { useState } from 'react';
import axios from 'axios';
import Notes from './notes'

const Matrix = () => {
    // Initialize matrices as 2x2 matrices filled with zeros
    const [matrixA, setMatrixA] = useState([
        [0, 0],
        [0, 0],
    ]);
    const [matrixB, setMatrixB] = useState([
        [0, 0],
        [0, 0],
    ]);
    const [result, setResult] = useState(null);
    const [rrefResult, setRrefResult] = useState(null);
    const [detResult, setDetResult] = useState(null);

    // Handle matrix value changes
    const handleMatrixChange = (matrix, setMatrix, row, col, value) => {
        const newMatrix = matrix.map((row) => [...row]);
        newMatrix[row][col] = parseFloat(value);
        setMatrix(newMatrix);
    };

    // Functions to add rows and columns
    const addRow = (matrix, setMatrix) => {
        const newRow = Array(matrix[0].length).fill(0);
        setMatrix([...matrix, newRow]);
    };

    const addColumn = (matrix, setMatrix) => {
        setMatrix(matrix.map(row => [...row, 0]));
    };

    // Functions to delete rows and columns
    const deleteRow = (matrix, setMatrix) => {
        if (matrix.length > 1) {
            setMatrix(matrix.slice(0, -1));
        }
    };

    const deleteColumn = (matrix, setMatrix) => {
        if (matrix[0].length > 1) {
            setMatrix(matrix.map(row => row.slice(0, -1)));
        }
    };

    // API calls
    const multiplyMatrices = async () => {
        try {
            const response = await axios.post('/calculator/matrix_multiply', { matrixA, matrixB });
            setResult(response.data);
        } catch (error) {
            setResult({ error: error.message });
        }
    };

    const calculateRREF = async (matrix) => {
        try {
            const response = await axios.post('/calculator/matrix_rref', { matrix });
            setRrefResult(response.data);
        } catch (error) {
            setRrefResult({ error: error.message });
        }
    };

    const calculateDeterminant = async (matrix) => {
        try {
            const response = await axios.post('/calculator/matrix_determinant', { matrix });
            const roundedDeterminant = parseFloat(response.data).toFixed(2);
            setDetResult(roundedDeterminant);
        } catch (error) {
            setDetResult({ error: error.message });
        }
    };

    return (
        <div style={pageContainer}>
            <div style={formContainer}>
                <h1 style={headingStyle}>Matrix Operations</h1>

                {/* Matrix A Input */}
                <div style={matrixContainer}>
                    <h2 style={subHeadingStyle}>Matrix A</h2>
                    {matrixA.map((row, rowIndex) => (
                        <div key={rowIndex} style={rowStyle}>
                            {row.map((value, colIndex) => (
                                <input
                                    key={colIndex}
                                    type="number"
                                    value={value}
                                    onChange={(e) =>
                                        handleMatrixChange(matrixA, setMatrixA, rowIndex, colIndex, e.target.value)
                                    }
                                    style={inputStyle}
                                />
                            ))}
                        </div>
                    ))}
                    <div style={buttonRowStyle}>
                        <button onClick={() => addRow(matrixA, setMatrixA)} style={buttonStyle}>Add Row</button>
                        <button onClick={() => addColumn(matrixA, setMatrixA)} style={buttonStyle}>Add Column</button>
                        <button onClick={() => deleteRow(matrixA, setMatrixA)} style={buttonStyle}>Delete Row</button>
                        <button onClick={() => deleteColumn(matrixA, setMatrixA)} style={buttonStyle}>Delete Column</button>
                    </div>
                </div>

                {/* Matrix B Input */}
                <div style={matrixContainer}>
                    <h2 style={subHeadingStyle}>Matrix B</h2>
                    {matrixB.map((row, rowIndex) => (
                        <div key={rowIndex} style={rowStyle}>
                            {row.map((value, colIndex) => (
                                <input
                                    key={colIndex}
                                    type="number"
                                    value={value}
                                    onChange={(e) =>
                                        handleMatrixChange(matrixB, setMatrixB, rowIndex, colIndex, e.target.value)
                                    }
                                    style={inputStyle}
                                />
                            ))}
                        </div>
                    ))}
                    <div style={buttonRowStyle}>
                        <button onClick={() => addRow(matrixB, setMatrixB)} style={buttonStyle}>Add Row</button>
                        <button onClick={() => addColumn(matrixB, setMatrixB)} style={buttonStyle}>Add Column</button>
                        <button onClick={() => deleteRow(matrixB, setMatrixB)} style={buttonStyle}>Delete Row</button>
                        <button onClick={() => deleteColumn(matrixB, setMatrixB)} style={buttonStyle}>Delete Column</button>
                    </div>
                </div>

                {/* Matrix Operations */}
                <div style={operationContainer}>
                    <button onClick={multiplyMatrices} style={bottombuttonStyle}>Multiply Matrices</button>
                    <button onClick={() => calculateRREF(matrixA)} style={bottombuttonStyle}>RREF of Matrix A</button>
                    <button onClick={() => calculateDeterminant(matrixA)} style={bottombuttonStyle}>Determinant of Matrix A</button>
                </div>

                {/* Results */}
                {result && (
                    <div style={resultContainer}>
                        <h2 style={subHeadingStyle}>Multiplication Result</h2>
                        {result.error ? (
                            <p style={errorText}>{result.error}</p>
                        ) : (
                            result.map((row, rowIndex) => (
                                <div key={rowIndex}>{row.join(' ')}</div>
                            ))
                        )}
                    </div>
                )}
                {rrefResult && (
                    <div style={resultContainer}>
                        <h2 style={subHeadingStyle}>RREF Result</h2>
                        {rrefResult.error ? (
                            <p style={errorText}>{rrefResult.error}</p>
                        ) : (
                            rrefResult.map((row, rowIndex) => (
                                <div key={rowIndex}>{row.join(' ')}</div>
                            ))
                        )}
                    </div>
                )}
                {detResult && (
                    <div style={resultContainer}>
                        <h2 style={subHeadingStyle}>Determinant Result</h2>
                        {detResult.error ? (
                            <p style={errorText}>{detResult.error}</p>
                        ) : (
                            <p>{detResult}</p>
                        )}
                    </div>
                )}
            </div>
            <Notes />
        </div>
    );
};

// Styles for the page
const styles = {
    container: {
        textAlign: 'center',
        marginTop: '20px',
        maxWidth: '1200px',  // Change this to set max width
        width: '90%',
        margin: '0 auto',
    },
    matrixContainer: {
        marginBottom: '30px',
        display: 'inline-block',
        textAlign: 'left',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        margin: '10px',
    },
    row: {
        marginBottom: '10px',
    },
    inputBox: {
        width: '50px',
        height: '30px',
        margin: '5px',
        textAlign: 'center',
        borderRadius: '5px',
        border: '1px solid #ccc',
    },
    buttonContainer: {
        marginTop: '10px',
    },
    button: {
        padding: '5px 15px',
        margin: '5px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    operationContainer: {
        marginTop: '30px',
    },
    operationButton: {
        padding: '10px 20px',
        margin: '5px',
        backgroundColor: '#007BFF',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    resultContainer: {
        marginTop: '20px',
        fontSize: '18px',
    },
};


export default Matrix;

/* Styling */
const pageContainer = {
    backgroundColor: '#E5E7EB',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

};

const matrixContainer = {
    marginBottom: '20px',
    padding: '15px',
    backgroundColor: '#F3F4F6',
    borderRadius: '10px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',

};


const formContainer = {
    backgroundColor: 'white',
    width: '60%',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    width: '40%',
};

const headingStyle = {
    textAlign: 'center',
    fontSize: '2rem',
    marginBottom: '20px',
};

const subHeadingStyle = {
    fontSize: '1.5rem',
    marginBottom: '10px',
};

const rowStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '10px',
};

const inputStyle = {
    width: '60px',
    height: '40px',
    margin: '5px',
    textAlign: 'center',
    fontSize: '1rem',
};

const buttonStyle = {
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 15px',
    margin: '5px',
    cursor: 'pointer',
};

const bottombuttonStyle = {
    color: "white",
    backgroundColor: '#0084D1',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 15px',
    margin: '5px',
    cursor: 'pointer',
};

const buttonRowStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '10px',
};

const operationContainer = {
    marginTop: '20px',
    textAlign: 'center',
};

const resultContainer = {
    marginTop: '20px',
    padding: '10px',
    backgroundColor: '#F9FAFB',
    borderRadius: '10px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
};

const errorText = {
    color: 'red',
};

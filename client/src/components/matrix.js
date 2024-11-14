// src/MatrixPage.js
import React, { useState } from 'react';
import axios from 'axios';

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
            setDetResult(response.data);
        } catch (error) {
            setDetResult({ error: error.message });
        }
    };

    return (
        <div>
            <h1>Matrix Operations</h1>
            
            {/* Matrix A Input */}
            <div>
                <h2>Matrix A</h2>
                {matrixA.map((row, rowIndex) => (
                    <div key={rowIndex}>
                        {row.map((value, colIndex) => (
                            <input
                                key={colIndex}
                                type="number"
                                value={value}
                                onChange={(e) =>
                                    handleMatrixChange(matrixA, setMatrixA, rowIndex, colIndex, e.target.value)
                                }
                            />
                        ))}
                    </div>
                ))}
                <button onClick={() => addRow(matrixA, setMatrixA)}>Add Row to A</button>
                <button onClick={() => addColumn(matrixA, setMatrixA)}>Add Column to A</button>
                <button onClick={() => deleteRow(matrixA, setMatrixA)}>Delete Row from A</button>
                <button onClick={() => deleteColumn(matrixA, setMatrixA)}>Delete Column from A</button>
            </div>

            {/* Matrix B Input */}
            <div>
                <h2>Matrix B</h2>
                {matrixB.map((row, rowIndex) => (
                    <div key={rowIndex}>
                        {row.map((value, colIndex) => (
                            <input
                                key={colIndex}
                                type="number"
                                value={value}
                                onChange={(e) =>
                                    handleMatrixChange(matrixB, setMatrixB, rowIndex, colIndex, e.target.value)
                                }
                            />
                        ))}
                    </div>
                ))}
                <button onClick={() => addRow(matrixB, setMatrixB)}>Add Row to B</button>
                <button onClick={() => addColumn(matrixB, setMatrixB)}>Add Column to B</button>
                <button onClick={() => deleteRow(matrixB, setMatrixB)}>Delete Row from B</button>
                <button onClick={() => deleteColumn(matrixB, setMatrixB)}>Delete Column from B</button>
            </div>

            {/* Matrix Operations */}
            <div>
                <button onClick={multiplyMatrices}>Multiply Matrices</button>
                <button onClick={() => calculateRREF(matrixA)}>RREF of Matrix A</button>
                <button onClick={() => calculateDeterminant(matrixA)}>Determinant of Matrix A</button>
            </div>

            {/* Results */}
            {result && (
                <div>
                    <h2>Multiplication Result</h2>
                    {result.error ? (
                        <p>{result.error}</p>
                    ) : (
                        result.map((row, rowIndex) => (
                            <div key={rowIndex}>{row.join(' ')}</div>
                        ))
                    )}
                </div>
            )}

            {rrefResult && (
                <div>
                    <h2>RREF Result</h2>
                    {rrefResult.error ? (
                        <p>{rrefResult.error}</p>
                    ) : (
                        rrefResult.map((row, rowIndex) => (
                            <div key={rowIndex}>{row.join(' ')}</div>
                        ))
                    )}
                </div>
            )}

            {detResult && (
                <div>
                    <h2>Determinant Result</h2>
                    {detResult.error ? (
                        <p>{detResult.error}</p>
                    ) : (
                        <p>{detResult}</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Matrix;

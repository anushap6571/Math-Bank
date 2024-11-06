import React, { useState } from 'react';


const EquationSolver = ({equation, setEquation}) => {
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
                setSolutions(data.solutions);
                setError('');
            } else {
                setError(data.error);
                setSolutions(null);
            }
        } catch (err) {
            setError('Error communicating with server.');
            setSolutions(null);
        }
    };


    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
            <h2>Equation Solver</h2>
            <input 
                type="text" 
                value={equation} 
                onChange={handleInputChange} 
                placeholder="Enter equation (e.g., x + 3 = 9)" 
                style={{ marginBottom: '10px', padding: '10px', width: '300px' }} 
            />
            <div>
                <button onClick={solveEquation} style={{ padding: '10px 20px', margin: '5px' }}>Solve</button>
                
            </div>
            {solutions && (
                <div>
                    <h3>Solutions:</h3>
                    <p>{solutions.join(', ')}</p>
                </div>
            )}
            
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default EquationSolver;

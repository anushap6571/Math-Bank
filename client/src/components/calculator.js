import React, { useState } from 'react';
// display calculator screen
const Calculator = () => {
    const [a, setA] = useState('');
    const [b, setB] = useState('');
    const [operation, setOperation] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    
    const calculate = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/calculator', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ operation, a: Number(a), b: Number(b) }),
            });

            const data = await response.json();
            if (response.ok) {
                setResult(data.result);
                setError('');
            } else {
                setError(data.error);
                setResult(null);
            }
        } catch (err) {
            setError('Error communicating with server.');
            setResult(null);
        }
    };

    const handleOperation = (op) => {
        setOperation(op);
    };

    return (
        <div>
            <h2>Calculator</h2>
            <input
                type="number"
                value={a}
                onChange={(e) => setA(e.target.value)}
                placeholder="Enter first number"
            />
            <input
                type="number"
                value={b}
                onChange={(e) => setB(e.target.value)}
                placeholder="Enter second number"
            />
            
            { <div>
                <button onClick={() => handleOperation('add')}>+</button>
                <button onClick={() => handleOperation('subtract')}>-</button>
                <button onClick={() => handleOperation('multiply')}>*</button>
                <button onClick={() => handleOperation('divide')}>/</button>
            </div> }

            
            <button onClick={calculate}>Calculate</button>

            {result !== null && <p>Result: {result}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default Calculator;

import React, { useState } from 'react';

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
            <select onChange={(e) => setOperation(e.target.value)}>
                <option value="">Select operation</option>
                <option value="add">+</option>
                <option value="subtract">-</option>
                <option value="multiply">*</option>
                <option value="divide">/</option>
            </select>
            <button onClick={calculate}>Calculate</button>

            {result !== null && <p>Result: {result}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default Calculator;

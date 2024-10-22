import React, { useState } from 'react';

const Calculator = () => {
    const [expression, setExpression] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    const handleButtonClick = (value) => {
        setExpression((prev) => prev + value);
    };

    const calculate = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/calculator', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ expression }),
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

    const clearInput = () => {
        setExpression('');
        setResult(null);
        setError('');
    };

    return (
        <div>
            <h2>Calculator</h2>
            <input
                type="text"
                value={expression}
                onChange={(e) => setExpression(e.target.value)}
                placeholder="Enter math expression"
            />

            <div>
                <button onClick={() => handleButtonClick('7')}>7</button>
                <button onClick={() => handleButtonClick('8')}>8</button>
                <button onClick={() => handleButtonClick('9')}>9</button>
                <button onClick={() => handleButtonClick('/')}>/</button>
            </div>
            <div>
                <button onClick={() => handleButtonClick('4')}>4</button>
                <button onClick={() => handleButtonClick('5')}>5</button>
                <button onClick={() => handleButtonClick('6')}>6</button>
                <button onClick={() => handleButtonClick('*')}>*</button>
            </div>
            <div>
                <button onClick={() => handleButtonClick('1')}>1</button>
                <button onClick={() => handleButtonClick('2')}>2</button>
                <button onClick={() => handleButtonClick('3')}>3</button>
                <button onClick={() => handleButtonClick('-')}>-</button>
            </div>
            <div>
                <button onClick={() => handleButtonClick('0')}>0</button>
                <button onClick={() => handleButtonClick('(')}>(</button>
                <button onClick={() => handleButtonClick(')')}>)</button>
                <button onClick={() => handleButtonClick('+')}>+</button>
            </div>

            <button onClick={calculate}>Calculate</button>
            <button onClick={clearInput}>Clear</button>

            {result !== null && <p>Result: {result}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default Calculator;

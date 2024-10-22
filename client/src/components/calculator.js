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
        <div style={calcContainer}>
            <h2>Calculator</h2>
            <textarea
                type="text"
                value={expression}
                onChange={(e) => setExpression(e.target.value)}
                placeholder="Enter math expression"
                style={inputBox}
            />
            <div>
            <div>
                <button style={mostLeftButtonStyle} onClick={() => handleButtonClick('7')}>7</button>
                <button style={buttonStyle} onClick={() => handleButtonClick('8')}>8</button>
                <button style={buttonStyle} onClick={() => handleButtonClick('9')}>9</button>
                <button style={buttonStyle} onClick={(clearInput) => handleButtonClick('CE')}>CE</button>
                <button style={buttonStyle} onClick={() => handleButtonClick('/')}>/</button>
            </div>
            <div>
                <button style={mostLeftButtonStyle} onClick={() => handleButtonClick('4')}>4</button>
                <button style={buttonStyle} onClick={() => handleButtonClick('5')}>5</button>
                <button style={buttonStyle} onClick={() => handleButtonClick('6')}>6</button>
                <button style={buttonStyle} onClick={() => handleButtonClick('2nd')}>2nd</button>
                <button style={buttonStyle} onClick={() => handleButtonClick('*')}>*</button>
            </div>
            <div>
                <button style={mostLeftButtonStyle} onClick={() => handleButtonClick('1')}>1</button>
                <button style={buttonStyle} onClick={() => handleButtonClick('2')}>2</button>
                <button style={buttonStyle} onClick={() => handleButtonClick('3')}>3</button>
                <button style={buttonStyle} onClick={() => handleButtonClick('Del')}>DEL</button>
                <button style={buttonStyle} onClick={() => handleButtonClick('-')}>-</button>
            </div>
            <div>
                <button style={mostLeftButtonStyle} onClick={() => handleButtonClick('0')}>0</button>
                <button style={buttonStyle} onClick={() => handleButtonClick('(')}>(</button>
                <button style={buttonStyle} onClick={() => handleButtonClick(')')}>)</button>
                <button style={buttonStyle} onClick={() => handleButtonClick('Rad')}>Rad</button>
                <button style={buttonStyle} onClick={() => handleButtonClick('+')}>+</button>
            </div>
            </div>

            <button style={mostLeftButtonStyle} onClick={calculate}>Solve</button>
            <button style={buttonStyle} onClick={clearInput}>Clear</button>

            {result !== null && <p>Result: {result}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

const spaceBetween = 10;

export default Calculator;

const calcContainer = {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)'
};

const inputBox = {
    height: 50,
    width: 400,
}

const mostLeftButtonStyle = {
    marginTop: 15,
    backgroundColor: '#E5E7EB',
    height: 50,
    width: 50,
    border: 0,
    borderRadius: 10,
}

const buttonStyle = {
    marginLeft: spaceBetween,
    marginTop: 15,
    backgroundColor: '#E5E7EB',
    height: 50,
    width: 50,
    border: 0,
    borderRadius: 10,
};



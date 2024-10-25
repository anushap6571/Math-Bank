import React, { useState } from 'react';

const Calculator = () => {
    const [expression, setExpression] = useState('');
    const [textbox, setTextbox] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');


    // funtion for button clicks to output to screen and save to expression
    const handleButtonClick = (value) => {
        setTextbox((prev) => prev + value);
        setExpression((prev) => prev + value);
    };

    // function to handle if the user uses keyboard typing
    const handleInputChange = (e) => {
        
        setExpression(e.target.value);
        setTextbox(e.target.value);
        if(e.target.value.endsWith('=')){
            calculate();
        }
    };

    // function to handle delete button 
    const handleDelete = () =>{
        setExpression((prev) => prev.slice(0, -1));
        setTextbox((prev) => prev.slice(0, -1));
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
                const newResult = data.result;
                setResult(newResult);
                setTextbox((prev) => (prev.endsWith('=') ? prev : prev + '= ') + newResult + '\n'); 
                setExpression('');  // clear math expression after calculation
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
        setTextbox('');  
        setError('');
    };

    return (
        <div style={{backgroundColor: '#E5E7EB',  minHeight: '100vh', minWidth: '100vh'}}>
        <div style={calcContainer}>
            <textarea
                type="text"
                value={textbox}
                onChange= { handleInputChange }
                placeholder="Enter expression"
                style={{...inputBox, resize: 'none'}}
            >
                
            </textarea>
            <div>
            <div>
                <button style={mostLeftButtonStyle} onClick={() => handleButtonClick('7')}>7</button>
                <button style={buttonStyle} onClick={() => handleButtonClick('8')}>8</button>
                <button style={buttonStyle} onClick={() => handleButtonClick('9')}>9</button>
                <button style={buttonStyle} onClick={(clearInput)}>CE</button>
                <button style={{ ...buttonStyle, backgroundColor: '#0084D1'}} onClick={() => handleButtonClick('/')}>/</button>
            </div>
            <div>
                <button style={mostLeftButtonStyle} onClick={() => handleButtonClick('4')}>4</button>
                <button style={buttonStyle} onClick={() => handleButtonClick('5')}>5</button>
                <button style={buttonStyle} onClick={() => handleButtonClick('6')}>6</button>
                <button style={buttonStyle} onClick={() => handleButtonClick('2nd')}>2nd</button>
                <button style={{ ...buttonStyle, backgroundColor: '#0084D1'}} onClick={() => handleButtonClick('*')}>*</button>
            </div>
            <div>
                <button style={mostLeftButtonStyle} onClick={() => handleButtonClick('1')}>1</button>
                <button style={buttonStyle} onClick={() => handleButtonClick('2')}>2</button>
                <button style={buttonStyle} onClick={() => handleButtonClick('3')}>3</button>
                <button style={buttonStyle} onClick={() => handleDelete('Del')}>DEL</button>
                <button style={{ ...buttonStyle, backgroundColor: '#0084D1'}} onClick={() => handleButtonClick('-')}>-</button>
            </div>
            <div>
                <button style={mostLeftButtonStyle} onClick={() => handleButtonClick('0')}>0</button>
                <button style={buttonStyle} onClick={() => handleButtonClick('(')}>(</button>
                <button style={buttonStyle} onClick={() => handleButtonClick(')')}>)</button>
                <button style={buttonStyle} onClick={() => handleButtonClick('Rad')}>Rad</button>
                <button style={{ ...buttonStyle, backgroundColor: '#0084D1'}} onClick={() => handleButtonClick('+')}>+</button>
            </div>
            </div>

            <button style={mostLeftButtonStyle} onClick={calculate}>Solve</button>
    

            {result !== null && <p>Result: {result}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
        </div>
    );
};

const spaceBetween = 10;

export default Calculator;

const calcContainer = {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    borderColor: 'white',
    height: 'auto',
    width: 'auto',
    alignContent: 'center',
    flex: 1,
    padding: 40,
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',

};

const inputBox = {
    height: 100,
    width: 435,
    fontSize: 20,
}

const mostLeftButtonStyle = {
    marginTop: 15,
    backgroundColor: '#E5E7EB',
    height: 80,
    width: 80,
    border: 0,
    borderRadius: 10,
    fontSize: 20,
}

const buttonStyle = {
    marginLeft: spaceBetween,
    marginTop: 15,
    backgroundColor: '#E5E7EB',
    height: 80,
    width: 80,
    border: 0,
    borderRadius: 10,
    fontSize: 20,
};



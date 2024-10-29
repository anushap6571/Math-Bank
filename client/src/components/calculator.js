import React, { useState } from 'react';


const Calculator = () => {
    const [expression, setExpression] = useState('');
    const [textbox, setTextbox] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');
    const [isHovering, setHoveredButton] = useState(null);


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

    const Button = ({ label, style }) => (
        <button
            style={style(label)}
            onMouseEnter={() => setHoveredButton(label)}
            onMouseLeave={() => setHoveredButton(null)}
            onClick={
                label === 'CE' ? clearInput :
                label === 'DEL' ? handleDelete :
                label === '=' ? calculate :
                () => handleButtonClick(label)
            }
        >
            {label}
        </button>
    );
    
    const buttonStyle = (label) => ({
        marginLeft: '2%',
        marginTop: '2%',
        backgroundColor: '#E5E7EB',
        height: '8vh',
        width: '4.51vw',
        border: 0,
        borderRadius: '0.5rem',
        fontSize: '2vh',
        backgroundColor: isHovering === label ? '#588AEE' : (['+', '-', '*', '/', '='].includes(label) ? '#0084D1' : '#E5E7EB'),
        
    });

    const mostLeftButtonStyle = (label) => ({
        ...buttonStyle(label),
        marginLeft: '0',
    });

    const specialButtonStyle = (label) => ({ 
        marginLeft: label === '^' ? '0%' : '2%',
        marginTop: '2%',
        backgroundColor: '#E5E7EB',
        height: '4vh',
        width: '5.9vw',
        border: 0,
        borderRadius: '0.5rem',
        fontSize: '2vh',
        backgroundColor: isHovering === label ? '#588AEE' : '#E5E7EB',
            
    })

    const bottomButtonStyle = (label) => ({
        marginTop: '2%',
        marginLeft: label != 'Matrix' ? '2%': '0%',
        backgroundColor: '#E5E7EB',
        height: '5vh',
        width: '7.65vw',
        border: 0,
        borderRadius: '0.5rem',
        fontSize: '2vh',
        backgroundColor: isHovering === label ? '#588AEE' : '#E5E7EB',
    })
    

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
                setTextbox((prev) => (prev.endsWith('=') ? prev + ' ': prev + '= ') + newResult + '\n'); 
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
                <div style = { buttonRowStyle }>
                    <Button label='7' style={mostLeftButtonStyle}/>
                    <Button label='8' style={buttonStyle}/>
                    <Button label='9' style={buttonStyle}/>
                    <Button label='CE' style={buttonStyle} onClick={(clearInput)}/>
                    <Button label='/' style={buttonStyle}/>
                </div>
                <div style = { buttonRowStyle }>
                    <Button label='4' style={mostLeftButtonStyle}/>
                    <Button label='5' style={buttonStyle}/>
                    <Button label='6' style={buttonStyle}/>
                    <Button label='2nd' style={buttonStyle}/>
                    <Button label='*' style={buttonStyle}/>
                </div>
                <div style = { buttonRowStyle }>
                    <Button label='1' style={mostLeftButtonStyle}/>
                    <Button label='2' style={buttonStyle}/>
                    <Button label='3' style={buttonStyle}/>
                    <Button label='DEL' style={buttonStyle}/>
                    <Button label='-' style={buttonStyle}/>
                </div>
                <div style = { buttonRowStyle }>
                    <Button label='0' style={mostLeftButtonStyle}/>
                    <Button label='(' style={buttonStyle}/>
                    <Button label=')' style={buttonStyle}/>
                    <Button label='Rad' style={buttonStyle}/>
                    <Button label='+' style={buttonStyle}/>
                </div>
                <div style = { buttonRowStyle }>
                    <Button label='^' style={specialButtonStyle}/>
                    <Button label='.' style={specialButtonStyle}/>
                    <Button label='π' style={specialButtonStyle}/>
                    <Button label='e' style={specialButtonStyle}/>
                </div>
                <div style = { buttonRowStyle }>
                    <Button label='sin' style={mostLeftButtonStyle}/>
                    <Button label='cos' style={buttonStyle}/>
                    <Button label='tan' style={buttonStyle}/>
                    <Button label='sqrt' style={buttonStyle}/>
                    <Button label='!' style={buttonStyle}/>
                </div>
                <div style = { buttonRowStyle }>
                    <Button label='log' style={mostLeftButtonStyle}/>
                    <Button label='exp' style={buttonStyle}/>
                    <Button label='ln' style={buttonStyle}/>
                    <Button label='|x|' style={buttonStyle}/>
                    <Button label='=' style={buttonStyle}/>
                    
                </div>
                <div style = { buttonRowStyle }>
                    <Button label='Matrix' style={bottomButtonStyle}/>
                    <Button label='Equation' style={bottomButtonStyle}/>
                    <Button label='Graph' style={bottomButtonStyle}/>
                    
                </div>
                
            </div>

            
    

            {result !== null && <p>Result: {result}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
        </div>
    );
};




export default Calculator;

const calcContainer = {
    //display: "flex",
    flexDirection: 'column',
    position: 'absolute',
    left: '40%',
    top: '57%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    borderColor: 'white',
    height: '82vh',
    width: '24vw',
    alignContent: 'center',
    alignItems: 'center',
    padding: '3vh',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
    

};

const buttonRowStyle = {
    display: 'flex',
    //justifyContent: 'space-between', // Spreads buttons evenly within the row
    width: '100%', // Ensures the row takes up the full width of the container
    flexWrap: 'nowrap', // Allows buttons to wrap to the next line if needed
    marginBottom: '1vh',
};



const inputBox = {
    height: '10vh',
    width: '100%',
    fontSize: '2.5vh',
}







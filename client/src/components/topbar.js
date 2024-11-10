import React from 'react';
import { Link } from 'react-router-dom';

const TopBar = () => {
    return( 
        <div style={top}>
            <img src={require('../assets/mathbank-logo.png')} alt="Math Bank Logo" style={logo}/>
            <div style={navbar}>
                <div style={mathbank}>Math Bank</div>
                <div style={buttonContainer}>
                    <Link to="/calculator" style={linkStyle}>
                        <button style={buttonStyle}>Calculator</button>
                    </Link>
                    <Link to="/sign-up" style={linkStyle}>
                        <button style={buttonStyle}>Sign Up</button>
                    </Link>
                    <Link to="/" style={linkStyle}>
                        <button style={buttonStyle}>Login</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default TopBar;

const top = {
    backgroundColor: 'white',
    width: '100%',
    height: '8vw',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 2vw',
    boxSizing: 'border-box',  // Ensures padding is included in the width
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',       // Prevents overflow if elements slightly exceed the width
}

const logo = {
    width: '10vh',
    height: '5vw',
}

const mathbank = {
    fontSize: '2.5vh',
    fontWeight: 'bold',
    color: '#333',
}

const navbar = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
}

const buttonContainer = {
    display: 'flex',
    gap: '1vw',
}

const buttonStyle = {
    backgroundColor: '#0084D1',
    color: 'white',
    fontSize: '1.5vh',
    padding: '0.5vw 1.5vw',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
}

const linkStyle = {
    textDecoration: 'none',
}

buttonStyle[':hover'] = {
    backgroundColor: '#005fa3',
};

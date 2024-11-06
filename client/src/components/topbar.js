import React, { useState } from 'react';
import { BrowserRouter, Link } from 'react-router-dom';

const TopBar = () => {

    return( 
        <div>
            <img src={require('../assets/mathbank-logo.png')} style={logo}/>
                <nav className = "navbar navbar-expand-lg" navbar-dark bg-dark>
                    <div className = "container-fluid">
                        <div style = {mathbank} >   Math Bank </div>
                        <div className = "collapse navbar-collapse" id = "navbarNav">
                            <ul className = "navbar-nav">
                                <li className = "nav-item">
                                    <Link className = "nav-link active" to ="/Calc" >Calculator</Link>
                                </li>
                                <li className = "nav-item">
                                    <Link className = "nav-link active" to = "/sign-up" >Sign Up</Link>
                                </li>
                                <li className = "nav-item">
                                    <Link className = "nav-link active" to = "/">Login</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
        </div>
    )
}

export default TopBar;

const top = {
    backgroundColor: 'white',
    width: '100%',
    height: '90%',
    flex: 1,
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0)',

}

const logo = {
    width: '10vh',
    height: '5vw',

}

const mathbank = {
    fontSize: '2vh',
    marginLeft: 20,

}
 // this will be the signup button, but positioning is not correct
const signUp = {
    
    position: 'relative',
    fontSize: 20,
    marginLeft: 20,
    top: 30,
}
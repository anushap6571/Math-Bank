import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

const TopBar = () => {

    return(        
        <div style = {top}>
            <div>
                <img src={require('../assets/mathbank-logo.png')} style={logo}/>
                <div style={mathbank}>
                    Math Bank
                </div>
            </div>

            <div>
                {/* <link>
                    <button>Account</button>
                </link> */}
            </div>
        </div>

    )
}


export default TopBar;

const top = {
    backgroundColor: 'white',
    width: '100%',
    height: 135,
    flex: 1,
    boxShadow: '0 4px 8px rgba(0, 0, 0, 1)',

}

const logo = {
    width: 120,
    height: 104,

}

const mathbank = {
    fontSize: 20,
    marginLeft: 20,

}
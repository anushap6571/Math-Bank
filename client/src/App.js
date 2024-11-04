import React, { useState } from 'react';
import Calculator from './components/calculator';
import TopBar from './components/topbar';
import EquationSolver from './components/EquationSolver'; 
import Graph from './components/graph';
import SignUpPage from './components/signup';
import LogInPage from './components/login';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';


function App() {
    const[equation, setEquation] = useState('');
            
    return (
        <Router>
            <div>
                <TopBar/>
                    <Routes>
                        <Route path ="/sign-up" element = {<SignUpPage/>}/>
                    </Routes>
                    <Routes>
                        <Route path ="/" element = {<LogInPage/>}/>
                    </Routes>
                    <Routes>
                        <Route path ="/Calc" element = {<Calculator/>}/>
                    </Routes>
                    <Routes>
                        <Route path="/calculator/equation" element=
                        {
                            <>
                                <EquationSolver equation={equation} setEquation={setEquation} />
                                <Graph equation={equation} setEquation={setEquation}/>
                            </>
                        }/>
                    </Routes>
            </div>
        </Router>

    );
}

export default App;

import React, { useState } from 'react';
import Calculator from './components/calculator';
import TopBar from './components/topbar';
import EquationSolver from './components/EquationSolver'; 
import Graph from './components/graph';
import SignUpPage from './components/signup';
import LogInPage from './components/login';
import Matrix from './components/matrix'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';


function App() {
    const[equation, setEquation] = useState('');
            
    return (
      <div>
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
                        <Route path ="/calculator" element = {<Calculator/>}/>
                    </Routes>
                    <Routes>
                        <Route path="/calculator/equation" element=
                        {
                            <>
                                <EquationSolver equation={equation} setEquation={setEquation} />
                                <Graph equation={equation} setEquation={setEquation}/>
                            </>
                        }/>
                        <Route path="/calculator/matrix" element=
                        {
                            <>
                                <Matrix/>
                            </>
                        }/>
                    </Routes>
            </div>
        </Router>
      </div>

    );
}

export default App;

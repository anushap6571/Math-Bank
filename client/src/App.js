import React, { useState, useEffect } from 'react';
import Calculator from './components/calculator';
import TopBar from './components/topbar';
import EquationSolver from './components/EquationSolver';
import Graph from './components/graph';
import SignUpPage from './components/signup';
import LogInPage from './components/login';
import Matrix from './components/matrix';
import History from './components/history'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
    const [equation, setEquation] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');

    useEffect(() => {
        const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
        const storedUsername = localStorage.getItem('username');
        console.log('Retrieved username from localStorage:', storedUsername);
        setIsLoggedIn(loggedInStatus);
        setUsername(storedUsername || '');
    }, []);

    return (
        <div>
            <Router>
                <div>
                    <TopBar isLoggedIn={isLoggedIn} username={username} setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} />
                    <Routes>
                        <Route path="/sign-up" element={<SignUpPage setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} />} />
                        <Route path="/" element={<LogInPage setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} />} />
                        <Route path="/calculator" element={<Calculator />} />
                        <Route
                            path="/calculator/equation"
                            element={
                                <>
                                    <EquationSolver equation={equation} setEquation={setEquation} />
                                </>
                            }
                        />
                        <Route path="/calculator/matrix" element={<Matrix />} />
                    </Routes>
                </div>
            </Router>
        </div>
    );
}

export default App;

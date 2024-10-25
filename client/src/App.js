import React from 'react';
import Calculator from './components/calculator';
import TopBar from './components/topbar';
import SignUpPage from './components/signup';
import LogInPage from './components/login';


import{
    BrowserRouter as Router,
    Route,
    Routes
} from 'react-router-dom'


function App() {
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
            </div>
        </Router>

    );
}

export default App;

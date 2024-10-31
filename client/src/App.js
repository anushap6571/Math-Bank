import React, { useState } from 'react';
import Calculator from './components/calculator';
import TopBar from './components/topbar';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import EquationSolver from './components/EquationSolver'; 
import Graph from './components/graph';

function App() {
  
  const [equation, setEquation] = useState('');

  return (
    <div>
      <TopBar /> {/* Include the top bar */}
      <Router>
        <Routes>
          {/* Default route that redirects to /calculator */}
          <Route path="/" element={<Navigate to="/calculator" replace />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route 
                        path="/calculator/equation" 
                        element={
                            <>
                                <EquationSolver equation={equation} setEquation={setEquation} />
                                <Graph equation={equation} setEquation={setEquation}/>
                            </>
                        } 
                    />
        </Routes>
      </Router>
    </div>
  );
    
}

export default App;

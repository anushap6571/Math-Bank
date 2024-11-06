import React, { useState } from 'react';
import Calculator from './components/calculator';
import TopBar from './components/topbar';
import Notes from './components/notes';

function App() {
    return (
        <div>
            <TopBar />
            <Notes />
            <Calculator />
            
        </div>
    );
}

export default App;

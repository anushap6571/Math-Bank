
import React, { useState } from 'react';



const Graph = ({equation}) => {
    const [graphUrl, setGraphUrl] = useState('');
    const [error, setError] = useState('');



    const graphEquation = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/calculator/graph', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ expression: equation }),
            });

            const data = await response.json();
            if (response.ok) {
                setGraphUrl(`http://127.0.0.1:5000/${data.graph}`);
                console.log(graphUrl);
                setError('');
            } else {
                setError(data.error);
                setGraphUrl(null);
            }
        } catch (err) {
            setError('Error communicating with server.');
            setGraphUrl(null);
        }
    };

        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
                <button onClick={graphEquation} style={{ padding: '10px 20px', margin: '5px' }}>Graph</button>
                {graphUrl && (
                    <div style={{ marginTop: '20px', width: '80%', display: 'flex', justifyContent: 'center' }}>
                        <h3>Graph:</h3>
                        {/* Use iframe to load the graph */}
                        <iframe
                            src={graphUrl}
                            style={{ width: '50vw', height: '70vh', border: 'none' }}
                            title="Graph of the Equation"
                        ></iframe>
                    </div>
                )}
                {error && <p style={{ color: 'red' }}>{error}</p>}

            </div>

        );
};

export default Graph;
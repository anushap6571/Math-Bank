
import React, { useState } from 'react';



const Graph = ({equation}) => {
    const [graphUrl, setGraphUrl] = useState(null);
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
                
                
                
                setGraphUrl(data.graph);
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
            <div>
                <button onClick={graphEquation} style={{ padding: '10px 20px', margin: '5px' }}>Graph</button>
                {graphUrl && (
                    <div style={{ marginTop: '20px', width: '80%', display: 'flex', justifyContent: 'center' }}>
                        <h3>Graph:</h3>
                        <iframe
                            src={graphUrl}
                            
                            width="60%"
                            height="70%"
                            style={{ overflow: 'hidden' }}
                        ></iframe>
                    </div>
                )}
                {error && <p style={{ color: 'red' }}>{error}</p>}

            </div>

        );
};

export default Graph;
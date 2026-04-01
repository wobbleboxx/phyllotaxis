import React, { useEffect, useState } from 'react';
import PhyllotaxisCanvas from './PhyllotaxisCanvas';

const App = () => {
    const [angle, setAngle] = useState(() => {
        const saved = localStorage.getItem('angle');
        return saved ? JSON.parse(saved) : 137.5;
    });
    const [radius, setRadius] = useState(() => {
        const saved = localStorage.getItem('radius');
        return saved ? JSON.parse(saved) : 200;
    });
    const [turns, setTurns] = useState(() => {
        const saved = localStorage.getItem('turns');
        return saved ? JSON.parse(saved) : 5;
    });
    const [colorMode, setColorMode] = useState(() => {
        const saved = localStorage.getItem('colorMode');
        return saved ? JSON.parse(saved) : 'random';
    });

    useEffect(() => {
        localStorage.setItem('angle', JSON.stringify(angle));
    }, [angle]);
    useEffect(() => {
        localStorage.setItem('radius', JSON.stringify(radius));
    }, [radius]);
    useEffect(() => {
        localStorage.setItem('turns', JSON.stringify(turns));
    }, [turns]);
    useEffect(() => {
        localStorage.setItem('colorMode', JSON.stringify(colorMode));
    }, [colorMode]);

    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Phyllotaxis</h1>
            <div>
                <label>
                    Angle: 
                    <input type='range' min='0' max='360' value={angle} onChange={(e) => setAngle(e.target.value)} />
                </label>
            </div>
            <div>
                <label>
                    Radius: 
                    <input type='range' min='0' max='500' value={radius} onChange={(e) => setRadius(e.target.value)} />
                </label>
            </div>
            <div>
                <label>
                    Turns: 
                    <input type='range' min='0' max='10' step='1' value={turns} onChange={(e) => setTurns(e.target.value)} />
                </label>
            </div>
            <div>
                <label>
                    Color Mode: 
                    <select value={colorMode} onChange={(e) => setColorMode(e.target.value)}>
                        <option value='random'>Random</option>
                        <option value='gradient'>Gradient</option>
                    </select>
                </label>
            </div>
            <PhyllotaxisCanvas angle={angle} radius={radius} turns={turns} colorMode={colorMode} />
        </div>
    );
};

export default App;
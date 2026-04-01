import React, { useEffect, useState } from 'react';
import ParametersPanel from './ParametersPanel';

const App = () => {
  const [angle, setAngle] = useState(0);
  const [turns, setTurns] = useState(0);
  const [colorMode, setColorMode] = useState('default');

  useEffect(() => {
    const storedAngle = localStorage.getItem('angle');
    const storedTurns = localStorage.getItem('turns');
    const storedColorMode = localStorage.getItem('colorMode');

    if (storedAngle) setAngle(JSON.parse(storedAngle));
    if (storedTurns) setTurns(JSON.parse(storedTurns));
    if (storedColorMode) setColorMode(storedColorMode);
  }, []);

  useEffect(() => {
    localStorage.setItem('angle', JSON.stringify(angle));
    localStorage.setItem('turns', JSON.stringify(turns));
    localStorage.setItem('colorMode', colorMode);
  }, [angle, turns, colorMode]);

  return (
    <div>
      <ParametersPanel
        angle={angle}
        turns={turns}
        colorMode={colorMode}
        onAngleChange={setAngle}
        onTurnsChange={setTurns}
        onColorModeChange={setColorMode}
      />
      {/* Other components and rendering logic */}
    </div>
  );
};

export default App;
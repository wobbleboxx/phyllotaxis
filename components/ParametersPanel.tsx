import React, { useState } from 'react';

const ParametersPanel = ({ onParamsChange }) => {
  const [angle, setAngle] = useState(0);
  const [radius, setRadius] = useState(1);
  const [turns, setTurns] = useState(1);
  const [colorMode, setColorMode] = useState('normal');

  const handleChange = () => {
    onParamsChange({ angle, radius, turns, colorMode });
  };

  return (
    <div>
      <h2>Parameters Panel</h2>
      <label>
        Angle:
        <input type="range" min="0" max="360" value={angle} onChange={(e) => { setAngle(e.target.value); handleChange(); }} />
      </label>
      <label>
        Radius:
        <input type="range" min="1" max="10" value={radius} onChange={(e) => { setRadius(e.target.value); handleChange(); }} />
      </label>
      <label>
        Turns:
        <input type="range" min="1" max="10" value={turns} onChange={(e) => { setTurns(e.target.value); handleChange(); }} />
      </label>
      <label>
        Color Mode:
        <select value={colorMode} onChange={(e) => { setColorMode(e.target.value); handleChange(); }}>
          <option value="normal">Normal</option>
          <option value="dark">Dark</option>
          <option value="light">Light</option>
        </select>
      </label>
    </div>
  );
};

export default ParametersPanel;

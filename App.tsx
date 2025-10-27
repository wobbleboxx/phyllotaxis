import React, { useState } from 'react';
import PhyllotaxisCanvas from './components/PhyllotaxisCanvas';

const App: React.FC = () => {
  const [radiusScalingFactor, setRadiusScalingFactor] = useState(1.55);
  const [animationSpeed, setAnimationSpeed] = useState(1.0);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center font-sans p-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-grid-gray-700/[0.2] [mask-image:linear-gradient(to_bottom,white,transparent)]"></div>
      <div className="relative z-10 text-center mb-8">
        <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
          Golden Ratio Seed Spender
        </h1>
        <p className="mt-4 text-lg text-neutral-300 max-w-2xl mx-auto">
          A mesmerizing visualization of phyllotaxis. A central emitter rotates and shoots seeds at the golden angle (≈137.5°), creating a natural spiral pattern seen in sunflowers and pinecones.
        </p>
      </div>
      <div className="relative z-10 w-full max-w-4xl aspect-square shadow-2xl shadow-cyan-500/10 rounded-lg overflow-hidden border border-cyan-500/20">
         <PhyllotaxisCanvas 
            radiusScalingFactor={radiusScalingFactor}
            animationSpeed={animationSpeed}
         />
      </div>
      <div className="relative z-10 mt-8 w-full max-w-md text-center">
        <label htmlFor="radius-slider" className="block text-lg text-neutral-300 mb-2 font-medium">
          Seed Growth Factor: {radiusScalingFactor.toFixed(2)}
        </label>
        <input
          id="radius-slider"
          type="range"
          min="0.55"
          max="1.55"
          step="0.01"
          value={radiusScalingFactor}
          onChange={(e) => setRadiusScalingFactor(parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
          aria-label="Seed Growth Factor Slider"
        />
        <label htmlFor="speed-slider" className="block text-lg text-neutral-300 mt-6 mb-2 font-medium">
          Animation Speed: {animationSpeed.toFixed(2)}x
        </label>
        <input
          id="speed-slider"
          type="range"
          min="0.1"
          max="3.0"
          step="0.05"
          value={animationSpeed}
          onChange={(e) => setAnimationSpeed(parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
          aria-label="Animation Speed Slider"
        />
      </div>
       <footer className="relative z-10 mt-4 text-center text-neutral-500 text-sm">
        <p>Each new seed is placed at an angle of 137.5° relative to the last.</p>
        <p>This irrational angle ensures that no two seeds ever overlap perfectly, filling the space optimally.</p>
      </footer>
    </div>
  );
};

export default App;
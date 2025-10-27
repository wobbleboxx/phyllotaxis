import React, { useRef, useEffect } from 'react';
import { Seed } from '../types';

const PhyllotaxisCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const seedsRef = useRef<Seed[]>([]);
  const animationFrameIdRef = useRef<number>(0);
  const frameCounterRef = useRef<number>(0);

  // Constants for the simulation
  const GOLDEN_RATIO = (1 + Math.sqrt(5)) / 2;
  const GOLDEN_ANGLE = 2 * Math.PI * (2 - GOLDEN_RATIO);
  const SEED_BASE_RADIUS = 2.5;
  const SEED_BASE_SPEED = 1.2;
  const SPENDER_RADIUS = 20;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const { devicePixelRatio: ratio = 1 } = window;
      const { clientWidth, clientHeight } = canvas.parentElement || { clientWidth: 600, clientHeight: 600 };
      canvas.width = clientWidth * ratio;
      canvas.height = clientHeight * ratio;
      canvas.style.width = `${clientWidth}px`;
      canvas.style.height = `${clientHeight}px`;
      ctx.scale(ratio, ratio);
      // Reset seeds on resize to prevent weird artifacts
      seedsRef.current = [];
      frameCounterRef.current = 0;
    };

    resizeCanvas();

    const animate = () => {
      const centerX = (canvas.width / window.devicePixelRatio) / 2;
      const centerY = (canvas.height / window.devicePixelRatio) / 2;
      const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY);
      
      // Clear canvas with a subtle trail effect
      ctx.fillStyle = 'rgba(17, 24, 39, 0.15)'; // bg-gray-900 with alpha
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 1. Add a new seed on each frame
      const newSeedAngle = frameCounterRef.current * GOLDEN_ANGLE;
      const newSeed: Seed = {
        angle: newSeedAngle,
        distance: SPENDER_RADIUS,
        radius: SEED_BASE_RADIUS,
        speed: SEED_BASE_SPEED,
        color: `hsl(0, 90%, 70%)`
      };
      seedsRef.current.push(newSeed);

      // 2. Update and draw all seeds
      const updatedSeeds: Seed[] = [];
      for (const seed of seedsRef.current) {
        // Update distance
        seed.distance += seed.speed;
        
        // Only keep seeds that are within the canvas bounds
        if (seed.distance < maxDistance) {
          updatedSeeds.push(seed);
          
          // Calculate position
          const x = centerX + seed.distance * Math.cos(seed.angle);
          const y = centerY + seed.distance * Math.sin(seed.angle);

          // Update radius based on distance (age) - older seeds are bigger
          const maxGrowth = 7; // The max additional radius for seeds at the edge
          seed.radius = SEED_BASE_RADIUS + (seed.distance / maxDistance) * maxGrowth;

          // Update color based on distance
          const hue = (seed.distance / 4) % 360;
          seed.color = `hsl(${hue}, 90%, 70%)`;

          // Draw seed
          ctx.beginPath();
          ctx.arc(x, y, seed.radius, 0, 2 * Math.PI);
          ctx.fillStyle = seed.color;
          ctx.fill();
        }
      }
      seedsRef.current = updatedSeeds;

      // 3. Draw the central spender
      const spenderRotation = frameCounterRef.current * GOLDEN_ANGLE;
      
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(spenderRotation);
      
      // Spender Body
      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, SPENDER_RADIUS);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(1, 'rgba(209, 213, 219, 1)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(0, 0, SPENDER_RADIUS, 0, 2 * Math.PI);
      ctx.fill();
      
      // Spender Pointer
      ctx.fillStyle = '#06b6d4'; // cyan-500
      ctx.beginPath();
      ctx.moveTo(SPENDER_RADIUS, -4);
      ctx.lineTo(SPENDER_RADIUS + 15, 0);
      ctx.lineTo(SPENDER_RADIUS, 4);
      ctx.closePath();
      ctx.fill();
      
      ctx.restore();

      frameCounterRef.current++;
      animationFrameIdRef.current = requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener('resize', resizeCanvas);

    return () => {
      cancelAnimationFrame(animationFrameIdRef.current);
      window.removeEventListener('resize', resizeCanvas);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full block" />;
};

export default PhyllotaxisCanvas;
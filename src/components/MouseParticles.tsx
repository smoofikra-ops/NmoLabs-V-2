import React, { useEffect, useRef } from 'react';

export const MouseParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Disable canvas animation on mobile devices for optimal scroll performance
    if (window.innerWidth < 768 || 'ontouchstart' in window) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;
    let isMouseMoving = false;
    let timeoutId: number;
    let globalOpacity = 0;
    let clickPulse = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      
      if (currentX === -100) {
        currentX = targetX;
        currentY = targetY;
      }
      
      isMouseMoving = true;
      clearTimeout(timeoutId);
      
      timeoutId = window.setTimeout(() => {
        isMouseMoving = false;
      }, 150);
    };
    window.addEventListener('mousemove', handleMouseMove);

    const handleMouseDown = () => {
      clickPulse = 1.0;
    };
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('touchstart', handleMouseDown, { passive: true });

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      if (targetX !== -100) {
        // Smoothly lerp towards the target
        currentX += (targetX - currentX) * 0.15;
        currentY += (targetY - currentY) * 0.15;

        // Fade logic
        if (isMouseMoving) {
          globalOpacity = Math.min(1, globalOpacity + 0.05);
        } else {
          globalOpacity = Math.max(0, globalOpacity - 0.02);
        }

        // Decay pulse
        if (clickPulse > 0) {
          clickPulse = Math.max(0, clickPulse - 0.04); // Takes ~25 frames to decay
        }

        if (globalOpacity > 0 || clickPulse > 0) {
          ctx.save();
          ctx.globalCompositeOperation = 'screen';
          
          // Draw a soft ambient glow (purple/blue), expanding on click
          const ambientRadius = 250 + (clickPulse * 100);
          const ambientGrad = ctx.createRadialGradient(currentX, currentY, 0, currentX, currentY, ambientRadius);
          ambientGrad.addColorStop(0, `rgba(79, 142, 247, ${0.05 * globalOpacity + clickPulse * 0.1})`); // Blue
          ambientGrad.addColorStop(0.5, `rgba(168, 85, 247, ${0.02 * globalOpacity + clickPulse * 0.05})`); // Purple
          ambientGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
          
          ctx.fillStyle = ambientGrad;
          ctx.beginPath();
          ctx.arc(currentX, currentY, ambientRadius, 0, Math.PI * 2);
          ctx.fill();

          // Draw a tighter core glow (blue), brightening towards white/cyan on click
          const coreRadius = 80 + (clickPulse * 50);
          const coreGrad = ctx.createRadialGradient(currentX, currentY, 0, currentX, currentY, coreRadius);
          
          // Lerp colors from blue to white-ish on pulse
          const coreR = Math.floor(79 + clickPulse * 176);
          const coreG = Math.floor(142 + clickPulse * 113);
          const coreB = 247;
          
          coreGrad.addColorStop(0, `rgba(${coreR}, ${coreG}, ${coreB}, ${Math.min(1, 0.15 * globalOpacity + clickPulse * 0.2)})`);
          coreGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
          
          ctx.fillStyle = coreGrad;
          ctx.beginPath();
          ctx.arc(currentX, currentY, coreRadius, 0, Math.PI * 2);
          ctx.fill();
          
          // Even brighter center point, scales up on click
          const centerRadius = 20 + (clickPulse * 20);
          const centerGrad = ctx.createRadialGradient(currentX, currentY, 0, currentX, currentY, centerRadius);
          centerGrad.addColorStop(0, `rgba(255, 255, 255, ${Math.min(1, 0.25 * globalOpacity + clickPulse * 0.4)})`);
          centerGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
          
          ctx.fillStyle = centerGrad;
          ctx.beginPath();
          ctx.arc(currentX, currentY, centerRadius, 0, Math.PI * 2);
          ctx.fill();

          ctx.restore();
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('touchstart', handleMouseDown);
      clearTimeout(timeoutId);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999]"
      aria-hidden="true"
    />
  );
};

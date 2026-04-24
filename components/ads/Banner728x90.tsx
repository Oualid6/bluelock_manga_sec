import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const SCRIPT_SRC = 'https://landslidegraphsystems.com/907e49ba4d0f33f308658c004fcf8ff8/invoke.js';

const Banner728x90: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear previous ad content
    containerRef.current.innerHTML = '';

    // Remove any old script instance
    const old = document.querySelector(`script[src="${SCRIPT_SRC}"]`);
    if (old) old.remove();

    // Inject atOptions
    const optionsScript = document.createElement('script');
    optionsScript.text = `
      atOptions = {
        'key' : '907e49ba4d0f33f308658c004fcf8ff8',
        'format' : 'iframe',
        'height' : 90,
        'width' : 728,
        'params' : {}
      };
    `;
    containerRef.current.appendChild(optionsScript);

    // Inject invoke script
    const invokeScript = document.createElement('script');
    invokeScript.src = SCRIPT_SRC;
    containerRef.current.appendChild(invokeScript);
  }, [location.pathname]);

  return (
    <div
      suppressHydrationWarning
      style={{
        width: '100%',
        maxWidth: 728,
        height: 90,
        margin: '12px auto',
        overflow: 'hidden',
      }}
    >
      <div ref={containerRef} suppressHydrationWarning />
    </div>
  );
};

export default Banner728x90;

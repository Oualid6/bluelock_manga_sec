import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const SCRIPT_SRC = 'https://landslidegraphsystems.com/ea8da0079dde5fca342627af02558b60/invoke.js';

const Banner300x250: React.FC = () => {
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
        'key' : 'ea8da0079dde5fca342627af02558b60',
        'format' : 'iframe',
        'height' : 250,
        'width' : 300,
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
        width: 300,
        height: 250,
        margin: '16px auto',
        overflow: 'hidden',
      }}
    >
      <div ref={containerRef} suppressHydrationWarning />
    </div>
  );
};

export default Banner300x250;

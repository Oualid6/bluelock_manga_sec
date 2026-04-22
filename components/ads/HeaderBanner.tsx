import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export default function HeaderBanner() {
  const containerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current) return;
    
    const scriptUrl = 'https://landslidegraphsystems.com/907e49ba4d0f33f308658c004fcf8ff8/invoke.js';
    
    // Clear container to force ad reload on route change
    containerRef.current.innerHTML = '';
    
    const optionsScript = document.createElement('script');
    optionsScript.type = 'text/javascript';
    optionsScript.innerHTML = `
      atOptions = {
        'key' : '907e49ba4d0f33f308658c004fcf8ff8',
        'format' : 'iframe',
        'height' : 90,
        'width' : 728,
        'params' : {}
      };
    `;
    containerRef.current.appendChild(optionsScript);

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = scriptUrl;
    script.async = true;
    containerRef.current.appendChild(script);
  }, [location.pathname]);

  return (
    <div
      ref={containerRef}
      suppressHydrationWarning
      className="hidden md:block"
      style={{ minHeight: '90px', textAlign: 'center', margin: '8px auto', width: '728px' }}
    />
  );
}

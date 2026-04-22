import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export default function MidChapterAd() {
  const containerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current) return;
    
    const scriptUrl = 'https://landslidegraphsystems.com/ea8da0079dde5fca342627af02558b60/invoke.js';
    
    // Clear container to force ad reload on route change
    containerRef.current.innerHTML = '';
    
    const optionsScript = document.createElement('script');
    optionsScript.type = 'text/javascript';
    optionsScript.innerHTML = `
      atOptions = {
        'key' : 'ea8da0079dde5fca342627af02558b60',
        'format' : 'iframe',
        'height' : 250,
        'width' : 300,
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
      style={{ minHeight: '250px', width: '300px', textAlign: 'center', margin: '16px auto' }}
    />
  );
}

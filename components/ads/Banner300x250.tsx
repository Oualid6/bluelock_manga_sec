import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const INVOKE_URL = 'https://landslidegraphsystems.com/ea8da0079dde5fca342627af02558b60/invoke.js';

export default function Banner300x250() {
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Remove old script first
    const old = document.querySelector(`script[src="${INVOKE_URL}"]`);
    if (old) old.remove();

    // Set atOptions
    (window as any).atOptions = {
      key: 'ea8da0079dde5fca342627af02558b60',
      format: 'iframe',
      height: 250,
      width: 300,
      params: {}
    };

    // Inject new script
    const script = document.createElement('script');
    script.src = INVOKE_URL;
    script.async = true;
    if (containerRef.current) {
      containerRef.current.appendChild(script);
    }

    return () => {
      const s = document.querySelector(`script[src="${INVOKE_URL}"]`);
      if (s) s.remove();
    };
  }, [location]);

  return (
    <div
      ref={containerRef}
      suppressHydrationWarning
      style={{
        width: '300px',
        height: '250px',
        margin: '16px auto',
        textAlign: 'center',
        overflow: 'hidden'
      }}
    />
  );
}

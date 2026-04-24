import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const INVOKE_URL = 'https://landslidegraphsystems.com/907e49ba4d0f33f308658c004fcf8ff8/invoke.js';

export default function Banner728x90() {
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Remove old script first
    const old = document.querySelector(`script[src="${INVOKE_URL}"]`);
    if (old) old.remove();

    // Set atOptions
    (window as any).atOptions = {
      key: '907e49ba4d0f33f308658c004fcf8ff8',
      format: 'iframe',
      height: 90,
      width: 728,
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
        width: '728px',
        height: '90px',
        margin: '8px auto',
        textAlign: 'center',
        overflow: 'hidden'
      }}
    />
  );
}

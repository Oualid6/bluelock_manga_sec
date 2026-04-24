import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const INVOKE_URL = 'https://landslidegraphsystems.com/691413d2b6980d8308513b7de3d9ea7c/invoke.js';

export default function Banner320x50() {
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Remove old script first
    const old = document.querySelector(`script[src="${INVOKE_URL}"]`);
    if (old) old.remove();

    // Set atOptions
    (window as any).atOptions = {
      key: '691413d2b6980d8308513b7de3d9ea7c',
      format: 'iframe',
      height: 50,
      width: 320,
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
        width: '320px',
        height: '50px',
        margin: '8px auto',
        textAlign: 'center',
        overflow: 'hidden'
      }}
    />
  );
}

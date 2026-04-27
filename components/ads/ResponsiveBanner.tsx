import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

const DESKTOP_AD = {
  key: '907e49ba4d0f33f308658c004fcf8ff8',
  width: 728,
  height: 90,
  invokeUrl: 'https://landslidegraphsystems.com/907e49ba4d0f33f308658c004fcf8ff8/invoke.js',
};

const MOBILE_AD = {
  key: '691413d2b6980d8308513b7de3d9ea7c',
  width: 320,
  height: 50,
  invokeUrl: 'https://landslidegraphsystems.com/691413d2b6980d8308513b7de3d9ea7c/invoke.js',
};

export default function ResponsiveBanner() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size on mount and on resize
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Load correct ad when screen size or route changes
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!containerRef.current) return;

    const container = containerRef.current;
    const ad = isMobile ? MOBILE_AD : DESKTOP_AD;

    // Clear previous ad completely
    container.innerHTML = '';

    // Don't set fixed height — let the ad iframe expand it.
    // This way, if the ad fails to load (e.g. localhost CORS), 
    // the container stays collapsed (0 height) instead of leaving empty space.
    container.style.width = '100%';
    container.style.maxWidth = `${ad.width}px`;

    // Inject atOptions inline before invoke script
    const optScript = document.createElement('script');
    optScript.text = `
      window.atOptions = {
        key: '${ad.key}',
        format: 'iframe',
        height: ${ad.height},
        width: ${ad.width},
        params: {}
      }
    `;
    container.appendChild(optScript);

    // Inject invoke script inside container
    const invokeScript = document.createElement('script');
    invokeScript.src = ad.invokeUrl;
    invokeScript.async = true;
    container.appendChild(invokeScript);
  }, [isMobile, pathname]);

  return (
    <div
      ref={containerRef}
      suppressHydrationWarning
      style={{
        width: '100%',
        maxWidth: '728px',
        minHeight: 0,
        margin: '0 auto',
        display: 'block',
        overflow: 'hidden',
        textAlign: 'center',
      }}
    />
  );
}

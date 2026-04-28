import { useEffect, useRef, useState, useCallback } from 'react';
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

// Global queue to stagger ad loading across multiple instances on the same page.
// Without this, all instances set window.atOptions simultaneously and only the
// last one wins — the ~25% load rate the user reported.
let adLoadQueue: (() => void)[] = [];
let isProcessingQueue = false;

function enqueueAdLoad(loadFn: () => void) {
  adLoadQueue.push(loadFn);
  processQueue();
}

function processQueue() {
  if (isProcessingQueue || adLoadQueue.length === 0) return;
  isProcessingQueue = true;
  const next = adLoadQueue.shift()!;
  next();
  // Stagger each ad injection by 300ms so the invoke script has time
  // to read window.atOptions before the next instance overwrites it.
  setTimeout(() => {
    isProcessingQueue = false;
    processQueue();
  }, 300);
}

export default function ResponsiveBanner() {
  const containerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);
  const loadIdRef = useRef(0); // Track the latest load to ignore stale callbacks

  // Detect screen size on mount and on resize
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const loadAd = useCallback(() => {
    if (typeof window === 'undefined') return;
    if (!containerRef.current) return;

    const currentLoadId = ++loadIdRef.current;
    const container = containerRef.current;
    const ad = isMobile ? MOBILE_AD : DESKTOP_AD;

    // Clear previous ad completely
    container.innerHTML = '';

    // Don't set fixed height — let the ad iframe expand it.
    // This way, if the ad fails to load (e.g. localhost CORS),
    // the container stays collapsed (0 height) instead of leaving empty space.
    container.style.width = '100%';
    container.style.maxWidth = `${ad.width}px`;

    enqueueAdLoad(() => {
      // If a newer load was triggered while we were queued, bail out
      if (currentLoadId !== loadIdRef.current) return;
      if (!containerRef.current) return;

      console.log('Ad loading for:', location.pathname, '| mobile:', isMobile);

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
    });
  }, [isMobile, location.pathname]);

  // Reload ad on route change or screen size change.
  // Uses location.pathname (which react-router-dom v7 updates on every navigation)
  // plus a popstate listener as a safety net for back/forward browser navigation.
  useEffect(() => {
    loadAd();
  }, [loadAd]);

  // Safety net: listen for popstate (back/forward button) which can sometimes
  // not trigger a re-render in the React tree
  useEffect(() => {
    const handlePopState = () => {
      console.log('Ad reload via popstate:', window.location.pathname);
      loadAd();
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [loadAd]);

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

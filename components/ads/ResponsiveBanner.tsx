import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

const DESKTOP_AD = {
  key: '907e49ba4d0f33f308658c004fcf8ff8',
  width: 728,
  height: 90,
  invokeUrl: 'https://wholespankmelon.com/907e49ba4d0f33f308658c004fcf8ff8/invoke.js',
};

const MOBILE_AD = {
  key: '691413d2b6980d8308513b7de3d9ea7c',
  width: 320,
  height: 50,
  invokeUrl: 'https://wholespankmelon.com/691413d2b6980d8308513b7de3d9ea7c/invoke.js',
};

function getIsMobile() {
  return typeof window !== 'undefined' && window.innerWidth < 768;
}

/**
 * ResponsiveBanner — Adsterra responsive banner ad.
 *
 * Key design decisions to guarantee 100% load rate:
 *
 * 1. We use `location.key` (unique per navigation) as a React `key` on the
 *    inner container. This forces a full unmount→remount cycle on every route
 *    change, giving Adsterra a pristine DOM node every time.
 *
 * 2. We read `isMobile` synchronously via `getIsMobile()` at effect time,
 *    avoiding the setState→rerender→stale-closure race that was causing
 *    wrong ad sizes on mobile.
 *
 * 3. We removed the module-level queue. The queue + 300ms stagger was the
 *    primary cause of dropped impressions — if navigation happened within the
 *    stagger window, the new ad load was blocked behind the old one.
 *    Since Home and ChapterReader are never rendered simultaneously, there's
 *    no collision risk.
 *
 * 4. We retry up to 3 times if containerRef is null (can happen during React
 *    Suspense transitions where the DOM isn't painted yet).
 */
export default function ResponsiveBanner() {
  const location = useLocation();
  // location.key is unique per navigation entry (even to the same path).
  // This guarantees a full remount of the ad container on every navigation.
  const navKey = location.key || location.pathname;

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '728px',
        minHeight: 0,
        margin: '0 auto',
        display: 'block',
        overflow: 'hidden',
        textAlign: 'center' as const,
      }}
    >
      {/* The key forces React to unmount and remount AdSlot on every navigation */}
      <AdSlot key={navKey} pathname={location.pathname} />
    </div>
  );
}

function AdSlot({ pathname }: { pathname: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(getIsMobile);

  // Track screen size for responsive ad selection
  useEffect(() => {
    const check = () => setIsMobile(getIsMobile());
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    let cancelled = false;
    let retryCount = 0;
    const MAX_RETRIES = 3;
    const RETRY_DELAY = 100;

    function injectAd() {
      if (cancelled) return;

      const container = containerRef.current;
      if (!container) {
        // Container not yet in DOM (Suspense boundary, etc.) — retry
        if (retryCount < MAX_RETRIES) {
          retryCount++;
          setTimeout(injectAd, RETRY_DELAY);
        }
        return;
      }

      // Read mobile state synchronously at injection time to avoid stale closure
      const mobile = getIsMobile();
      const ad = mobile ? MOBILE_AD : DESKTOP_AD;

      // Clear any previous content (shouldn't be any since we key-remount, but safety)
      container.innerHTML = '';
      container.style.width = '100%';
      container.style.maxWidth = `${ad.width}px`;

      // 1. Inject atOptions as inline script
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

      // 2. Inject invoke script
      const invokeScript = document.createElement('script');
      invokeScript.src = ad.invokeUrl;
      invokeScript.async = true;
      invokeScript.onload = () => {
        if (!cancelled) {
          console.log(`[Ad] Loaded for ${pathname} | mobile: ${mobile}`);
        }
      };
      invokeScript.onerror = () => {
        console.warn(`[Ad] Failed to load invoke script for ${pathname}`);
      };
      container.appendChild(invokeScript);
    }

    // Small delay to ensure the DOM container is painted after Suspense resolves
    const timer = setTimeout(injectAd, 50);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [pathname, isMobile]);

  return (
    <div
      ref={containerRef}
      suppressHydrationWarning
      style={{
        width: '100%',
        minHeight: 0,
        display: 'flex',
        justifyContent: 'center',
        margin: '0 auto',
        overflow: 'hidden',
      }}
    />
  );
}

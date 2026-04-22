import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function NativeBannerAd() {
  const location = useLocation();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const scriptUrl = 'https://landslidegraphsystems.com/016b72f52f04b8b2786a7ac37e578533/invoke.js';
    
    // Clean up previous ad container content to force reload
    const container = document.getElementById('container-016b72f52f04b8b2786a7ac37e578533');
    if (container) {
      container.innerHTML = '';
    }

    // Remove old script to allow re-injection
    const oldScript = document.querySelector(`script[src="${scriptUrl}"]`);
    if (oldScript) {
      oldScript.remove();
    }

    const script = document.createElement('script');
    script.src = scriptUrl;
    script.async = true;
    script.setAttribute('data-cfasync', 'false');
    document.body.appendChild(script);
  }, [location.pathname]);

  return (
    <div
      id="container-016b72f52f04b8b2786a7ac37e578533"
      suppressHydrationWarning
      style={{ textAlign: 'center', margin: '16px auto', minHeight: '50px' }}
    />
  );
}

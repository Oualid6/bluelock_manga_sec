import React, { useEffect } from 'react';

export default function NativeBannerAd() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const scriptUrl = 'https://landslidegraphsystems.com/016b72f52f04b8b2786a7ac37e578533/invoke.js';
    
    if (!document.querySelector(`script[src="${scriptUrl}"]`)) {
      const script = document.createElement('script');
      script.src = scriptUrl;
      script.async = true;
      script.setAttribute('data-cfasync', 'false');
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div
      id="container-016b72f52f04b8b2786a7ac37e578533"
      suppressHydrationWarning
      style={{ textAlign: 'center', margin: '16px auto', minHeight: '50px' }}
    />
  );
}

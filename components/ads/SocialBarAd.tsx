import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function SocialBarAd() {
  const location = useLocation();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const scriptUrl = 'https://landslidegraphsystems.com/94/12/2d/94122da8a5f6856e50c578d4251a8e95.js';
    
    const oldScript = document.querySelector(`script[src="${scriptUrl}"]`);
    if (oldScript) {
      oldScript.remove();
    }

    const script = document.createElement('script');
    script.src = scriptUrl;
    script.async = true;
    document.body.appendChild(script);
  }, [location.pathname]);

  return null;
}

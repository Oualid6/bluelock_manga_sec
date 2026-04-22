import React, { useEffect } from 'react';

export default function SocialBarAd() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const scriptUrl = 'https://landslidegraphsystems.com/94/12/2d/94122da8a5f6856e50c578d4251a8e95.js';
    
    if (!document.querySelector(`script[src="${scriptUrl}"]`)) {
      const script = document.createElement('script');
      script.src = scriptUrl;
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return null;
}

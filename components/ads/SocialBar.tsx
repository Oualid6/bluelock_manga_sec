import { useEffect } from 'react';

const SOCIAL_BAR_SRC = 'https://wholespankmelon.com/94/12/2d/94122da8a5f6856e50c578d4251a8e95.js';

export default function SocialBar() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Remove any stale script tag so it re-executes on every mount
    const old = document.querySelector(`script[src="${SOCIAL_BAR_SRC}"]`);
    if (old) old.remove();

    const script = document.createElement('script');
    script.src = SOCIAL_BAR_SRC;
    script.async = true;
    script.type = 'text/javascript';
    document.body.appendChild(script);

    return () => {
      // Cleanup on unmount so the next mount can re-inject
      script.remove();
    };
  }, []);

  return null;
}

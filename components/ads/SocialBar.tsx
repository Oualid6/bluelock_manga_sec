import { useEffect } from 'react';

const SOCIAL_BAR_SRC = 'https://wholespankmelon.com/94/12/2d/94122da8a5f6856e50c578d4251a8e95.js';

export default function SocialBar() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Social Bar manages its own state internally.
    // Just inject it once on app mount.
    const script = document.createElement('script');
    script.src = SOCIAL_BAR_SRC;
    script.async = true;
    script.type = 'text/javascript';
    document.body.appendChild(script);

    // No cleanup on unmount because the script manages itself 
    // and should persist across route changes.
  }, []);

  return null;
}

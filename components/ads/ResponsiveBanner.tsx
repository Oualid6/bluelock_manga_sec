import { useState, useEffect } from 'react';
import Banner320x50 from './Banner320x50';
import Banner728x90 from './Banner728x90';

export default function ResponsiveBanner() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <div suppressHydrationWarning style={{ overflow: 'hidden', width: '100%' }}>
      {isMobile ? <Banner320x50 /> : <Banner728x90 />}
    </div>
  );
}

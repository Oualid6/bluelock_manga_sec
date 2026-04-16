import React, { useEffect } from 'react';

interface DisqusCommentsProps {
  url: string;
  identifier: string;
  title: string;
}

const DisqusComments: React.FC<DisqusCommentsProps> = ({ url, identifier, title }) => {
  useEffect(() => {
    // Set configuration variables globally for Disqus
    (window as any).disqus_config = function () {
      this.page.url = url;
      this.page.identifier = identifier;
      this.page.title = title;
    };

    const d = document;

    // If DISQUS is already loaded globally, we just reset it with the new config for SPA navigation.
    if ((window as any).DISQUS) {
      (window as any).DISQUS.reset({
        reload: true,
        config: function () {
          this.page.url = url;
          this.page.identifier = identifier;
          this.page.title = title;
        }
      });
    } else {
      // If it hasn't loaded yet, append the embed script
      const s = d.createElement('script');
      s.src = 'https://bluelocken.disqus.com/embed.js';
      s.setAttribute('data-timestamp', new Date().getTime().toString());
      (d.head || d.body).appendChild(s);
    }
  }, [url, identifier, title]);

  return (
    <div className="w-full min-h-[400px] relative transition-all duration-300">
      {/* Reserve space so the page doesn't jump aggressively when Disqus (+ its ads) injects its iframe */}
      <div id="disqus_thread" className="min-h-[400px] w-full"></div>
      <noscript>
        Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a>
      </noscript>
    </div>
  );
};

export default DisqusComments;

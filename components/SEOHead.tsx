import React, { useEffect } from 'react';
import { SEOMeta } from '../types';

export interface HreflangAlternate {
  lang: string;
  href: string;
}

interface SEOHeadProps extends SEOMeta {
  canonicalUrl?: string;
  noindex?: boolean;
  hreflangAlternates?: HreflangAlternate[];
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  schema,
  canonicalUrl,
  noindex,
  hreflangAlternates,
}) => {
  useEffect(() => {
    // 1. Update Title
    document.title = title.includes('Blue Lock Manga') ? title : `${title} | Blue Lock Manga`;

    // 2. Update Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);

    // 3. Update Robots Meta Tag
    let metaRobots = document.querySelector('meta[name="robots"]');
    if (noindex) {
      if (!metaRobots) {
        metaRobots = document.createElement('meta');
        metaRobots.setAttribute('name', 'robots');
        document.head.appendChild(metaRobots);
      }
      metaRobots.setAttribute('content', 'noindex, follow');
    } else if (metaRobots) {
      metaRobots.setAttribute('content', 'index, follow');
    }

    // 4. Update Canonical Tag
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (canonicalUrl) {
      if (!linkCanonical) {
        linkCanonical = document.createElement('link');
        linkCanonical.setAttribute('rel', 'canonical');
        document.head.appendChild(linkCanonical);
      }
      linkCanonical.setAttribute('href', canonicalUrl);
    } else if (linkCanonical) {
      linkCanonical.remove();
    }

    // 5. Update Hreflang Alternate Links
    // Remove old dynamic alternates
    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => {
      // keep sitemap or other alternates if non-hreflang
      el.remove();
    });

    if (hreflangAlternates && hreflangAlternates.length > 0) {
      hreflangAlternates.forEach((alt) => {
        const link = document.createElement('link');
        link.setAttribute('rel', 'alternate');
        link.setAttribute('hreflang', alt.lang);
        link.setAttribute('href', alt.href);
        document.head.appendChild(link);
      });
    }

    // 6. Add Schema.org JSON-LD
    if (schema) {
      let scriptSchema = document.querySelector('#structured-data');
      if (!scriptSchema) {
        scriptSchema = document.createElement('script');
        scriptSchema.id = 'structured-data';
        scriptSchema.setAttribute('type', 'application/ld+json');
        document.head.appendChild(scriptSchema);
      }
      scriptSchema.textContent = JSON.stringify(schema);
    }

    return () => {
      // cleanup on route change
    };
  }, [title, description, schema, canonicalUrl, noindex, hreflangAlternates]);

  return null;
};

export default SEOHead;
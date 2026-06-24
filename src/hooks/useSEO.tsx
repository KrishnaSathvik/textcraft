import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  structuredData?: Record<string, unknown>;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  robots?: string;
}

export const useSEO = ({
  title,
  description,
  keywords,
  canonical,
  structuredData,
  ogImage = 'https://www.textcraft.dev/og-image.png',
  ogType = 'website',
  twitterCard = 'summary_large_image',
  robots = 'index, follow',
}: SEOProps) => {
  useEffect(() => {
    const siteName = 'TextCraft';
    document.title = title?.includes(siteName) ? title : `${title || ''} | ${siteName}`;

    updateMetaTag('name', 'description', description);
    updateMetaTag('name', 'robots', robots);

    if (keywords) {
      updateMetaTag('name', 'keywords', keywords);
    }

    if (canonical) {
      updateCanonical(canonical);
    }

    updateMetaTag('property', 'og:title', title);
    updateMetaTag('property', 'og:description', description);
    updateMetaTag('property', 'og:type', ogType);
    updateMetaTag('property', 'og:image', ogImage);
    updateMetaTag('property', 'og:url', canonical || window.location.href);
    updateMetaTag('property', 'og:site_name', siteName);

    updateMetaTag('name', 'twitter:card', twitterCard);
    updateMetaTag('name', 'twitter:title', title);
    updateMetaTag('name', 'twitter:description', description);
    updateMetaTag('name', 'twitter:image', ogImage);

    if (structuredData) {
      addStructuredData(structuredData);
    }

    return () => {
      removeStructuredData();
    };
  }, [title, description, keywords, canonical, structuredData, ogImage, ogType, twitterCard, robots]);
};

const updateMetaTag = (attribute: string, value: string, content: string) => {
  const existingTag = document.querySelector(`meta[${attribute}="${value}"]`);

  if (existingTag) {
    existingTag.setAttribute('content', content);
  } else {
    const metaTag = document.createElement('meta');
    metaTag.setAttribute(attribute, value);
    metaTag.setAttribute('content', content);
    document.head.appendChild(metaTag);
  }
};

const updateCanonical = (url: string) => {
  let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;

  if (canonicalLink) {
    canonicalLink.href = url;
  } else {
    canonicalLink = document.createElement('link');
    canonicalLink.rel = 'canonical';
    canonicalLink.href = url;
    document.head.appendChild(canonicalLink);
  }
};

const addStructuredData = (data: Record<string, unknown>) => {
  removeStructuredData();

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(data);
  script.id = 'structured-data';
  document.head.appendChild(script);
};

const removeStructuredData = () => {
  const existingScript = document.getElementById('structured-data');
  if (existingScript) {
    existingScript.remove();
  }
};

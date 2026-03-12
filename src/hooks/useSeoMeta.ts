import { useEffect } from 'react';

type SeoMeta = {
  title: string;
  description: string;
  canonical: string;
};

const ensureMeta = (selector: string, attributeName: 'name' | 'property', attributeValue: string) => {
  let meta = document.head.querySelector<HTMLMetaElement>(selector);
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute(attributeName, attributeValue);
    document.head.appendChild(meta);
  }
  return meta;
};

const setMetaContent = (selector: string, attributeName: 'name' | 'property', attributeValue: string, content: string) => {
  const meta = ensureMeta(selector, attributeName, attributeValue);
  meta.setAttribute('content', content);
};

const ensureCanonical = () => {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.rel = 'canonical';
    document.head.appendChild(link);
  }
  return link;
};

export const useSeoMeta = ({ title, description, canonical }: SeoMeta) => {
  useEffect(() => {
    document.title = title;

    setMetaContent('meta[name="description"]', 'name', 'description', description);
    setMetaContent('meta[property="og:title"]', 'property', 'og:title', title);
    setMetaContent('meta[property="og:description"]', 'property', 'og:description', description);
    setMetaContent('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    setMetaContent('meta[name="twitter:description"]', 'name', 'twitter:description', description);

    const canonicalLink = ensureCanonical();
    canonicalLink.href = canonical;
  }, [title, description, canonical]);
};

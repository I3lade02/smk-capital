import { useEffect } from "react";

const SITE_URL = "https://smkcapital.cz";
const DEFAULT_ROBOTS =
  "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

type SeoProps = {
  title: string;
  description: string;
  /** Path relative to the site root, e.g. "/sluzby". Use "/" for the homepage. */
  path: string;
  noindex?: boolean;
};

function setMetaContent(selector: string, content: string) {
  document.head.querySelector(selector)?.setAttribute("content", content);
}

/**
 * This is a client-only SPA (no SSR/prerendering), so these updates only
 * reach crawlers that execute JavaScript, like Googlebot. Bots that read
 * raw HTML (some social-preview crawlers) will still see index.html's
 * defaults. Keep those defaults equal to the homepage's values.
 */
export function Seo({ title, description, path, noindex = false }: SeoProps) {
  useEffect(() => {
    const url = `${SITE_URL}${path === "/" ? "/" : path}`;

    document.title = title;
    setMetaContent('meta[name="description"]', description);
    setMetaContent(
      'meta[name="robots"]',
      noindex ? "noindex, nofollow" : DEFAULT_ROBOTS,
    );
    document.head
      .querySelector('link[rel="canonical"]')
      ?.setAttribute("href", url);

    setMetaContent('meta[property="og:title"]', title);
    setMetaContent('meta[property="og:description"]', description);
    setMetaContent('meta[property="og:url"]', url);

    setMetaContent('meta[name="twitter:title"]', title);
    setMetaContent('meta[name="twitter:description"]', description);
  }, [title, description, path, noindex]);

  return null;
}

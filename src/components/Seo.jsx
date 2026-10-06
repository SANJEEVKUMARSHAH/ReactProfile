import { useEffect } from "react";
import { site } from "../data/site";

// Finds a <meta>/<link> tag in <head> (or creates it) and sets its value.
function upsert(tag, attr, key, valueAttr, value) {
  let el = document.head.querySelector(`${tag}[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement(tag);
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute(valueAttr, value);
}

// Updates the document head for each route. Rendered at the top of every page.
export default function Seo({ title, description, path = "/", noindex = false, pageType = "WebPage" }) {
  useEffect(() => {
    const url = `${site.url}${path}`;
    const image = `${site.url}/og-image.png`;

    document.title = title;
    upsert("meta", "name", "description", "content", description);
    upsert("meta", "name", "robots", "content", noindex ? "noindex, nofollow" : "index, follow");
    upsert("link", "rel", "canonical", "href", url);

    upsert("meta", "property", "og:type", "content", "website");
    upsert("meta", "property", "og:title", "content", title);
    upsert("meta", "property", "og:description", "content", description);
    upsert("meta", "property", "og:url", "content", url);
    upsert("meta", "property", "og:image", "content", image);
    upsert("meta", "name", "twitter:card", "content", "summary_large_image");
    upsert("meta", "name", "twitter:title", "content", title);
    upsert("meta", "name", "twitter:description", "content", description);
    upsert("meta", "name", "twitter:image", "content", image);

    // Page-level structured data (the Person + WebSite data lives in index.html)
    let script = document.getElementById("page-jsonld");
    if (!script) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = "page-jsonld";
      document.head.appendChild(script);
    }
    script.textContent = noindex
      ? ""
      : JSON.stringify({
          "@context": "https://schema.org",
          "@type": pageType,
          name: title,
          description,
          url,
          isPartOf: { "@id": `${site.url}/#website` },
          about: { "@id": `${site.url}/#person` },
        });
  }, [title, description, path, noindex, pageType]);

  return null; // renders nothing on screen
}

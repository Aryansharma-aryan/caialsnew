import { useEffect } from "react";
import { useLocation } from "react-router-dom";
/* eslint-disable react-refresh/only-export-components */
import { businessName, email, phone, siteUrl } from "../../data/seoContent";

const imageUrl = `${siteUrl}/android-chrome-512x512.png`;

function setMeta(selector, attr, value) {
  let tag = document.head.querySelector(selector);
  if (!tag) {
    tag = document.createElement("meta");
    const match = selector.match(/\[(name|property)="([^"]+)"\]/);
    if (match) tag.setAttribute(match[1], match[2]);
    document.head.appendChild(tag);
  }
  tag.setAttribute(attr, value);
}

function setCanonical(url) {
  let link = document.head.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", url);
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    name: businessName,
    url: siteUrl,
    image: imageUrl,
    telephone: phone,
    email,
    description:
      "Professional immigration, visa, OCI, Indian passport, and documentation support in Fremont, CA for Bay Area, USA, and Indian clients.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "2450 Peralta Blvd, Suite #107",
      addressLocality: "Fremont",
      addressRegion: "CA",
      postalCode: "94536",
      addressCountry: "US",
    },
    areaServed: [
      { "@type": "City", name: "Fremont" },
      { "@type": "AdministrativeArea", name: "Bay Area" },
      { "@type": "Country", name: "United States" },
      { "@type": "Country", name: "India" },
    ],
    priceRange: "$$",
  };
}

export function faqSchema(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
      },
    })),
  };
}

export function breadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  };
}

export default function SEO({ title, description, keywords, schema = [], robots = "index, follow" }) {
  const location = useLocation();
  const canonical = `${siteUrl}${location.pathname === "/" ? "/" : location.pathname}`;

  useEffect(() => {
    document.title = title;
    setMeta('meta[name="description"]', "content", description);
    setMeta('meta[name="keywords"]', "content", keywords || "");
    setMeta('meta[name="author"]', "content", businessName);
    setMeta('meta[name="robots"]', "content", robots);
    setMeta('meta[property="og:title"]', "content", title);
    setMeta('meta[property="og:description"]', "content", description);
    setMeta('meta[property="og:url"]', "content", canonical);
    setMeta('meta[property="og:type"]', "content", "website");
    setMeta('meta[property="og:image"]', "content", imageUrl);
    setMeta('meta[name="twitter:card"]', "content", "summary_large_image");
    setMeta('meta[name="twitter:title"]', "content", title);
    setMeta('meta[name="twitter:description"]', "content", description);
    setMeta('meta[name="twitter:image"]', "content", imageUrl);
    setMeta('meta[name="geo.region"]', "content", "US-CA");
    setMeta('meta[name="geo.placename"]', "content", "Fremont");
    setMeta('meta[name="geo.position"]', "content", "37.5483;-121.9886");
    setMeta('meta[name="ICBM"]', "content", "37.5483, -121.9886");
    setCanonical(canonical);

    document.querySelectorAll("script[data-seo-schema]").forEach((node) => node.remove());
    [localBusinessSchema(), ...schema].forEach((entry) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.dataset.seoSchema = "true";
      script.text = JSON.stringify(entry);
      document.head.appendChild(script);
    });
  }, [canonical, description, keywords, robots, schema, title]);

  return null;
}

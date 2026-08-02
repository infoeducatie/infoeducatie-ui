"use strict";

import { useMemo } from "react";

function resolveAssetUrl(assetUrl) {
  if (!assetUrl) return null;

  try {
    return new URL(assetUrl, window.config.API_URL).toString();
  } catch {
    return assetUrl;
  }
}

function prepareRichText(html) {
  if (!html || typeof DOMParser === "undefined") return html;

  const document = new DOMParser().parseFromString(html, "text/html");

  document.querySelectorAll("img[src]").forEach((image) => {
    const source = image.getAttribute("src");

    if (source?.startsWith("/uploads/")) {
      image.setAttribute("src", resolveAssetUrl(source));
    }
  });

  document.querySelectorAll("a[href]").forEach((link) => {
    const href = link.getAttribute("href");

    if (href?.startsWith("/uploads/")) {
      link.setAttribute("href", resolveAssetUrl(href));
    }
    if (/^https?:\/\//.test(href || "")) {
      link.setAttribute("rel", "noreferrer");
      link.setAttribute("target", "_blank");
    }
  });

  Array.from(document.body.children).forEach((element) => {
    if (element.tagName === "H1") {
      const heading = document.createElement("h2");
      heading.innerHTML = element.innerHTML;
      element.replaceWith(heading);
    } else if (
      element.tagName === "DIV" &&
      !element.querySelector("figure")
    ) {
      const paragraph = document.createElement("p");
      paragraph.innerHTML = element.innerHTML;
      element.replaceWith(paragraph);
    }
  });

  return document.body.innerHTML;
}

export default function RichTextContent({ html }) {
  const preparedHtml = useMemo(() => prepareRichText(html), [html]);

  if (!preparedHtml) return null;

  return (
    <div
      className="rich-text-content"
      dangerouslySetInnerHTML={{ __html: preparedHtml }}
    />
  );
}

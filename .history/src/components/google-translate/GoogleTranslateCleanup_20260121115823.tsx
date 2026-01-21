"use client";
import { useEffect } from "react";

export default function GoogleTranslateCleanup() {
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      .goog-te-banner-frame, 
      .goog-te-balloon-frame, 
      .goog-te-header,
      #goog-gt-tt, 
      .goog-tooltip, 
      .goog-tooltip:hover {
        display: none !important;
      }
      body {
        top: 0 !important;
      }
      .skiptranslate {
        display: none !important;
      }
    `;
    document.head.appendChild(style);

    const removeElements = () => {
      const banner = document.querySelector(".goog-te-banner-frame");
      if (banner) banner.remove();
      document.body.classList.remove("skiptranslate");
    };

    const timer = setInterval(removeElements, 500);
    return () => {
      clearInterval(timer);
      style.remove();
    };
  }, []);

  return null;
}

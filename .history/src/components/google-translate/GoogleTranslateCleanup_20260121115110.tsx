"use client";
import { useEffect } from "react";

export default function GoogleTranslateCleanup() {
  useEffect(() => {
    const removeProblematicElements = () => {
      const banner = document.querySelector(".goog-te-banner-frame");
      if (banner) banner.remove();
      document.body.classList.remove("skiptranslate");
      document.body.style.top = "0";
    };

    const observer = new MutationObserver(() => removeProblematicElements());
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  return null;
}

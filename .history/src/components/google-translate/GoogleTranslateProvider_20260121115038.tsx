
"use client";

import React, { useEffect, useState } from "react";

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: any;
  }
}

function GoogleTranslateProvider({ children }: { children: React.ReactNode }) {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const addGoogleTranslateScript = () => {
      if (!document.querySelector("#google-translate-script")) {
        const script = document.createElement("script");
        script.id = "google-translate-script";
        script.src =
          "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        script.async = true;
        document.body.appendChild(script);
      }

      window.googleTranslateElementInit = () => {
        if (window.google && !isInitialized) {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: "en",
              includedLanguages: "en,pt,bn", // যে যে ভাষা রাখতে চাস (English, Portuguese, Bangla)
              layout:
                window.google.translate.TranslateElement.InlineLayout
                  .HORIZONTAL,
            },
            "google_translate_element",
          );
          setIsInitialized(true);
        }
      };
    };

    addGoogleTranslateScript();
  }, [isInitialized]);

  return (
    <>
      {/* এটা হিডেন থাকবে কারণ আমরা কাস্টম সিলেক্টর ইউজ করবো */}
      <div
        id="google_translate_element"
        style={{ display: "none" }}></div>
      {children}
    </>
  );
}

export default GoogleTranslateProvider;

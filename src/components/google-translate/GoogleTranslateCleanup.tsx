"use client";
import { useEffect } from "react";

export default function GoogleTranslateCleanup() {
  useEffect(() => {
    // ১. গ্লোবাল হেড স্টাইল ইনজেকশন (এটি রেন্ডার হওয়ার আগেই ব্লক করবে)
    const style = document.createElement("style");
    style.innerHTML = `
      /* গুগলের লোগো, আইকন এবং পপআপ চিরতরে বন্ধ */
      .goog-te-gadget, 
      .goog-te-gadget img,
      .goog-te-gadget span,
      .goog-te-banner-frame,
      .goog-te-balloon-frame,
      .goog-te-header,
      #goog-gt-tt, 
      .goog-tooltip, 
      .goog-tooltip:hover,
      .skiptranslate,
      iframe.goog-te-banner-frame,
      #google_translate_element {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        height: 0 !important;
        width: 0 !important;
        position: absolute !important;
        pointer-events: none !important;
      }

      /* বডিতে আসা এক্সট্রা স্পেস ফিক্স */
      body {
        top: 0 !important;
        position: static !important;
      }
    `;
    document.head.appendChild(style);

    // ২. MutationObserver ব্যবহার করে ডাইনামিকালি আসা এলিমেন্ট রিমুভ করা
    // এটি setInterval এর চেয়ে অনেক বেশি পাওয়ারফুল এবং এফিশিয়েন্ট
    const observer = new MutationObserver(() => {
      // ড্রপডাউন বা আইকন যা গুগলের উইজেট থেকে আসে
      const gadgets = document.querySelectorAll(
        ".goog-te-gadget, .skiptranslate, iframe.goog-te-banner-frame",
      );
      gadgets.forEach((g) => g.remove());

      // বডি থেকে ক্লাস রিমুভ করা যা লেআউট নষ্ট করে
      if (document.body.classList.contains("skiptranslate")) {
        document.body.classList.remove("skiptranslate");
      }
    });

    // পুরো ডকুমেন্ট মনিটর করবে কোনো নতুন নোড অ্যাড হচ্ছে কি না
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      style.remove();
    };
  }, []);

  return null;
}

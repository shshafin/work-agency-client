"use client";
import { useEffect } from "react";

export default function GoogleTranslateCleanup() {
  useEffect(() => {
    // ১. গ্লোবাল সিএসএস ইনজেকশন (যাতে রেন্ডার হওয়ার আগেই হাইড হয়ে যায়)
    const style = document.createElement("style");
    style.innerHTML = `
      /* গুগলের লোগো এবং পপআপ হাইড করার জন্য */
      .goog-te-gadget, 
      .goog-te-gadget img,
      .goog-te-gadget span,
      .goog-te-banner-frame,
      #goog-gt-tt,
      .goog-tooltip,
      .goog-tooltip:hover,
      .goog-te-balloon-frame,
      .skiptranslate {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
      }
      
      /* গুগল ট্রান্সলেটের কারণে বডিতে আসা এক্সট্রা মার্জিন ফিক্স */
      body {
        top: 0 !important;
      }
      
      /* ভিজিটরকে যাতে গুগল ট্রান্সলেট অপশন না দেখায় */
      #google_translate_element {
        display: none !important;
      }
    `;
    document.head.appendChild(style);

    // ২. এলিমেন্ট রিমুভাল লজিক (ইন্টারভ্যাল দিয়ে চেক করবে)
    const removeElements = () => {
      // ড্রপডাউন বা টেক্সট যা গুগলের উইজেট থেকে আসে
      const gadgets = document.querySelectorAll(".goog-te-gadget");
      gadgets.forEach((g) => g.remove());

      // ব্যানার ফ্রেম রিমুভ করা
      const banner = document.querySelector(".goog-te-banner-frame");
      if (banner) banner.remove();

      // বডি থেকে 'skiptranslate' ক্লাস সরানো
      if (document.body.classList.contains("skiptranslate")) {
        document.body.classList.remove("skiptranslate");
      }
    };

    // নির্দিষ্ট সময় পরপর চেক করবে যদি গুগল স্ক্রিপ্ট আবার ইনজেক্ট করে
    const timer = setInterval(removeElements, 100);

    return () => {
      clearInterval(timer);
      style.remove(); // ক্লিনআপ
    };
  }, []);

  return null;
}

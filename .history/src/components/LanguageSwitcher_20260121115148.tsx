/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import { useEffect, useState } from "react";
import { Globe } from "lucide-react";

export const LanguageSwitcher = () => {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    const savedLang = localStorage.getItem("selectedLanguage") || "en";
    setLang(savedLang);
  }, []);

  const handleChange = (newLang: string) => {
    setLang(newLang);
    localStorage.setItem("selectedLanguage", newLang);

    // Google Translate এর কুকি সেট করা
    document.cookie = `googtrans=/en/${newLang}; path=/;`;

    // পেজ রিফ্রেশ দিলে ট্রান্সলেশন সাথে সাথে কাজ শুরু করবে
    window.location.reload();
  };

  return (
    <div className="flex items-center gap-2 bg-white/10 p-2 rounded-xl border border-white/10">
      <Globe
        size={16}
        className="text-brand-yellow"
      />
      <select
        value={lang}
        onChange={(e) => handleChange(e.target.value)}
        className="bg-transparent text-xs font-bold uppercase text-white outline-none cursor-pointer">
        <option
          value="en"
          className="text-black">
          English
        </option>
        <option
          value="pt"
          className="text-black">
          Portuguese
        </option>
        <option
          value="bn"
          className="text-black">
          Bangla
        </option>
      </select>
    </div>
  );
};

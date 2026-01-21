/* eslint-disable react-hooks/immutability */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks } from "@/constants";
import { cn } from "@/utils/cn";
import {
  Menu,
  X,
  Globe,
  ChevronDown,
  ArrowRight,
  LayoutDashboard,
  User,
  LogOut,
} from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lang, setLang] = useState("en");
  const pathname = usePathname();
  const { user, token, logout } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);

    if (typeof window !== "undefined") {
      const savedLang = localStorage.getItem("selectedLanguage") || "en";
      setLang(savedLang);
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLanguageChange = (newLang: string) => {
    if (typeof window === "undefined") return;

    const lowerLang = newLang.toLowerCase();
    setLang(lowerLang);
    localStorage.setItem("selectedLanguage", lowerLang);

    // ১. ডোমেইন লজিক (নেটলিফাই সাবডোমেইন সাপোর্ট করার জন্য)
    const hostname = window.location.hostname;
    const isLocal = hostname.includes("localhost");
    const domain = isLocal ? "" : `; domain=.${hostname.replace(/^www\./, "")}`;

    // ২. কুকি সেট করা (Secure; SameSite=None প্রোডাকশনের জন্য মাস্ট)
    const cookieBase = `googtrans=/en/${lowerLang}; path=/`;
    const securityFlags = isLocal ? "" : "; Secure; SameSite=None";

    // একাধিক ফরমেটে কুকি রাইট করা যাতে ব্রাউজার মিস না করে
    document.cookie = `${cookieBase}${domain}${securityFlags}`;
    document.cookie = `${cookieBase}${securityFlags}`;

    // ৩. গুগল কম্বো বক্স আপডেট
    const select = document.querySelector(
      ".goog-te-combo",
    ) as HTMLSelectElement;
    if (select) {
      select.value = lowerLang;
      select.dispatchEvent(new Event("change"));
    }

    // ৪. হার্ড রিফ্রেশ (৩০০ms ডিলে দেওয়া হলো যাতে কুকি রাইট হওয়ার সময় পায়)
    setTimeout(() => {
      window.location.reload();
    }, 300);
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-white/80 backdrop-blur-xl py-3 shadow-lg border-b border-gray-200/50"
          : "bg-transparent py-6 border-transparent",
      )}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* লোগো সেকশন */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3">
          <Link
            href="/"
            className="relative group">
            <div className="relative w-12 h-12 md:w-14 md:h-14 transition-transform group-hover:scale-110 duration-300">
              <Image
                src="/logo.png"
                alt="Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>
          <div className="flex flex-col">
            <span className="text-xl font-black text-brand-blue tracking-tighter leading-none uppercase">
              Equações
            </span>
            <span className="text-[10px] font-bold text-brand-yellow tracking-[0.3em] uppercase leading-none mt-1">
              Razoáveis
            </span>
          </div>
        </motion.div>

        {/* ডেস্কটপ মেনু */}
        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative text-[15px] font-semibold text-gray-700 hover:text-brand-blue transition-colors group">
              {link.name}
              <span
                className={cn(
                  "absolute -bottom-1 left-0 h-0.5 bg-brand-yellow transition-all duration-300",
                  pathname === link.href ? "w-full" : "w-0 group-hover:w-full",
                )}
              />
            </Link>
          ))}
        </div>

        {/* টুলস (ল্যাঙ্গুয়েজ ও অ্যাকাউন্ট) */}
        <div className="hidden lg:flex items-center gap-6">
          {/* ল্যাঙ্গুয়েজ সুইচাশার */}
          <div className="relative group cursor-pointer flex items-center gap-2 text-sm font-bold text-gray-700 hover:text-brand-blue">
            <Globe
              size={18}
              className="text-brand-yellow"
            />
            <span className="uppercase">{lang}</span>
            <ChevronDown size={14} />
            <div className="absolute top-full right-0 mt-2 w-32 bg-white shadow-xl rounded-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 overflow-hidden p-1 z-100">
              {[
                { code: "en", name: "English" },
                { code: "pt", name: "Português" },
                { code: "fr", name: "Français" },
                { code: "es", name: "Español" },
              ].map((l) => (
                <button
                  key={l.code}
                  onClick={() => handleLanguageChange(l.code)}
                  className={cn(
                    "w-full px-4 py-2.5 text-left rounded-lg transition-all text-[11px] font-black uppercase tracking-widest",
                    lang === l.code
                      ? "bg-brand-light text-brand-blue"
                      : "hover:bg-gray-50 text-gray-400",
                  )}>
                  {l.name}
                </button>
              ))}
            </div>
          </div>

          {/* ড্যাশবোর্ড / অ্যাপ্লাই বাটন */}
          {token ? (
            <div className="relative group">
              <Link
                href="/dashboard"
                className="bg-brand-blue text-white px-6 py-3 rounded-full text-sm font-black flex items-center gap-2 hover:bg-brand-yellow hover:text-brand-blue transition-all">
                <LayoutDashboard size={18} /> Dashboard
              </Link>
              <div className="absolute top-full right-0 mt-2 w-48 bg-white shadow-2xl rounded-2xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 p-2 z-[100]">
                <p className="px-4 py-2 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50 mb-1">
                  Account
                </p>
                <Link
                  href="/dashboard"
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-xl text-sm font-bold text-brand-blue">
                  <User size={16} /> My Profile
                </Link>
                <button
                  onClick={logout}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 rounded-xl text-sm font-bold text-red-500 transition-colors">
                  <LogOut size={16} /> Logout
                </button>
              </div>
            </div>
          ) : (
            <Link
              href="/jobs"
              className="group relative bg-brand-blue text-white px-7 py-3 rounded-full text-sm font-bold flex items-center gap-2 overflow-hidden shadow-lg shadow-brand-blue/20">
              <span className="relative z-10 flex items-center gap-2">
                Apply Now{" "}
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </span>
              <div className="absolute inset-0 bg-brand-yellow translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </Link>
          )}
        </div>

        {/* মোবাইল মেনু টগল */}
        <button
          className="lg:hidden p-2 text-brand-blue"
          onClick={() => setIsOpen(true)}>
          <Menu size={30} />
        </button>
      </div>

      {/* মোবাইল মেনু ড্রয়ার */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-60"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[80%] max-w-sm bg-white z-70 shadow-2xl p-8 flex flex-col">
              <div className="flex justify-between items-center mb-12">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={50}
                  height={50}
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 bg-gray-100 rounded-full text-brand-red">
                  <X size={24} />
                </button>
              </div>

              <div className="flex flex-col gap-6 mb-10">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-2xl font-black text-brand-blue hover:text-brand-yellow transition-colors">
                    {link.name}
                  </Link>
                ))}
              </div>

              {/* মোবাইল ল্যাঙ্গুয়েজ */}
              <div className="mb-10 p-4 bg-gray-50 rounded-3xl">
                <p className="text-[10px] font-black uppercase text-gray-400 mb-4 tracking-widest">
                  Select Language
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {["en", "pt", "fr", "es"].map((l) => (
                    <button
                      key={l}
                      onClick={() => handleLanguageChange(l)}
                      className={cn(
                        "py-2 px-4 rounded-xl text-xs font-bold uppercase",
                        lang === l
                          ? "bg-brand-blue text-white"
                          : "bg-white text-gray-400",
                      )}>
                      {l}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-auto pt-10 border-t">
                {token ? (
                  <button
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                    className="w-full bg-red-500 text-white py-4 rounded-2xl font-bold uppercase tracking-widest text-sm shadow-lg shadow-red-500/20">
                    Logout Account
                  </button>
                ) : (
                  <Link
                    href="/jobs"
                    onClick={() => setIsOpen(false)}
                    className="w-full bg-brand-blue text-white py-4 rounded-2xl text-center font-bold uppercase tracking-widest text-sm shadow-lg shadow-brand-blue/20">
                    Find Your Job
                  </Link>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

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

    // ১. ডোমেইন লজিক: নেটলিফাই বা কাস্টম ডোমেইনের জন্য ডট (.) সহ ডোমেইন নেওয়া
    const hostname = window.location.hostname;
    const cookieDomain =
      hostname === "localhost"
        ? ""
        : `; domain=.${hostname.replace(/^www\./, "")}`;

    // ২. কুকি সেট করা (একাধিক ফরমেটে দিচ্ছি যাতে নেটলিফাই মিস না করে)
    document.cookie = `googtrans=/en/${lowerLang}; path=/;${cookieDomain}`;
    document.cookie = `googtrans=/en/${lowerLang}; path=/;`; // Fallback for all paths

    // ৩. গুগল কম্বো বক্স আপডেট করা
    const select = document.querySelector(
      ".goog-te-combo",
    ) as HTMLSelectElement;
    if (select) {
      select.value = lowerLang;
      select.dispatchEvent(new Event("change"));
    }

    // ৪. হার্ড রিফ্রেশ (নেটলিফাইতে কুকি প্রসেস হওয়ার জন্য ৩০০ms ডিলে দেওয়া ভালো)
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
        {/* লোগো */}
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

        {/* ডেস্কটপ লিঙ্কস */}
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

        {/* টুলস */}
        <div className="hidden lg:flex items-center gap-6">
          <div className="relative group cursor-pointer flex items-center gap-2 text-sm font-bold text-gray-700 hover:text-brand-blue">
            <Globe
              size={18}
              className="text-brand-yellow"
            />
            <span className="uppercase">{lang}</span>
            <ChevronDown size={14} />
            <div className="absolute top-full right-0 mt-2 w-32 bg-white shadow-xl rounded-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 overflow-hidden p-1 z-[100]">
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

          {token ? (
            <div className="relative group">
              <Link
                href="/dashboard"
                className="bg-brand-blue text-white px-6 py-3 rounded-full text-sm font-black flex items-center gap-2 hover:bg-brand-yellow hover:text-brand-blue transition-all">
                <LayoutDashboard size={18} /> Dashboard
              </Link>
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

        <button
          className="lg:hidden p-2 text-brand-blue"
          onClick={() => setIsOpen(true)}>
          <Menu size={30} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

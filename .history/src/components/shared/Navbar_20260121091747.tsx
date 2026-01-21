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
import { useAuthStore } from "@/store/useAuthStore"; // ইমপোর্ট করলাম

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lang, setLang] = useState("EN");
  const pathname = usePathname();

  // Zustand স্টোর থেকে ইউজার এবং লগআউট ফাংশন নিচ্ছি
  const { user, token, logout } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-white/80 backdrop-blur-xl py-3 shadow-lg border-b border-gray-200/50"
          : "bg-transparent py-6 border-transparent",
      )}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* ১. লোগো */}
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
            <span className="text-xl font-black text-brand-blue tracking-tighter leading-none">
              EQUAÇÕES
            </span>
            <span className="text-[10px] font-bold text-brand-yellow tracking-[0.3em] uppercase leading-none mt-1">
              RAZOÁVEIS
            </span>
          </div>
        </motion.div>

        {/* ২. ডেস্কটপ মেনু */}
        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-[15px] font-semibold text-gray-700 hover:text-brand-blue transition-colors group">
                {link.name}
                <span
                  className={cn(
                    "absolute -bottom-1 left-0 h-0.5 bg-brand-yellow transition-all duration-300",
                    isActive ? "w-full" : "w-0 group-hover:w-full",
                  )}
                />
              </Link>
            );
          })}
        </div>

        {/* ৩. রাইট সাইড: ল্যাঙ্গুয়েজ + কন্ডিশনাল অ্যাকশন বাটন */}
        <div className="hidden lg:flex items-center gap-6">
          <div className="relative group cursor-pointer flex items-center gap-2 text-sm font-bold text-gray-700 hover:text-brand-blue">
            <Globe
              size={18}
              className="text-brand-yellow"
            />
            <span>{lang}</span>
            <ChevronDown size={14} />
            <div className="absolute top-full right-0 mt-2 w-24 bg-white shadow-xl rounded-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 overflow-hidden">
              {["EN", "PT", "ES"].map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className="w-full px-4 py-2 text-left hover:bg-brand-light hover:text-brand-blue text-xs font-bold">
                  {l}
                </button>
              ))}
            </div>
          </div>

          {/* --- কন্ডিশনাল রেন্ডারিং: লগইন থাকলে ড্যাশবোর্ড দেখাবে --- */}
          {token ? (
            <div className="relative group">
              <Link
                href="/dashboard"
                className="bg-brand-blue text-white px-6 py-3 rounded-full text-sm font-black flex items-center gap-2 hover:bg-brand-yellow hover:text-brand-blue transition-all shadow-lg shadow-brand-blue/20">
                <LayoutDashboard size={18} />
                Dashboard
              </Link>
              {/* প্রোফাইল ড্রপডাউন হোভারে */}
              <div className="absolute top-full right-0 mt-2 w-48 bg-white shadow-2xl rounded-2xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 p-2">
                <p className="px-4 py-2 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50 mb-1">
                  Account
                </p>
                <Link
                  href="/dashboard/profile"
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
              className="group relative bg-brand-blue text-white px-7 py-3 rounded-full text-sm font-bold flex items-center gap-2 overflow-hidden">
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

        {/* ৪. মোবাইল মেনু টগল */}
        <button
          className="lg:hidden p-2 text-brand-blue"
          onClick={() => setIsOpen(true)}>
          <Menu size={30} />
        </button>
      </div>

      {/* ৫. মোবাইল ড্রয়ার */}
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

              <div className="flex flex-col gap-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-2xl font-black text-brand-blue hover:text-brand-yellow transition-colors">
                    {link.name}
                  </Link>
                ))}
                {/* মোবাইলে ড্যাশবোর্ড লিঙ্ক */}
                {token && (
                  <Link
                    href="/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="text-2xl font-black text-brand-yellow uppercase italic tracking-tighter border-t pt-4">
                    Dashboard
                  </Link>
                )}
              </div>

              <div className="mt-auto pt-10 border-t flex flex-col gap-4">
                {token ? (
                  <button
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                    className="w-full bg-red-500 text-white py-4 rounded-2xl font-bold">
                    Logout
                  </button>
                ) : (
                  <Link
                    href="/jobs"
                    onClick={() => setIsOpen(false)}
                    className="w-full bg-brand-blue text-white py-4 rounded-2xl text-center font-bold">
                    Find a Job
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

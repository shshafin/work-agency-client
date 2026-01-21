"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { navLinks } from "@/constants";
import { cn } from "@/utils/cn";
import { Menu, X, ArrowRight } from "lucide-react"; // lucide-react ইনস্টল করে নিও

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // স্ক্রল করলে নেভবার ডিজাইন চেঞ্জ হবে
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        scrolled
          ? "bg-white/90 backdrop-blur-md py-3 shadow-sm border-gray-100"
          : "bg-transparent py-5 border-transparent",
      )}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* ১. লোগো সেকশন */}
          <Link
            href="/"
            className="flex items-center gap-2">
            <div className="relative w-12 h-12 md:w-14 md:h-14">
              <Image
                src="/logo.png"
                alt="Equações Razoáveis Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="hidden sm:block">
              <span className="text-lg font-bold text-brand-blue leading-tight block uppercase">
                Equações
              </span>
              <span className="text-xs font-semibold text-brand-yellow tracking-widest block uppercase">
                Razoáveis
              </span>
            </div>
          </Link>

          {/* ২. ডেস্কটপ মেনু */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-brand-yellow",
                  pathname === link.href
                    ? "text-brand-blue font-bold"
                    : "text-gray-600",
                )}>
                {link.name}
              </Link>
            ))}
          </div>

          {/* ৩. অ্যাকশন বাটন */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-semibold text-brand-blue hover:underline">
              Login
            </Link>
            <Link
              href="/jobs"
              className="bg-brand-blue text-white px-5 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2 hover:bg-opacity-90 transition-all shadow-md shadow-brand-blue/20">
              Find Jobs <ArrowRight size={16} />
            </Link>
          </div>

          {/* ৪. মোবাইল মেনু বাটন */}
          <button
            className="md:hidden text-brand-blue"
            onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* ৫. মোবাইল ড্রয়ার */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b shadow-xl animate-fade-in-up">
          <div className="flex flex-col p-6 gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "text-lg font-medium py-2 border-b border-gray-50",
                  pathname === link.href ? "text-brand-blue" : "text-gray-600",
                )}>
                {link.name}
              </Link>
            ))}
            <div className="mt-4 flex flex-col gap-3">
              <Link
                href="/login"
                className="text-center py-3 text-brand-blue font-bold border border-brand-blue rounded-lg">
                Login
              </Link>
              <Link
                href="/jobs"
                className="text-center py-3 bg-brand-blue text-white font-bold rounded-lg">
                Find Jobs
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  Facebook,
  Linkedin,
  Instagram,
  Send,
  ArrowRight,
} from "lucide-react";
import { navLinks, sectors } from "@/constants";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return toast.error("Please enter an email address");
    
    setLoading(true);
    try {
      const res = await NewsletterService.subscribe(email);
      if (res.success) {
        toast.success("Subscribed successfully!");
        setEmail("");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-brand-dark text-white pt-20 pb-10 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6">
            <Link
              href="/"
              className="flex items-center gap-3">
              <div className="bg-white p-2 rounded-xl">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={50}
                  height={50}
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tighter text-white">
                  EQUAÇÕES
                </span>
                <span className="text-[10px] font-bold text-brand-yellow tracking-[0.3em] uppercase">
                  RAZOÁVEIS
                </span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your trusted partner for international recruitment. We bridge the
              gap between talented workers and global opportunities in Europe.
            </p>
            <div className="flex gap-4">
              {[Facebook, Linkedin, Instagram].map((Icon, i) => (
                <Link
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center hover:bg-brand-yellow hover:border-brand-yellow transition-all duration-300 group">
                  <Icon
                    size={18}
                    className="text-gray-400 group-hover:text-brand-dark"
                  />
                </Link>
              ))}
            </div>
          </motion.div>

          {/* ২. কুইক লিংকস */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}>
            <h3 className="text-lg text-gray-200 font-bold mb-6 border-l-4 border-brand-yellow pl-3">
              Explore
            </h3>
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-brand-yellow hover:translate-x-2 transition-all duration-300 flex items-center gap-2 text-sm">
                    <ArrowRight size={14} /> {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ৩. সেক্টর বা ইন্ডাস্ট্রি */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}>
            <h3 className="text-lg font-bold mb-6 border-l-4 text-gray-200 border-brand-yellow pl-3">
              Main Sectors
            </h3>
            <ul className="space-y-4">
              {sectors.slice(0, 5).map((sector) => (
                <li key={sector}>
                  <Link
                    href={`/jobs?sector=${sector}`}
                    className="text-gray-400 hover:text-brand-yellow transition-all duration-300 text-sm block">
                    {sector} Recruitment
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ৪. নিউজলেটার এবং কন্টাক্ট */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-6">
            <h3 className="text-lg text-gray-200 font-bold border-l-4 border-brand-yellow pl-3">
              Newsletter
            </h3>
            <p className="text-sm text-gray-400">
              Subscribe to get latest job updates and news.
            </p>
            <form className="relative group">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full bg-gray-800/50 border border-gray-700 rounded-full py-4 px-6 text-sm focus:outline-none focus:border-brand-yellow transition-all"
              />
              <button className="absolute right-2 top-2 bottom-2 bg-brand-yellow text-brand-dark px-4 rounded-full hover:bg-white transition-all">
                <Send size={18} />
              </button>
            </form>
            <div className="pt-4 space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <Phone
                  size={16}
                  className="text-brand-yellow"
                />{" "}
                <span>+351 123 456 789</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <Mail
                  size={16}
                  className="text-brand-yellow"
                />{" "}
                <span>info@equacoesrazoaveis.com</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ৫. কপিরাইট এবং পার্টনার সেকশন */}
        <div className="border-t border-gray-800 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-500 text-xs text-center md:text-left">
            © {currentYear}{" "}
            <span className="text-brand-yellow font-bold">
              Equações Razoáveis LDA
            </span>
            . All rights reserved.
            <br className="md:hidden" /> Made with ❤️ for global recruitment.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy-policy"
              className="text-xs text-gray-500 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-xs text-gray-500 hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Search,
  Briefcase,
  Users,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* ১. ব্যাকগ্রাউন্ড ইমেজ ও ডার্ক ওভারলে */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-bg.jpg" // তোমার ইমেজ পাথ
          alt="Recruitment Background"
          fill
          className="object-cover"
          priority
        />
        {/* লোগো কালার থিমের সাথে মিলিয়ে ডার্ক নীল ওভারলে */}
        <div className="absolute inset-0 bg-brand-blue/80 backdrop-blur-[2px]" />
      </div>

      {/* ২. ডাইনামিক শেপস (প্রিমিয়াম ফিল দেওয়ার জন্য) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute -top-24 -right-24 w-96 h-96 border-[40px] border-brand-yellow/10 rounded-full"
        />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-brand-light to-transparent" />
      </div>

      <div className="container mx-auto px-6 relative z-10 pt-20">
        <div className="text-center max-w-5xl mx-auto">
          {/* ক্যাপিটাল হাইলাইট ব্যাজ (গ্লাস-মর্ফিজম ইফেক্ট) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full shadow-xl mb-8">
            <ShieldCheck
              size={16}
              className="text-brand-yellow"
            />
            <span className="text-[10px] md:text-xs font-bold text-white uppercase tracking-widest">
              Registered Capital:{" "}
              <span className="text-brand-yellow">€250,000.00</span>
            </span>
          </motion.div>

          {/* মেইন হেডলাইন (Bold & Animated) */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-[1.05] tracking-tighter">
            Bridge to <span className="text-brand-yellow">Global</span> <br />
            Success.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-gray-200 text-lg md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
            Equações Razoáveis is your licensed partner in Lisbon, empowering
            businesses with skilled talent and managing your HR needs with
            excellence.
          </motion.p>

          {/* স্মার্ট সার্চ বার (সাদা ও পরিষ্কার) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white p-2 md:p-4 rounded-3xl shadow-2xl flex flex-col md:flex-row items-center gap-3 max-w-4xl mx-auto">
            <div className="flex-[1.5] flex items-center gap-4 px-4 w-full border-b md:border-b-0 md:border-r border-gray-100">
              <Search
                className="text-brand-blue"
                size={24}
              />
              <input
                type="text"
                placeholder="What job are you looking for?"
                className="w-full bg-transparent py-4 outline-none text-base font-semibold text-brand-dark"
              />
            </div>
            <div className="flex-1 flex items-center gap-4 px-4 w-full">
              <Briefcase
                className="text-brand-blue"
                size={24}
              />
              <select className="w-full bg-transparent py-4 outline-none text-base font-semibold text-gray-600 cursor-pointer">
                <option>Select Sector</option>
                <option>Construction</option>
                <option>Agriculture</option>
                <option>Logistics</option>
              </select>
            </div>
            <button className="w-full md:w-auto bg-brand-yellow text-brand-blue hover:bg-brand-blue hover:text-white px-10 py-5 rounded-2xl font-black text-lg transition-all duration-300 flex items-center justify-center gap-2 group">
              Search{" "}
              <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </button>
          </motion.div>

          {/* ট্রাস্ট ইন্ডিকেটর (হোয়াইট ভার্সন) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-16 flex flex-wrap justify-center gap-10 md:gap-20 border-t border-white/10 pt-10">
            <div className="text-center">
              <h4 className="text-white text-3xl font-black italic">500+</h4>
              <p className="text-brand-yellow text-xs font-bold uppercase tracking-widest mt-1">
                Placements
              </p>
            </div>
            <div className="text-center">
              <h4 className="text-white text-3xl font-black italic">
                Licensed
              </h4>
              <p className="text-brand-yellow text-xs font-bold uppercase tracking-widest mt-1">
                By Govt.
              </p>
            </div>
            <div className="text-center">
              <h4 className="text-white text-3xl font-black italic underline">
                519138716
              </h4>
              <p className="text-brand-yellow text-xs font-bold uppercase tracking-widest mt-1">
                NIF Number
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

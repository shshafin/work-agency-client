"use client";

import React from "react";
import { motion } from "framer-motion";
import { Search, Briefcase, Users, ShieldCheck } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-brand-light">
      {/* ব্যাকগ্রাউন্ড এনিমেশন বা হালকা প্যাটার্ন */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-yellow/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-blue/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* ক্যাপিটাল হাইলাইট ব্যাজ */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-white border border-brand-yellow/30 px-4 py-2 rounded-full shadow-sm mb-8">
            <ShieldCheck
              size={16}
              className="text-brand-yellow"
            />
            <span className="text-[10px] md:text-xs font-bold text-brand-blue uppercase tracking-wider">
              Registered Capital:{" "}
              <span className="text-brand-red">€250,000.00</span>
            </span>
          </motion.div>

          {/* মেইন হেডলাইন */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black text-brand-blue mb-6 leading-[1.1]">
            Connecting <span className="text-brand-yellow">Skilled Talent</span>{" "}
            <br className="hidden md:block" />
            to European Success.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-gray-600 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
            Equações Razoáveis is a licensed temporary employment agency based
            in Lisbon, specializing in labor subcontracting and human resource
            management.
          </motion.p>

          {/* স্মার্ট সার্চ বার */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-white p-2 md:p-3 rounded-2xl md:rounded-full shadow-2xl shadow-brand-blue/10 border border-gray-100 flex flex-col md:flex-row items-center gap-2 max-w-3xl mx-auto">
            <div className="flex-1 flex items-center gap-3 px-4 w-full">
              <Search
                className="text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Job title or keywords..."
                className="w-full bg-transparent py-3 outline-none text-sm font-medium"
              />
            </div>
            <div className="hidden md:block w-[1px] h-8 bg-gray-200" />
            <div className="flex-1 flex items-center gap-3 px-4 w-full">
              <Briefcase
                className="text-gray-400"
                size={20}
              />
              <select className="w-full bg-transparent py-3 outline-none text-sm font-medium text-gray-500 cursor-pointer">
                <option>All Sectors</option>
                <option>Construction</option>
                <option>Agriculture</option>
                <option>Logistics</option>
              </select>
            </div>
            <button className="w-full md:w-auto bg-brand-blue text-white px-8 py-4 rounded-xl md:rounded-full font-bold hover:bg-brand-blue/90 transition-all flex items-center justify-center gap-2">
              Search Jobs
            </button>
          </motion.div>

          {/* ছোট ট্রাস্ট ইন্ডিকেটর */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-12 flex flex-wrap justify-center gap-8 md:gap-16 grayscale opacity-60">
            <div className="flex items-center gap-2">
              <Users size={20} />
              <span className="font-bold text-sm">500+ Placements</span>
            </div>
            <div className="flex items-center gap-2">
              <Briefcase size={20} />
              <span className="font-bold text-sm">Certified Agency</span>
            </div>
            <div className="flex items-center gap-2 uppercase tracking-tighter">
              <span className="font-bold text-sm italic underline decoration-brand-yellow">
                NIF: 519138716
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

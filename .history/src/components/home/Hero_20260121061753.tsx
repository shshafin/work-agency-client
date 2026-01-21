"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, Briefcase, ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden bg-[#F8FAFC]">
      {/* --- আধুনিক ব্যাকগ্রাউন্ড এলিমেন্টস --- */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-yellow/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* ১. বাম পাশ: কন্টেন্ট সেকশন (Mobile Optimized) */}
          <div className="space-y-6 md:space-y-8 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-white border border-gray-200 px-4 py-1.5 rounded-full shadow-sm">
              <ShieldCheck
                size={14}
                className="text-brand-yellow"
              />
              <span className="text-[9px] md:text-xs font-bold text-brand-blue uppercase tracking-widest">
                Portugal Licensed • Capital:{" "}
                <span className="text-brand-red">€250,000</span>
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-brand-blue leading-[1.1] tracking-tight">
              The New <br />
              <span className="text-brand-yellow relative">
                Era of
                <svg
                  className="absolute -bottom-1 left-0 w-full h-2 md:h-3"
                  viewBox="0 0 338 12"
                  fill="none">
                  <path
                    d="M1 9.5C54.5 3.5 120.5 1 169 1C217.5 1 285.5 3.5 337 9.5"
                    stroke="#EAB308"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>{" "}
              <br />
              Recruitment.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-gray-500 text-base md:text-xl lg:text-2xl max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Bridging the gap between global skilled talent and top European
              industries. Registered in Sintra, Lisbon.
            </motion.p>
          </div>

          {/* ২. ডান পাশ: প্রিমিয়াম ইন্টারেক্টিভ কার্ডস */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-8 mt-10 lg:mt-0">
            {/* কার্ড ১: Job Seekers */}
            <motion.div
              whileHover={{ y: -8 }}
              className="group relative bg-white border border-gray-100 p-8 md:p-10 rounded-[2.5rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] transition-all overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform">
                <Briefcase size={80} />
              </div>
              <div className="bg-brand-yellow w-14 h-14 rounded-2xl flex items-center justify-center text-brand-blue mb-8 shadow-lg shadow-brand-yellow/20">
                <Briefcase size={28} />
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-brand-blue mb-4 leading-tight">
                I want <br /> to Work
              </h3>
              <Link
                href="/jobs"
                className="inline-flex items-center gap-2 font-bold text-brand-blue text-sm md:text-base group/btn">
                Browse Vacancies
                <div className="bg-brand-blue text-white p-1 rounded-full group-hover/btn:translate-x-1 transition-transform">
                  <ArrowRight size={14} />
                </div>
              </Link>
            </motion.div>

            {/* কার্ড ২: Employers */}
            <motion.div
              whileHover={{ y: -8 }}
              className="group relative bg-brand-blue p-8 md:p-10 rounded-[2.5rem] shadow-[0_30px_60px_-15px_rgba(10,38,71,0.3)] transition-all overflow-hidden text-white">
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform">
                <Users size={80} />
              </div>
              <div className="bg-white/10 backdrop-blur-md w-14 h-14 rounded-2xl flex items-center justify-center text-brand-yellow mb-8 border border-white/10">
                <Users size={28} />
              </div>
              <h3 className="text-2xl md:text-3xl font-black mb-4 leading-tight">
                I want <br /> to Hire
              </h3>
              <Link
                href="/worker-request"
                className="inline-flex items-center gap-2 font-bold text-brand-yellow text-sm md:text-base group/btn">
                Request Personnel
                <div className="bg-brand-yellow text-brand-blue p-1 rounded-full group-hover/btn:translate-x-1 transition-transform">
                  <ArrowRight size={14} />
                </div>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* ৩. স্ট্যাটস বার (Mobile Hidden or Simplified) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16 md:mt-24 py-8 md:py-12 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center md:text-left">
          <div className="space-y-1">
            <p className="text-3xl md:text-4xl font-black text-brand-blue">
              519138716
            </p>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              NIF Registration
            </p>
          </div>
          <div className="space-y-1 border-y md:border-y-0 md:border-x border-gray-100 py-6 md:py-0 px-4">
            <p className="text-3xl md:text-4xl font-black text-brand-blue">
              78201-R4
            </p>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              CAE Economic Code
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl md:text-4xl font-black text-brand-blue">
              €250,000
            </p>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Social Capital
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

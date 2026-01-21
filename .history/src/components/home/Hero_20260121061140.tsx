"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, Briefcase, ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative min-h-[95vh] flex items-center pt-24 pb-12 overflow-hidden bg-[#FDFDFD]">
      {/* --- ব্যাকগ্রাউন্ড গ্রেডিয়েন্ট ইফেক্টস --- */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* টপ লেফট ব্লব */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            x: [0, 50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[10%] -left-[5%] w-[40%] h-[50%] bg-brand-yellow/10 rounded-full blur-[100px]"
        />
        {/* বটম রাইট ব্লব */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -50, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-[10%] -right-[5%] w-[50%] h-[60%] bg-brand-blue/5 rounded-full blur-[120px]"
        />
        {/* সেন্টার সফট লাইট */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-b from-transparent via-brand-yellow/[0.02] to-transparent" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* ১. বাম পাশ: টেক্সট এবং হেডলাইন */}
          <div className="space-y-8 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-md border border-brand-yellow/30 px-5 py-2.5 rounded-full shadow-sm">
              <div className="bg-brand-yellow p-1 rounded-full text-brand-blue">
                <ShieldCheck size={14} />
              </div>
              <span className="text-[10px] md:text-xs font-bold text-brand-blue uppercase tracking-widest">
                Licensed in Portugal • Capital:{" "}
                <span className="text-brand-red font-black">€250,000</span>
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-6xl md:text-7xl lg:text-8xl font-black text-brand-blue leading-[0.95] tracking-tighter">
              Mastering <br />
              <span className="relative inline-block text-brand-yellow">
                The Art
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 338 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M1 9.5C54.5 3.5 120.5 1 169 1C217.5 1 285.5 3.5 337 9.5"
                    stroke="#EAB308"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>{" "}
              <br />
              Of Hiring.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-gray-500 text-lg md:text-2xl max-w-xl leading-relaxed font-medium">
              Registered in Rio de Mouro, Sintra. We specialize in workforce
              management, supplying premium personnel to top European
              industries.
            </motion.p>
          </div>

          {/* ২. ডান পাশ: প্রফেশনাল কার্ডস */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 relative">
            {/* ডেকোরেটিভ রিং */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border border-gray-100 rounded-full scale-125 pointer-events-none opacity-50" />

            {/* কার্ড ১: ফর জব সিকারস */}
            <motion.div
              whileHover={{ y: -12, scale: 1.02 }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="group relative bg-white/70 backdrop-blur-md p-10 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white flex flex-col items-start gap-8 overflow-hidden">
              <div className="p-5 bg-brand-yellow text-brand-blue rounded-3xl shadow-lg shadow-brand-yellow/20 transition-transform group-hover:rotate-12">
                <Briefcase
                  size={36}
                  strokeWidth={2.5}
                />
              </div>
              <div className="space-y-3">
                <h3 className="text-3xl font-black text-brand-blue">
                  Looking <br /> For a Job?
                </h3>
                <p className="text-gray-500 text-sm font-medium">
                  Find your next big break in Europe.
                </p>
              </div>
              <Link
                href="/jobs"
                className="mt-4 w-full py-4 bg-brand-blue text-white rounded-2xl flex items-center justify-center gap-2 font-bold hover:bg-brand-blue/90 transition-all shadow-lg shadow-brand-blue/10">
                Browse Jobs <ArrowRight size={18} />
              </Link>
            </motion.div>

            {/* কার্ড ২: ফর কোম্পানিজ */}
            <motion.div
              whileHover={{ y: -12, scale: 1.02 }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="group relative bg-brand-blue p-10 rounded-[3rem] shadow-[0_20px_50px_rgba(10,38,71,0.3)] flex flex-col items-start gap-8 overflow-hidden text-white">
              <div className="p-5 bg-white/10 backdrop-blur-md text-brand-yellow rounded-3xl border border-white/10 group-hover:bg-brand-yellow group-hover:text-brand-blue transition-all duration-500">
                <Users
                  size={36}
                  strokeWidth={2.5}
                />
              </div>
              <div className="space-y-3">
                <h3 className="text-3xl font-black">
                  Need To <br /> Hire Team?
                </h3>
                <p className="text-blue-100/60 text-sm font-medium">
                  Request skilled personnel today.
                </p>
              </div>
              <Link
                href="/worker-request"
                className="mt-4 w-full py-4 bg-brand-yellow text-brand-blue rounded-2xl flex items-center justify-center gap-2 font-black hover:bg-white transition-all shadow-lg shadow-brand-yellow/10">
                Get Workers <ArrowRight size={18} />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* ৩. স্ট্যাটস বার (ক্লিন ও মডার্ন) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-28 bg-white/40 backdrop-blur-md border border-gray-100 rounded-[2.5rem] p-8 md:p-12 flex flex-wrap justify-between items-center gap-10">
          <div className="flex flex-col gap-1">
            <span className="text-4xl font-black text-brand-blue tracking-tighter">
              NIF 519138716
            </span>
            <div className="flex items-center gap-2">
              <div className="w-8 h-[2px] bg-brand-yellow" />
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                Registered ID
              </span>
            </div>
          </div>
          <div className="hidden lg:block w-px h-16 bg-gray-200/50" />
          <div className="flex flex-col gap-1">
            <span className="text-4xl font-black text-brand-blue tracking-tighter">
              CAE 78201
            </span>
            <div className="flex items-center gap-2">
              <div className="w-8 h-[2px] bg-brand-yellow" />
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                Labour Activity
              </span>
            </div>
          </div>
          <div className="hidden lg:block w-px h-16 bg-gray-200/50" />
          <div className="flex flex-col gap-1 text-right lg:text-left">
            <span className="text-4xl font-black text-brand-blue tracking-tighter">
              Sintra, PT
            </span>
            <div className="flex items-center gap-2 justify-end lg:justify-start">
              <div className="w-8 h-[2px] bg-brand-yellow" />
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                Headquarter
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

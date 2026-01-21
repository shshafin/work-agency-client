"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, Briefcase, ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-brand-light pt-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* ১. বাম পাশ: টেক্সট এবং হেডলাইন */}
          <div className="space-y-8 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 bg-white border border-brand-yellow/30 px-4 py-2 rounded-full shadow-sm">
              <ShieldCheck
                size={16}
                className="text-brand-yellow"
              />
              <span className="text-[10px] md:text-xs font-bold text-brand-blue uppercase tracking-wider">
                Licensed in Portugal • Capital:{" "}
                <span className="text-brand-red">€250,000</span>
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-7xl font-black text-brand-blue leading-[1.1]">
              Simplifying <br />
              <span className="text-brand-yellow text-glow">
                Global Talent
              </span>{" "}
              <br />
              Placement.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-gray-600 text-lg md:text-xl max-w-xl leading-relaxed font-medium">
              Equações Razoáveis bridge the gap between skilled workers and
              European businesses. Registered in Rio de Mouro, Sintra.
            </motion.p>
          </div>

          {/* ২. ডান পাশ: ডাবল কার্ড অ্যাকশন (Work-Supply এর মতো) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* কার্ড ১: ফর জব সিকারস */}
            <motion.div
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="group relative bg-white p-8 rounded-[2rem] shadow-2xl shadow-brand-blue/5 border border-gray-100 flex flex-col items-start gap-6 overflow-hidden">
              <div className="p-4 bg-brand-yellow/10 rounded-2xl text-brand-yellow group-hover:bg-brand-yellow group-hover:text-white transition-colors duration-300">
                <Briefcase size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-black text-brand-blue mb-2">
                  Looking for a Job?
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Browse thousands of vacancies across Europe in Construction,
                  Logistics, and more.
                </p>
              </div>
              <Link
                href="/jobs"
                className="mt-4 flex items-center gap-2 font-bold text-brand-blue group-hover:gap-4 transition-all">
                Find Jobs <ArrowRight size={18} />
              </Link>
              {/* ডেকোরেশন */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-brand-yellow/5 rounded-full" />
            </motion.div>

            {/* কার্ড ২: ফর কোম্পানিজ */}
            <motion.div
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="group relative bg-brand-blue p-8 rounded-[2rem] shadow-2xl shadow-brand-blue/20 flex flex-col items-start gap-6 overflow-hidden text-white">
              <div className="p-4 bg-white/10 rounded-2xl text-white group-hover:bg-brand-yellow group-hover:text-brand-blue transition-colors duration-300">
                <Users size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-black mb-2">Hire Workers?</h3>
                <p className="text-blue-100/70 text-sm leading-relaxed">
                  Need skilled personnel? We supply personnel hired and paid by
                  us to your business.
                </p>
              </div>
              <Link
                href="/worker-request"
                className="mt-4 flex items-center gap-2 font-bold text-brand-yellow group-hover:gap-4 transition-all">
                Request Workers <ArrowRight size={18} />
              </Link>
              {/* ডেকোরেশন */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/5 rounded-full" />
            </motion.div>
          </div>
        </div>

        {/* ৩. নিচে ট্রাস্ট স্ট্যাটস (বর্ডারড) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-20 py-10 border-t border-gray-200 flex flex-wrap justify-between items-center gap-8">
          <div className="flex flex-col">
            <span className="text-3xl font-black text-brand-blue tracking-tighter">
              NIF 519138716
            </span>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Registration ID
            </span>
          </div>
          <div className="h-10 w-px bg-gray-200 hidden md:block" />
          <div className="flex flex-col">
            <span className="text-3xl font-black text-brand-blue tracking-tighter">
              CAE 78201
            </span>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Activity Code
            </span>
          </div>
          <div className="h-10 w-px bg-gray-200 hidden md:block" />
          <div className="flex flex-col">
            <span className="text-3xl font-black text-brand-blue tracking-tighter">
              Sintra, Lisbon
            </span>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Head Office
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  Briefcase,
  ArrowRight,
  Globe,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import { TypeAnimation } from "react-type-animation";

const Hero = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center pt-16 md:pt-20 pb-12 overflow-hidden bg-[#F8FAFC]">
      {/* --- ১. প্রিমিয়াম ব্যাকগ্রাউন্ড SVG & Effects --- */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <svg
          className="absolute top-0 left-0 w-full h-full opacity-[0.03]"
          viewBox="0 0 100 100"
          preserveAspectRatio="none">
          <path
            d="M0 100 C 20 0 50 0 100 100 Z"
            fill="url(#grad)"
          />
          <defs>
            <linearGradient
              id="grad"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%">
              <stop
                offset="0%"
                style={{ stopColor: "#0A2647", stopOpacity: 1 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "#EAB308", stopOpacity: 1 }}
              />
            </linearGradient>
          </defs>
        </svg>

        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute -top-[5%] -left-[5%] w-[400px] h-[400px] bg-brand-yellow/15 rounded-full blur-[100px]"
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* --- ২. লেফট সাইড: টাইপরাইটার এবং লিগ্যাল ইনফো --- */}
          <div className="space-y-6 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 bg-brand-blue/5 border border-brand-blue/10 px-4 py-1.5 rounded-full">
              <Globe
                size={14}
                className="text-brand-blue animate-spin-slow"
              />
              <span className="text-[10px] md:text-xs font-bold text-brand-blue uppercase tracking-widest">
                Portugal’s Premier Recruitment Agency
              </span>
            </motion.div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-brand-blue leading-[1] tracking-tighter">
              Mastering <br />
              The Art Of <br />
              <span className="text-brand-yellow">
                <TypeAnimation
                  sequence={[
                    "Hiring.",
                    2000,
                    "Staffing.",
                    2000,
                    "Placement.",
                    2000,
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                />
              </span>
            </h1>

            <p className="text-gray-500 text-base md:text-xl max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
              Bridging skilled global talent with top industries in Europe.
              Registered and licensed in Sintra, Lisbon.
            </p>

            {/* লিগ্যাল ইনফো ব্যাজ (ক্যাপিটাল সহ এখানে হাইলাইট করা) */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 mt-8">
              <div className="bg-white/70 backdrop-blur-sm border border-gray-100 px-4 py-3 rounded-xl flex items-center gap-3 shadow-sm">
                <div className="text-brand-yellow">
                  <CheckCircle2 size={18} />
                </div>
                <div className="text-left">
                  <p className="text-sm font-black text-brand-blue leading-none italic">
                    €250,000
                  </p>
                  <p className="text-[9px] font-bold text-gray-400 uppercase mt-1">
                    Social Capital
                  </p>
                </div>
              </div>
              <div className="bg-white/70 backdrop-blur-sm border border-gray-100 px-4 py-3 rounded-xl flex items-center gap-3 shadow-sm">
                <div className="text-brand-blue">
                  <CheckCircle2 size={18} />
                </div>
                <div className="text-left">
                  <p className="text-sm font-black text-brand-blue leading-none">
                    519138716
                  </p>
                  <p className="text-[9px] font-bold text-gray-400 uppercase mt-1">
                    NIF Portugal
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* --- ৩. রাইট সাইড: স্প্লিট অ্যাকশন কার্ডস --- */}
          <div className="grid grid-cols-1 gap-5">
            <motion.div
              whileHover={{ x: 10 }}
              className="group bg-white p-6 md:p-8 rounded-[2rem] shadow-xl border-l-4 border-brand-yellow flex items-center justify-between transition-all cursor-pointer">
              <div className="flex items-center gap-4 md:gap-6">
                <div className="bg-brand-yellow/10 w-12 h-12 md:w-16 md:h-16 rounded-xl flex items-center justify-center text-brand-yellow group-hover:bg-brand-yellow group-hover:text-white transition-all">
                  <Briefcase size={28} />
                </div>
                <div className="text-left">
                  <h3 className="text-xl md:text-2xl font-black text-brand-blue">
                    I want to Work
                  </h3>
                  <p className="text-gray-400 text-xs md:text-sm">
                    Discover elite vacancies in Europe
                  </p>
                </div>
              </div>
              <Link
                href="/jobs"
                className="bg-brand-blue text-white p-3 md:p-4 rounded-full transition-transform group-hover:rotate-45">
                <ArrowRight size={20} />
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ x: 10 }}
              className="group bg-brand-blue p-6 md:p-8 rounded-[2rem] shadow-2xl border-l-4 border-brand-yellow flex items-center justify-between transition-all cursor-pointer text-white">
              <div className="flex items-center gap-4 md:gap-6">
                <div className="bg-white/10 w-12 h-12 md:w-16 md:h-16 rounded-xl flex items-center justify-center text-brand-yellow">
                  <Users size={28} />
                </div>
                <div className="text-left">
                  <h3 className="text-xl md:text-2xl font-black italic underline decoration-brand-yellow">
                    I want to Hire
                  </h3>
                  <p className="text-blue-100/50 text-xs md:text-sm">
                    Request skilled global talent
                  </p>
                </div>
              </div>
              <Link
                href="/worker-request"
                className="bg-brand-yellow text-brand-blue p-3 md:p-4 rounded-full transition-transform group-hover:rotate-45">
                <ArrowRight size={20} />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

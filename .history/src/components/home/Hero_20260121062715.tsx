"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  Briefcase,
  ArrowRight,
  ShieldCheck,
  Globe,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import { TypeAnimation } from "react-type-animation"; 

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden bg-[#F8FAFC]">
      {/* --- ১. প্রিমিয়াম ব্যাকগ্রাউন্ড SVG & Effects --- */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* এনিমেটেড SVG ওয়েব প্যাটার্ন */}
        <svg
          className="absolute top-0 left-0 w-full h-full opacity-[0.05]"
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

        {/* ডাইনামিক ব্লবস */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute -top-[10%] -left-[5%] w-[500px] h-[500px] bg-brand-yellow/20 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{ x: [0, -50, 0], y: [0, 50, 0] }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-brand-blue/10 rounded-full blur-[130px]"
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* --- ২. লেফট সাইড: কন্টেন্ট ও টাইপরাইটার --- */}
          <div className="space-y-8 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md border border-brand-yellow/30 px-5 py-2 rounded-full shadow-sm">
              <Globe
                size={16}
                className="text-brand-blue animate-spin-slow"
              />
              <span className="text-[10px] md:text-xs font-black text-brand-blue uppercase tracking-widest">
                Portugal’s Leading Recruitment Agency
              </span>
            </motion.div>

            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-brand-blue leading-[0.9] tracking-tighter">
                Mastering <br />
                The Art Of <br />
                <span className="text-brand-yellow">
                  <TypeAnimation
                    sequence={[
                      "Hiring.",
                      2000,
                      "Staffing.",
                      2000,
                      "Success.",
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
            </div>

            <p className="text-gray-500 text-lg md:text-2xl max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
              We connect global skilled talent with top European industries.
              Licensed and registered in Sintra, Lisbon.
            </p>

            {/* হাইলাইটেড লিগ্যাল ডিটেইলস (Icons + Glassmorphism) */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-10">
              <div className="bg-white/60 backdrop-blur-md border border-white p-4 rounded-2xl flex items-center gap-3 shadow-sm group hover:border-brand-yellow transition-all">
                <div className="bg-brand-yellow/10 p-2 rounded-lg text-brand-yellow">
                  <CheckCircle2 size={20} />
                </div>
                <div className="text-left">
                  <p className="text-sm font-black text-brand-blue">
                    519138716
                  </p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase leading-none">
                    NIF Portugal
                  </p>
                </div>
              </div>
              <div className="bg-white/60 backdrop-blur-md border border-white p-4 rounded-2xl flex items-center gap-3 shadow-sm group hover:border-brand-yellow transition-all">
                <div className="bg-brand-blue/5 p-2 rounded-lg text-brand-blue">
                  <CheckCircle2 size={20} />
                </div>
                <div className="text-left">
                  <p className="text-sm font-black text-brand-blue">78201-R4</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase leading-none">
                    CAE Activity
                  </p>
                </div>
              </div>
              <div className="bg-white/60 backdrop-blur-md border border-white p-4 rounded-2xl flex items-center gap-3 shadow-sm group hover:border-brand-yellow transition-all">
                <div className="bg-brand-red/5 p-2 rounded-lg text-brand-red">
                  <CheckCircle2 size={20} />
                </div>
                <div className="text-left">
                  <p className="text-sm font-black text-brand-blue">
                    Sintra, Lisbon
                  </p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase leading-none">
                    Head Office
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* --- ৩. রাইট সাইড: এনিমেটেড ডিসিশন কার্ডস --- */}
          <div className="grid grid-cols-1 gap-6 relative">
            <motion.div
              whileHover={{ x: 15 }}
              className="group bg-white p-8 rounded-[2.5rem] shadow-xl border-l-8 border-brand-yellow flex items-center justify-between transition-all cursor-pointer overflow-hidden">
              <div className="flex items-center gap-6">
                <div className="bg-brand-yellow/10 w-16 h-16 rounded-2xl flex items-center justify-center text-brand-yellow group-hover:bg-brand-yellow group-hover:text-white transition-all">
                  <Briefcase size={32} />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-brand-blue">
                    I want to Work
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Discover elite vacancies in Europe
                  </p>
                </div>
              </div>
              <Link
                href="/jobs"
                className="bg-brand-blue text-white p-4 rounded-full">
                <ArrowRight size={24} />
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ x: 15 }}
              className="group bg-brand-blue p-8 rounded-[2.5rem] shadow-2xl border-l-8 border-brand-yellow flex items-center justify-between transition-all cursor-pointer text-white">
              <div className="flex items-center gap-6">
                <div className="bg-white/10 w-16 h-16 rounded-2xl flex items-center justify-center text-brand-yellow">
                  <Users size={32} />
                </div>
                <div>
                  <h3 className="text-2xl font-black italic underline decoration-brand-yellow">
                    I want to Hire
                  </h3>
                  <p className="text-blue-100/50 text-sm font-medium">
                    Request skilled global talent
                  </p>
                </div>
              </div>
              <Link
                href="/worker-request"
                className="bg-brand-yellow text-brand-blue p-4 rounded-full">
                <ArrowRight size={24} />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

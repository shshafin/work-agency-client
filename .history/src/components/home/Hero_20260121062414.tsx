"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, Briefcase, ArrowRight, ShieldCheck, Info } from "lucide-react";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden bg-[#F9FAFB]">
      {/* --- ১. এডভান্সড ব্যাকগ্রাউন্ড (Animated Particles & Blobs) --- */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ x: [0, 100, 0], y: [0, 50, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[5%] w-[500px] h-[500px] bg-brand-yellow/15 rounded-full blur-[110px]"
        />
        <motion.div
          animate={{ x: [0, -70, 0], y: [0, 80, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[5%] right-[-5%] w-[600px] h-[600px] bg-brand-blue/10 rounded-full blur-[130px]"
        />
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* --- ২. কন্টেন্ট এরিয়া --- */}
          <div className="space-y-10 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-3 bg-white/60 backdrop-blur-md border border-brand-yellow/30 px-5 py-2 rounded-full shadow-sm">
              <div className="relative">
                <ShieldCheck
                  size={16}
                  className="text-brand-yellow"
                />
                <span className="absolute inset-0 animate-ping bg-brand-yellow/40 rounded-full" />
              </div>
              <span className="text-[10px] md:text-xs font-black text-brand-blue uppercase tracking-widest">
                Official Agency • Capital:{" "}
                <span className="text-brand-red">€250,000</span>
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl lg:text-8xl font-black text-brand-blue leading-[0.9] tracking-tighter">
              Mastering <br />
              <span className="relative inline-block">
                The Art
                <motion.svg
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                  className="absolute -bottom-2 left-0 w-full h-3"
                  viewBox="0 0 338 12"
                  fill="none">
                  <path
                    d="M1 9.5C54.5 3.5 120.5 1 169 1C217.5 1 285.5 3.5 337 9.5"
                    stroke="#EAB308"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </motion.svg>
              </span>{" "}
              <br />
              Of Hiring.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-gray-500 text-lg md:text-2xl max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
              Equações Razoáveis specializes in supplying premium personnel to
              top European industries. Licensed and registered in Sintra,
              Portugal.
            </motion.p>
          </div>

          {/* --- ৩. ডাইনামিক ইন্টারঅ্যাকটিভ কার্ডস (With Tooltips) --- */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative">
            {/* জব সিকার কার্ড */}
            <div className="relative group">
              {/* Tooltip Guide */}
              <motion.div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-brand-blue text-white text-[10px] px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20 shadow-xl">
                Click to explore latest job openings!
              </motion.div>

              <Link href="/jobs">
                <motion.div
                  whileHover={{ y: -10 }}
                  className="relative bg-white/70 backdrop-blur-xl p-8 rounded-[2.5rem] border-2 border-transparent group-hover:border-brand-yellow/50 shadow-xl shadow-black/5 transition-all h-full flex flex-col justify-between overflow-hidden">
                  <div className="p-4 bg-brand-yellow/10 rounded-2xl text-brand-yellow w-fit mb-6">
                    <Briefcase
                      size={32}
                      strokeWidth={2.5}
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-brand-blue mb-2">
                      Find Your Job
                    </h3>
                    <p className="text-gray-500 text-xs font-medium leading-relaxed">
                      Browse vacancies in Construction, Logistics, and
                      Agriculture.
                    </p>
                  </div>
                  <div className="mt-8 flex items-center justify-between">
                    <span className="text-sm font-bold text-brand-blue underline decoration-brand-yellow/30">
                      Start Application
                    </span>
                    <div className="bg-brand-blue text-white p-2 rounded-full group-hover:translate-x-2 transition-transform shadow-lg shadow-brand-blue/20">
                      <ArrowRight size={18} />
                    </div>
                  </div>
                </motion.div>
              </Link>
            </div>

            {/* এমপ্লয়ার কার্ড */}
            <div className="relative group">
              {/* Tooltip Guide */}
              <motion.div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-brand-yellow text-brand-blue text-[10px] px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20 shadow-xl font-bold">
                Hire skilled personnel for your company!
              </motion.div>

              <Link href="/worker-request">
                <motion.div
                  whileHover={{ y: -10 }}
                  className="relative bg-brand-blue p-8 rounded-[2.5rem] border-2 border-transparent group-hover:border-brand-yellow/30 shadow-2xl shadow-brand-blue/30 text-white transition-all h-full flex flex-col justify-between overflow-hidden">
                  <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl text-brand-yellow w-fit mb-6 border border-white/5">
                    <Users
                      size={32}
                      strokeWidth={2.5}
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black mb-2">Hire Workers</h3>
                    <p className="text-blue-100/60 text-xs font-medium leading-relaxed">
                      Request personnel hired and paid by our professional
                      agency.
                    </p>
                  </div>
                  <div className="mt-8 flex items-center justify-between">
                    <span className="text-sm font-bold text-brand-yellow underline decoration-white/20">
                      Get Staff Now
                    </span>
                    <div className="bg-brand-yellow text-brand-blue p-2 rounded-full group-hover:scale-110 transition-transform shadow-lg shadow-brand-yellow/30">
                      <ArrowRight size={18} />
                    </div>
                  </div>
                </motion.div>
              </Link>
            </div>
          </div>
        </div>

        {/* --- ৪. রি-ডিজাইন্ড স্ট্যাটস বার --- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 p-1 md:p-12 border-t border-gray-100">
          <div className="flex flex-col items-center md:items-start group cursor-help">
            <span className="text-4xl font-black text-brand-blue tracking-tighter group-hover:text-brand-yellow transition-colors leading-none italic">
              519138716
            </span>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mt-2 flex items-center gap-2">
              <span className="w-6 h-[2px] bg-brand-yellow" /> NIF ID Portugal
            </p>
          </div>
          <div className="flex flex-col items-center md:items-start group cursor-help">
            <span className="text-4xl font-black text-brand-blue tracking-tighter group-hover:text-brand-yellow transition-colors leading-none italic">
              78201-R4
            </span>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mt-2 flex items-center gap-2">
              <span className="w-6 h-[2px] bg-brand-yellow" /> CAE Code Activity
            </p>
          </div>
          <div className="flex flex-col items-center md:items-start group cursor-help">
            <span className="text-4xl font-black text-brand-blue tracking-tighter group-hover:text-brand-yellow transition-colors leading-none italic">
              Sintra, Lisbon
            </span>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mt-2 flex items-center gap-2">
              <span className="w-6 h-[2px] bg-brand-yellow" /> Head Office
              Location
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

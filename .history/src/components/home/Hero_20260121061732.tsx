"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  Briefcase,
  ArrowUpRight,
  Landmark,
  Building2,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-10 overflow-hidden bg-[#F8FAFC]">
      {/* --- ১. অ্যানিমেটেড ব্যাকগ্রাউন্ড ব্লবস (কাঁচের ভেতর দিয়ে দেখা যাবে) --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div
          animate={{ x: [0, 100, 0], y: [0, 50, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-5%] left-[10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-brand-yellow/20 rounded-full blur-[80px] md:blur-[120px]"
        />
        <motion.div
          animate={{ x: [0, -80, 0], y: [0, 100, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[10%] right-[5%] w-[250px] md:w-[450px] h-[250px] md:h-[450px] bg-brand-blue/10 rounded-full blur-[80px] md:blur-[100px]"
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
          {/* --- ২. কন্টেন্ট সেকশন (Mobile Optimized) --- */}
          <div className="flex-1 text-center lg:text-left space-y-6 md:space-y-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="inline-flex items-center gap-2 bg-white/40 backdrop-blur-md border border-white/50 px-3 py-1 md:px-5 md:py-2 rounded-full shadow-sm">
              <ShieldCheck
                size={14}
                className="text-brand-yellow"
              />
              <span className="text-[8px] md:text-xs font-black text-brand-blue uppercase tracking-[0.1em] md:tracking-[0.2em]">
                Registered Capital:{" "}
                <span className="text-brand-red font-black">€250,000</span>
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-brand-blue leading-[1.1] md:leading-[0.95] tracking-tighter">
              Excellence <br /> In{" "}
              <span className="text-brand-yellow">Personnel</span> <br />{" "}
              Supply.
            </motion.h1>

            {/* লিগ্যাল ইনফো কার্ডস (মোবাইলে ছোট এবং সুন্দর) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mt-8 md:mt-12">
              {[
                {
                  label: "NIF ID",
                  val: "519138716",
                  icon: Building2,
                  col: "brand-yellow",
                },
                {
                  label: "CAE Code",
                  val: "78201-R4",
                  icon: ShieldCheck,
                  col: "brand-red",
                },
                {
                  label: "Capital",
                  val: "€250K",
                  icon: Landmark,
                  col: "brand-blue",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white/30 backdrop-blur-lg border border-white/50 p-3 md:p-5 rounded-2xl md:rounded-3xl flex items-center gap-3 shadow-sm hover:shadow-md transition-all">
                  <item.icon
                    size={20}
                    className={`text-${item.col} shrink-0`}
                  />
                  <div className="text-left">
                    <p className="text-xs md:text-lg font-black text-brand-blue leading-none">
                      {item.val}
                    </p>
                    <p className="text-[8px] md:text-[10px] font-bold text-gray-500 uppercase mt-1">
                      {item.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* --- ৩. রাইট সাইড: গ্লসি কার্ডস (Mobile Optimized) --- */}
          <div className="flex-1 w-full max-w-xl space-y-4 md:space-y-6">
            {/* Job Seeker Glass Card */}
            <motion.div
              whileHover={{ y: -5, scale: 1.02 }}
              className="group relative bg-white/40 backdrop-blur-xl border border-white/60 p-5 md:p-8 rounded-[2rem] md:rounded-[3rem] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] flex items-center justify-between transition-all">
              <div className="flex items-center gap-4 md:gap-6">
                <div className="bg-brand-yellow w-12 h-12 md:w-16 md:h-16 rounded-[1.2rem] md:rounded-[2rem] flex items-center justify-center text-brand-blue shadow-lg shadow-brand-yellow/20">
                  <Briefcase
                    size={24}
                    className="md:hidden"
                  />
                  <Briefcase
                    size={32}
                    className="hidden md:block"
                    strokeWidth={2.5}
                  />
                </div>
                <div className="text-left">
                  <h3 className="text-lg md:text-3xl font-black text-brand-blue">
                    Find a Job
                  </h3>
                  <p className="text-gray-500 text-[10px] md:text-sm font-medium">
                    Browse elite European roles
                  </p>
                </div>
              </div>
              <Link
                href="/jobs"
                className="bg-brand-blue text-white p-2 md:p-4 rounded-full group-hover:bg-brand-yellow group-hover:text-brand-blue transition-all">
                <ArrowUpRight
                  size={18}
                  className="md:hidden"
                />
                <ArrowUpRight
                  size={24}
                  className="hidden md:block"
                />
              </Link>
            </motion.div>

            {/* Hire Glass Card */}
            <motion.div
              whileHover={{ y: -5, scale: 1.02 }}
              className="group relative bg-brand-blue/90 backdrop-blur-xl border border-brand-blue/20 p-5 md:p-8 rounded-[2rem] md:rounded-[3rem] shadow-[0_25px_50px_-12px_rgba(10,38,71,0.3)] flex items-center justify-between transition-all text-white">
              <div className="flex items-center gap-4 md:gap-6">
                <div className="bg-white/10 backdrop-blur-md w-12 h-12 md:w-16 md:h-16 rounded-[1.2rem] md:rounded-[2rem] flex items-center justify-center text-brand-yellow border border-white/10">
                  <Users
                    size={24}
                    className="md:hidden"
                  />
                  <Users
                    size={32}
                    className="hidden md:block"
                    strokeWidth={2.5}
                  />
                </div>
                <div className="text-left">
                  <h3 className="text-lg md:text-3xl font-black">Hire Staff</h3>
                  <p className="text-white/50 text-[10px] md:text-sm font-medium">
                    Request skilled personnel
                  </p>
                </div>
              </div>
              <Link
                href="/worker-request"
                className="bg-brand-yellow text-brand-blue p-2 md:p-4 rounded-full group-hover:bg-white transition-all">
                <ArrowUpRight
                  size={18}
                  className="md:hidden"
                />
                <ArrowUpRight
                  size={24}
                  className="hidden md:block"
                />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  Briefcase,
  ArrowRight,
  Globe,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { TypeAnimation } from "react-type-animation";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 pb-16 overflow-hidden bg-[#F8FAFC]">
      {/* --- ১. এডভান্সড ব্যাকগ্রাউন্ড (SVG Waves + Animated Blobs) --- */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* এনিমেটেড মেইন গ্রেডিয়েন্ট ব্লব */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 45, 0],
            x: [0, 30, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[10%] -left-[5%] w-[500px] h-[500px] bg-brand-yellow/20 rounded-full blur-[100px]"
        />

        {/* ডটেড গ্রিড ওভারলে */}
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1.5px,transparent_1.5px)] [background-size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40" />

        {/* সাইড ডেকোরেশন SVG */}
        <svg
          className="absolute right-0 top-0 h-full w-1/3 text-brand-blue/[0.02] transform translate-x-1/2"
          fill="currentColor"
          viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="40"
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* --- ২. লেফট সাইড: কন্টেন্ট ও টাইপরাইটার (উন্নত এনিমেশন) --- */}
          <div className="space-y-8 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-full shadow-sm group cursor-default">
              <Sparkles
                size={14}
                className="text-brand-yellow group-hover:animate-pulse"
              />
              <span className="text-[10px] md:text-xs font-bold text-brand-blue uppercase tracking-[0.2em]">
                Elite Staffing Solutions Portugal
              </span>
            </motion.div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black text-brand-blue leading-[0.95] tracking-tighter">
              Mastering <br />
              <span className="text-gray-400 opacity-80">The Art Of</span>{" "}
              <br />
              <span className="relative inline-block text-brand-yellow italic">
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
                {/* টেক্সট আন্ডারলাইন হাইলাইটার */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="absolute -bottom-2 left-0 h-2 bg-brand-blue/5 rounded-full -z-10"
                />
              </span>
            </h1>

            <p className="text-gray-500 text-lg md:text-2xl max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
              We empower European businesses with top-tier talent. Registered in{" "}
              <span className="text-brand-blue font-bold">Lisbon</span>,
              operating globally.
            </p>

            {/* লিগ্যাল ডিটেইলস কার্ডস - গ্রুপিং আরও প্রিমিয়াম করা হয়েছে */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              {[
                {
                  val: "€250,000",
                  label: "Capital",
                  color: "text-brand-yellow",
                },
                { val: "519138716", label: "NIF ID", color: "text-brand-blue" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -5 }}
                  className="bg-white/60 backdrop-blur-md border border-white p-4 rounded-2xl flex items-center gap-3 shadow-sm">
                  <div className={item.color}>
                    <CheckCircle2 size={20} />
                  </div>
                  <div className="text-left">
                    <p className="text-base font-black text-brand-blue leading-none">
                      {item.val}
                    </p>
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                      {item.label}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* --- ৩. রাইট সাইড: নেক্সট-লেভেল ইন্টারঅ্যাকটিভ কার্ডস --- */}
          <div className="flex flex-col gap-6">
            {/* Job Seeker Card */}
            <motion.div
              whileHover={{ scale: 1.02, x: 10 }}
              className="relative group bg-white border border-gray-100 p-8 rounded-[2.5rem] shadow-2xl shadow-gray-200/50 flex items-center justify-between transition-all overflow-hidden">
              {/* ব্যাকগ্রাউন্ড প্যাটার্ন */}
              <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:scale-125 transition-transform">
                <Briefcase size={120} />
              </div>

              <div className="flex items-center gap-6 relative z-10">
                <div className="bg-brand-yellow w-16 h-16 rounded-2xl flex items-center justify-center text-brand-blue shadow-lg shadow-brand-yellow/20">
                  <Briefcase
                    size={32}
                    strokeWidth={2.5}
                  />
                </div>
                <div className="text-left">
                  <h3 className="text-2xl md:text-3xl font-black text-brand-blue group-hover:text-brand-yellow transition-colors">
                    I want to Work
                  </h3>
                  <p className="text-gray-400 text-sm font-semibold">
                    Explore premium jobs in Europe
                  </p>
                </div>
              </div>
              <Link
                href="/jobs"
                className="bg-brand-blue text-white p-4 rounded-full shadow-lg shadow-brand-blue/20 hover:scale-110 transition-transform relative z-10">
                <ArrowRight size={24} />
              </Link>
            </motion.div>

            {/* Employer Card */}
            <motion.div
              whileHover={{ scale: 1.02, x: 10 }}
              className="relative group bg-brand-blue p-8 rounded-[2.5rem] shadow-[0_30px_60px_-15px_rgba(10,38,71,0.3)] flex items-center justify-between transition-all overflow-hidden text-white">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-125 transition-transform">
                <Users size={120} />
              </div>

              <div className="flex items-center gap-6 relative z-10">
                <div className="bg-white/10 backdrop-blur-md w-16 h-16 rounded-2xl flex items-center justify-center text-brand-yellow border border-white/20 shadow-xl">
                  <Users
                    size={32}
                    strokeWidth={2.5}
                  />
                </div>
                <div className="text-left">
                  <h3 className="text-2xl md:text-3xl font-black italic">
                    I want to Hire
                  </h3>
                  <p className="text-blue-100/60 text-sm font-semibold tracking-wide">
                    Request skilled global personnel
                  </p>
                </div>
              </div>
              <Link
                href="/worker-request"
                className="bg-brand-yellow text-brand-blue p-4 rounded-full shadow-lg shadow-brand-yellow/20 hover:scale-110 transition-transform relative z-10">
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

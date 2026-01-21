"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  Briefcase,
  ArrowUpRight,
  ShieldCheck,
  Globe,
  Building2,
  Landmark,
} from "lucide-react";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden bg-[#F8FAFC]">
      {/* --- আধুনিক ব্যাকগ্রাউন্ড এলিমেন্টস --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[50%] h-[50%] bg-brand-yellow/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[5%] right-[-5%] w-[40%] h-[40%] bg-brand-blue/5 rounded-full blur-[100px]" />
        {/* গ্রিড প্যাটার্ন ওভারলে */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* ১. বাম পাশ: হেডলাইন এবং ডিটেইলস */}
          <div className="flex-1 text-center lg:text-left space-y-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-brand-blue text-white px-5 py-2 rounded-full shadow-lg shadow-brand-blue/20">
              <Globe
                size={14}
                className="text-brand-yellow animate-spin-slow"
              />
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em]">
                Global Recruitment Excellence
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl lg:text-8xl font-black text-brand-blue leading-[0.9] tracking-tighter">
              The Power <br /> Of{" "}
              <span className="text-brand-yellow">Skilled</span> <br />{" "}
              Workforce.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-gray-500 text-lg md:text-2xl max-w-2xl leading-relaxed">
              Equações Razoáveis is a premier licensed agency in Portugal,
              empowering European businesses with top-tier personnel and HR
              management.
            </motion.p>

            {/* লিকলি ইনফো হাইলাইটস - মডার্ন কার্ড স্টাইল */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4">
                <div className="bg-brand-blue/5 p-3 rounded-2xl text-brand-blue">
                  <Landmark size={24} />
                </div>
                <div>
                  <p className="text-xl font-black text-brand-blue tracking-tighter">
                    €250,000
                  </p>
                  <p className="text-[9px] font-bold text-gray-400 uppercase">
                    Social Capital
                  </p>
                </div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4">
                <div className="bg-brand-yellow/10 p-3 rounded-2xl text-brand-yellow">
                  <Building2 size={24} />
                </div>
                <div>
                  <p className="text-xl font-black text-brand-blue tracking-tighter">
                    519138716
                  </p>
                  <p className="text-[9px] font-bold text-gray-400 uppercase">
                    NIF Registration
                  </p>
                </div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4">
                <div className="bg-brand-red/5 p-3 rounded-2xl text-brand-red">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <p className="text-xl font-black text-brand-blue tracking-tighter">
                    78201-R4
                  </p>
                  <p className="text-[9px] font-bold text-gray-400 uppercase">
                    CAE Economic
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* ২. ডান পাশ: প্রিমিয়াম কার্ডস (Decision Cards) */}
          <div className="flex-1 w-full max-w-xl space-y-6">
            {/* জব সিকার কার্ড */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ x: 15 }}
              className="group bg-white p-8 rounded-[3rem] shadow-2xl shadow-brand-blue/5 border border-gray-50 flex items-center justify-between transition-all">
              <div className="flex items-center gap-6">
                <div className="bg-brand-yellow w-16 h-16 rounded-[2rem] flex items-center justify-center text-brand-blue shadow-lg shadow-brand-yellow/20 group-hover:rotate-12 transition-transform">
                  <Briefcase
                    size={32}
                    strokeWidth={2.5}
                  />
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-black text-brand-blue">
                    I am a Job Seeker
                  </h3>
                  <p className="text-gray-400 text-sm font-medium">
                    Find elite jobs in Europe
                  </p>
                </div>
              </div>
              <Link
                href="/jobs"
                className="bg-brand-light p-4 rounded-full text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-all">
                <ArrowUpRight size={24} />
              </Link>
            </motion.div>

            {/* এমপ্লয়ার কার্ড */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{ x: 15 }}
              className="group bg-brand-blue p-8 rounded-[3rem] shadow-2xl shadow-brand-blue/30 flex items-center justify-between transition-all text-white">
              <div className="flex items-center gap-6">
                <div className="bg-white/10 backdrop-blur-md w-16 h-16 rounded-[2rem] flex items-center justify-center text-brand-yellow border border-white/10 group-hover:-rotate-12 transition-transform">
                  <Users
                    size={32}
                    strokeWidth={2.5}
                  />
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-black">
                    I am an Employer
                  </h3>
                  <p className="text-blue-100/50 text-sm font-medium">
                    Hire premium global talent
                  </p>
                </div>
              </div>
              <Link
                href="/worker-request"
                className="bg-white/10 p-4 rounded-full text-brand-yellow group-hover:bg-brand-yellow group-hover:text-brand-blue transition-all">
                <ArrowUpRight size={24} />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

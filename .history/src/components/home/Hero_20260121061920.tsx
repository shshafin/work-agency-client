"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, Briefcase, ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-28 pb-16 bg-[#F8FAFC] overflow-hidden">
      {/* ===== Premium Background Glow ===== */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-120px] left-1/4 w-[420px] h-[420px] bg-brand-yellow/20 blur-[160px] rounded-full" />
        <div className="absolute bottom-[-160px] right-[-80px] w-[520px] h-[520px] bg-brand-blue/10 blur-[200px] rounded-full" />
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          {/* ===== LEFT CONTENT ===== */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            transition={{ duration: 0.7 }}
            className="text-center lg:text-left space-y-8">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-full shadow-sm">
              <ShieldCheck
                size={14}
                className="text-brand-yellow"
              />
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-brand-blue">
                Portugal Licensed · Capital{" "}
                <span className="text-brand-red">€250,000</span>
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-black text-brand-blue leading-[1.05] tracking-tight text-4xl sm:text-6xl md:text-7xl lg:text-8xl">
              The New
              <br />
              <span className="relative text-brand-yellow inline-block">
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
              </span>
              <br />
              Recruitment.
            </h1>

            {/* Subtitle */}
            <p className="text-gray-500 max-w-2xl mx-auto lg:mx-0 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed">
              Bridging global skilled talent with top European industries.
              Registered in Sintra, Lisbon — built for scale.
            </p>
          </motion.div>

          {/* ===== RIGHT CARDS ===== */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            transition={{ delay: 0.15, duration: 0.7 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
            {/* Job Seeker Card */}
            <motion.div
              whileHover={{ y: -10 }}
              className="relative bg-white border border-gray-100 p-9 rounded-[2.75rem] shadow-[0_35px_70px_-15px_rgba(0,0,0,0.06)] transition-all overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-5">
                <Briefcase size={90} />
              </div>

              <div className="w-14 h-14 rounded-2xl bg-brand-yellow text-brand-blue flex items-center justify-center mb-7 shadow-lg shadow-brand-yellow/30">
                <Briefcase size={28} />
              </div>

              <h3 className="font-black text-2xl md:text-3xl text-brand-blue mb-4">
                I want <br /> to Work
              </h3>

              <Link
                href="/jobs"
                className="inline-flex items-center gap-2 font-bold text-brand-blue group">
                Browse Vacancies
                <span className="bg-brand-blue text-white p-1 rounded-full group-hover:translate-x-1 transition">
                  <ArrowRight size={14} />
                </span>
              </Link>
            </motion.div>

            {/* Employer Card */}
            <motion.div
              whileHover={{ y: -10 }}
              className="relative bg-brand-blue p-9 rounded-[2.75rem] shadow-[0_35px_70px_-15px_rgba(10,38,71,0.35)] overflow-hidden text-white">
              <div className="absolute top-0 right-0 p-6 opacity-10">
                <Users size={90} />
              </div>

              <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur border border-white/10 text-brand-yellow flex items-center justify-center mb-7">
                <Users size={28} />
              </div>

              <h3 className="font-black text-2xl md:text-3xl mb-4">
                I want <br /> to Hire
              </h3>

              <Link
                href="/worker-request"
                className="inline-flex items-center gap-2 font-bold text-brand-yellow group">
                Request Personnel
                <span className="bg-brand-yellow text-brand-blue p-1 rounded-full group-hover:translate-x-1 transition">
                  <ArrowRight size={14} />
                </span>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* ===== STATS BAR ===== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="mt-20 md:mt-28 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-3 gap-8 pt-10 text-center md:text-left">
          <Stat
            value="519138716"
            label="NIF Registration"
          />
          <Stat
            value="78201-R4"
            label="CAE Economic Code"
            bordered
          />
          <Stat
            value="€250,000"
            label="Social Capital"
          />
        </motion.div>
      </div>
    </section>
  );
}

/* ===== Reusable Stat ===== */
function Stat({
  value,
  label,
  bordered,
}: {
  value: string;
  label: string;
  bordered?: boolean;
}) {
  return (
    <div
      className={`space-y-1 ${
        bordered ? "sm:border-x border-gray-100 px-6 py-4 sm:py-0" : ""
      }`}>
      <p className="text-3xl md:text-4xl font-black text-brand-blue">{value}</p>
      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
        {label}
      </p>
    </div>
  );
}

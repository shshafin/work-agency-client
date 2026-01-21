"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, Briefcase, ArrowRight, ShieldCheck, Info } from "lucide-react";
import Link from "next/link";

/* ================= Animations ================= */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export default function Hero() {
  return (
    <section className="relative min-h-screen pt-28 pb-16 flex items-center overflow-hidden bg-[#0B1220] text-white">
      {/* ========= GRADIENT + EFFECT BACKGROUND ========= */}
      <div className="absolute inset-0 -z-10">
        {/* Gradient Mesh */}
        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_20%_20%,rgba(234,179,8,0.25),transparent_60%),radial-gradient(50%_50%_at_80%_70%,rgba(37,99,235,0.25),transparent_60%)]" />

        {/* Glow Orbs */}
        <div className="absolute -top-40 left-1/4 w-[500px] h-[500px] bg-brand-yellow/30 rounded-full blur-[180px]" />
        <div className="absolute bottom-[-200px] right-[-100px] w-[520px] h-[520px] bg-brand-blue/30 rounded-full blur-[200px]" />

        {/* Noise overlay (premium feel) */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          {/* ================= LEFT CONTENT ================= */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            transition={{ duration: 0.7 }}
            className="space-y-8 text-center lg:text-left">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/10 px-4 py-2 rounded-full">
              <ShieldCheck
                size={14}
                className="text-brand-yellow"
              />
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest">
                Portugal Licensed · Capital{" "}
                <span className="text-brand-yellow">€250,000</span>
              </span>
            </div>

            {/* Heading */}
            <h1 className="font-black leading-[1.05] tracking-tight text-4xl sm:text-6xl md:text-7xl lg:text-8xl">
              The New <br />
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

            <p className="text-gray-300 max-w-2xl mx-auto lg:mx-0 text-base sm:text-lg md:text-xl lg:text-2xl">
              Connecting global skilled workers with trusted European employers.
              Licensed, compliant, and built to scale.
            </p>
          </motion.div>

          {/* ================= RIGHT CARDS ================= */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            transition={{ delay: 0.15, duration: 0.7 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
            {/* ===== Job Seeker Card ===== */}
            <CardWithTooltip
              icon={<Briefcase size={28} />}
              title="I want to Work"
              tooltip="For job seekers looking to work in Portugal & Europe. Browse verified vacancies and apply easily."
              href="/jobs"
              cta="Browse Vacancies"
              theme="light"
            />

            {/* ===== Employer Card ===== */}
            <CardWithTooltip
              icon={<Users size={28} />}
              title="I want to Hire"
              tooltip="For companies & factories seeking skilled foreign workers. Request manpower legally and fast."
              href="/worker-request"
              cta="Request Personnel"
              theme="dark"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ================= CARD WITH TOOLTIP ================= */
function CardWithTooltip({
  icon,
  title,
  tooltip,
  href,
  cta,
  theme,
}: {
  icon: React.ReactNode;
  title: string;
  tooltip: string;
  href: string;
  cta: string;
  theme: "light" | "dark";
}) {
  const isDark = theme === "dark";

  return (
    <motion.div
      whileHover={{ y: -10 }}
      className={`relative group rounded-[2.5rem] p-9 overflow-hidden transition-all
        ${
          isDark
            ? "bg-brand-blue text-white shadow-[0_35px_70px_-15px_rgba(10,38,71,0.5)]"
            : "bg-white text-brand-blue shadow-[0_35px_70px_-15px_rgba(0,0,0,0.08)]"
        }`}>
      {/* Icon */}
      <div
        className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-7
          ${
            isDark
              ? "bg-white/10 text-brand-yellow"
              : "bg-brand-yellow text-brand-blue"
          }`}>
        {icon}
      </div>

      <h3 className="font-black text-2xl md:text-3xl mb-4 leading-tight">
        {title.split(" ").slice(0, 3).join(" ")}
        <br />
        {title.split(" ").slice(3).join(" ")}
      </h3>

      <Link
        href={href}
        className={`inline-flex items-center gap-2 font-bold
          ${isDark ? "text-brand-yellow" : "text-brand-blue"}`}>
        {cta}
        <span
          className={`p-1 rounded-full transition group-hover:translate-x-1
            ${
              isDark
                ? "bg-brand-yellow text-brand-blue"
                : "bg-brand-blue text-white"
            }`}>
          <ArrowRight size={14} />
        </span>
      </Link>

      {/* Tooltip */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-[-6px] translate-y-full opacity-0 group-hover:opacity-100 transition pointer-events-none">
        <div className="relative bg-black text-white text-xs px-4 py-2 rounded-xl max-w-[240px] text-center">
          {tooltip}
          <span className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-black rotate-45" />
        </div>
      </div>

      {/* Mobile helper text */}
      <p className="mt-4 text-xs opacity-70 sm:hidden">
        <Info
          size={12}
          className="inline mr-1"
        />
        {tooltip}
      </p>
    </motion.div>
  );
}

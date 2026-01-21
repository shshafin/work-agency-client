"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Globe2,
  Users2,
  Building2,
  Briefcase,
  ArrowUpRight,
  Cpu,
} from "lucide-react";

const stats = [
  {
    label: "Global Presence",
    value: "16+",
    icon: <Globe2 size={20} />,
    desc: "EU & EEA Zones",
    color: "var(--brand-blue)",
  },
  {
    label: "Active Workforce",
    value: "2000+",
    icon: <Users2 size={20} />,
    desc: "Elite Professionals",
    color: "var(--brand-yellow)",
  },
  {
    label: "Partner Network",
    value: "150+",
    icon: <Building2 size={20} />,
    desc: "Industry Leaders",
    color: "var(--brand-blue)",
  },
  {
    label: "Specialized Sectors",
    value: "08",
    icon: <Briefcase size={20} />,
    desc: "Industries Served",
    color: "var(--brand-yellow)",
  },
];

const GlobalStats = () => {
  return (
    <section className="py-16 md:py-24 bg-brand-light relative overflow-hidden">
      {/* --- Grid Pattern Background --- */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(var(--brand-blue) 1.5px, transparent 1.5px)`,
          backgroundSize: "30px 30px",
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-20">
          {/* --- Left Side: Header Content --- */}
          <div className="w-full lg:w-5/12 lg:sticky lg:top-32 space-y-5 md:space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white border border-brand-blue/10 shadow-sm">
              <span className="flex h-1.5 w-1.5 rounded-full bg-brand-yellow animate-pulse" />
              <span className="text-[9px] font-mono font-bold text-brand-blue uppercase tracking-[0.2em]">
                Institutional Metrics
              </span>
            </motion.div>

            <h2 className="text-4xl md:text-7xl font-black text-brand-blue leading-[0.9] tracking-tighter">
              The Power <br />
              <span className="text-brand-yellow">of Scale.</span>
            </h2>

            <p className="text-slate-500 text-sm md:text-lg font-medium max-w-sm leading-relaxed">
              Precision recruitment engineered for the modern industrial
              landscape.
            </p>

            <div className="pt-2">
              <button className="group relative w-full sm:w-auto px-8 py-4 bg-brand-blue text-white rounded-xl font-bold overflow-hidden transition-all active:scale-95 shadow-lg shadow-brand-blue/10 text-sm">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  View Roadmap <ArrowUpRight size={16} />
                </span>
                <div className="absolute inset-0 bg-brand-yellow translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </button>
            </div>
          </div>

          {/* --- Right Side: Compact Flow --- */}
          <div className="w-full lg:w-7/12 relative mt-8 lg:mt-0">
            {/* The Central Path Line */}
            <div className="absolute left-[23px] lg:left-1/2 top-0 w-px h-full bg-gradient-to-b from-transparent via-brand-blue/20 to-transparent" />

            {/* Moving Glow Dot */}
            <motion.div
              animate={{ top: ["0%", "100%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute left-[20px] lg:left-[calc(50%-3px)] w-[6px] h-16 bg-gradient-to-b from-brand-yellow to-transparent z-20 blur-[2px]"
            />

            <div className="space-y-12 lg:space-y-20">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className={`relative flex items-center w-full ${
                    index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}>
                  {/* Icon Node */}
                  <div className="absolute left-0 lg:left-1/2 lg:-translate-x-1/2 z-30">
                    <div
                      className="w-[48px] h-12 flex items-center justify-center rounded-xl bg-white shadow-md border"
                      style={{
                        borderColor: `${stat.color}30`,
                        color: stat.color,
                      }}>
                      {stat.icon}
                    </div>
                    <div className="absolute top-1/2 -translate-y-1/2 left-5.75 lg:left-1/2 lg:-translate-x-1/2 w-2 h-2 rounded-full bg-brand-blue border-2 border-white z-40" />
                  </div>

                  {/* Text Content */}
                  <div
                    className={`w-full flex ${
                      index % 2 === 0
                        ? "pl-16 lg:pl-0 lg:pr-[55%] lg:justify-end lg:text-right"
                        : "pl-16 lg:pl-[55%] lg:justify-start lg:text-left"
                    }`}>
                    <motion.div
                      initial={{ opacity: 0, x: index % 2 === 0 ? 15 : -15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      className="flex flex-col">
                      <h3
                        className="text-4xl md:text-6xl font-black tracking-tighter"
                        style={{ color: stat.color }}>
                        {stat.value}
                      </h3>
                      <span className="text-[9px] md:text-xs font-mono font-black text-brand-blue uppercase tracking-widest">
                        {stat.label}
                      </span>
                      <span className="text-slate-400 text-[8px] md:text-[10px] font-bold uppercase mt-0.5 opacity-70">
                        {stat.desc}
                      </span>
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* --- Redesigned Status Bar --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-16 md:mt-24 group">
          <div className="relative overflow-hidden rounded-2xl bg-white border border-brand-blue/5 shadow-xl shadow-brand-blue/[0.02] p-1">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-6 py-4 rounded-xl bg-brand-light/50 backdrop-blur-sm border border-white">
              <div className="flex items-center gap-4">
                <div className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono font-black text-brand-blue uppercase leading-none">
                    System Online
                  </span>
                  <span className="text-[9px] font-bold text-slate-400 uppercase mt-1">
                    Worldwide Talent Syncing Active
                  </span>
                </div>
              </div>

              {/* Central Divider (Desktop) */}
              <div className="hidden md:block h-8 w-px bg-slate-200/60 mx-4" />

              <div className="flex items-center gap-3 bg-brand-blue/[0.03] px-4 py-2 rounded-lg border border-brand-blue/5">
                <Cpu
                  size={14}
                  className="text-brand-blue/40"
                />
                <div className="flex flex-col md:items-end">
                  <span className="text-[10px] font-mono font-black text-brand-blue uppercase leading-none">
                    Protocol v4.0.1
                  </span>
                  <span className="text-[9px] font-bold text-slate-400 uppercase mt-1 tracking-tighter">
                    Global Recruitment Standards Applied
                  </span>
                </div>
              </div>
            </div>
            {/* Animated Bottom Progress Line */}
            <div className="absolute bottom-0 left-0 h-0.5 w-full bg-slate-100">
              <motion.div
                animate={{ left: ["-100%", "100%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute h-full w-1/3 bg-linear-to-r from-transparent via-brand-yellow to-transparent"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GlobalStats;

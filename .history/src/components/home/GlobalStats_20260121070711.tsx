"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Globe2,
  Users2,
  Building2,
  Briefcase,
  ArrowUpRight,
} from "lucide-react";

const stats = [
  {
    label: "Global Presence",
    value: "16+",
    icon: <Globe2 size={24} />,
    desc: "EU & EEA Zones",
    color: "var(--brand-blue)",
  },
  {
    label: "Active Workforce",
    value: "2000+",
    icon: <Users2 size={24} />,
    desc: "Elite Professionals",
    color: "var(--brand-yellow)",
  },
  {
    label: "Partner Network",
    value: "150+",
    icon: <Building2 size={24} />,
    desc: "Industry Leaders",
    color: "var(--brand-blue)",
  },
  {
    label: "Specialized Sectors",
    value: "08",
    icon: <Briefcase size={24} />,
    desc: "Industries Served",
    color: "var(--brand-yellow)",
  },
];

const GlobalStats = () => {
  return (
    <section className="py-20 md:py-32 bg-brand-light relative overflow-hidden">
      {/* --- Digital Architecture Background --- */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(var(--brand-blue) 1.5px, transparent 1.5px)`,
          backgroundSize: "30px 30px",
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-16 lg:gap-20">
          {/* --- Left Side: Fixed Content --- */}
          <div className="w-full lg:flex-1 space-y-6 md:space-y-8 text-left">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white border border-brand-blue/10 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-brand-yellow animate-pulse" />
              <span className="text-[10px] font-mono font-bold text-brand-blue uppercase tracking-[0.3em]">
                Institutional Metrics
              </span>
            </motion.div>

            <h2 className="text-5xl md:text-8xl font-black text-brand-blue leading-[0.9] tracking-tighter">
              The Power <br />
              <span className="text-brand-yellow">of Scale.</span>
            </h2>

            <p className="text-slate-500 text-base md:text-xl font-medium max-w-xl leading-relaxed">
              Redefining industrial recruitment through logistical precision and
              a borderless approach to talent.
            </p>

            <div className="pt-4">
              <button className="group relative w-full sm:w-auto px-10 py-5 bg-brand-blue text-white rounded-full font-bold overflow-hidden transition-all active:scale-95 shadow-xl shadow-brand-blue/10">
                <span className="relative z-10 flex items-center justify-center gap-3">
                  Company Roadmap <ArrowUpRight size={20} />
                </span>
                <div className="absolute inset-0 bg-brand-yellow translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </button>
            </div>
          </div>

          {/* --- Right Side: The Connected Mobile-Optimized Flow --- */}
          <div className="w-full lg:flex-1 relative pt-10 lg:pt-0">
            {/* The Central Path Line (Visible and center-aligned on mobile) */}
            <div className="absolute left-[31px] md:left-1/2 top-0 w-px h-full bg-gradient-to-b from-transparent via-brand-blue/20 to-transparent" />

            {/* Animated Glow Dot following the path */}
            <motion.div
              animate={{ top: ["0%", "100%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute left-[28.5px] md:left-[calc(50%-3.5px)] w-[6px] h-20 bg-gradient-to-b from-brand-yellow to-transparent z-20 blur-[2px]"
            />

            <div className="space-y-12 md:space-y-0 md:relative md:h-[600px]">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className={`relative flex items-center md:justify-center w-full ${
                    index % 2 === 0
                      ? "md:flex-row-reverse md:text-right md:-translate-y-16"
                      : "md:flex-row md:text-left md:translate-y-16"
                  }`}>
                  {/* Icon Node */}
                  <div className="relative z-30 shrink-0">
                    <div
                      className="w-[64px] h-[64px] flex items-center justify-center rounded-2xl bg-white shadow-xl"
                      style={{
                        border: `2px solid ${stat.color}`,
                        color: stat.color,
                      }}>
                      {stat.icon}
                    </div>
                    {/* Intersection Dot */}
                    <div className="absolute top-1/2 -translate-y-1/2 left-[31px] md:left-1/2 md:-translate-x-1/2 w-2 h-2 rounded-full bg-brand-blue border border-white z-40" />
                  </div>

                  {/* Text Content */}
                  <div
                    className={`pl-10 md:pl-0 ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"} flex-1`}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="inline-block">
                      <h3
                        className="text-5xl md:text-7xl font-black tracking-tighter block"
                        style={{ color: stat.color }}>
                        {stat.value}
                      </h3>
                      <div className="flex flex-col">
                        <span className="text-[10px] md:text-xs font-mono font-extrabold text-brand-blue uppercase tracking-widest">
                          {stat.label}
                        </span>
                        <span className="text-slate-400 text-[9px] md:text-[11px] font-bold uppercase mt-1">
                          {stat.desc}
                        </span>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* --- Subtle Decorative Footer for Mobile --- */}
      <div className="mt-20 px-6 lg:hidden">
        <div className="p-4 rounded-2xl bg-white border border-brand-blue/5 shadow-sm flex items-center gap-4">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
            System Online: Worldwide Talent Sync
          </span>
        </div>
      </div>
    </section>
  );
};

export default GlobalStats;

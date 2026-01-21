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
    accent: "var(--brand-yellow)",
  },
  {
    label: "Active Workforce",
    value: "2000+",
    icon: <Users2 size={24} />,
    desc: "Elite Professionals",
    color: "var(--brand-yellow)",
    accent: "var(--brand-blue)",
  },
  {
    label: "Partner Network",
    value: "150+",
    icon: <Building2 size={24} />,
    desc: "Industry Leaders",
    color: "var(--brand-blue)",
    accent: "var(--brand-yellow)",
  },
  {
    label: "Specialized Sectors",
    value: "08",
    icon: <Briefcase size={24} />,
    desc: "Industries Served",
    color: "var(--brand-yellow)",
    accent: "var(--brand-blue)",
  },
];

const GlobalStats = () => {
  return (
    <section className="py-32 bg-brand-light relative overflow-hidden">
      {/* --- Abstract Background Architecture --- */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(var(--brand-blue) 1.5px, transparent 1.5px)`,
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-brand-yellow/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          {/* --- Left Side: Bold Typography --- */}
          <div className="flex-1 space-y-8 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white border border-brand-blue/10 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-brand-yellow animate-pulse" />
              <span className="text-[10px] font-mono font-bold text-brand-blue uppercase tracking-[0.3em]">
                Institutional Metrics
              </span>
            </motion.div>

            <h2 className="text-5xl md:text-8xl font-black text-brand-blue leading-[0.85] tracking-tighter">
              The Power <br />
              <span className="text-brand-yellow">of Scale.</span>
            </h2>

            <p className="text-slate-500 text-lg md:text-xl font-medium max-w-xl">
              Since 2019, we&apos;ve redefined industrial recruitment through
              logistical precision and a borderless approach to talent.
            </p>

            <div className="pt-6">
              <button className="group relative px-10 py-5 bg-brand-blue text-white rounded-full font-bold overflow-hidden transition-all hover:shadow-[0_20px_40px_-15px_rgba(10,38,71,0.3)]">
                <span className="relative z-10 flex items-center gap-3">
                  Company Roadmap{" "}
                  <ArrowUpRight
                    size={20}
                    className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                  />
                </span>
                <div className="absolute inset-0 bg-brand-yellow translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </button>
            </div>
          </div>

          {/* --- Right Side: The Connected "Pulse" Flow --- */}
          <div className="flex-1 relative w-full h-[600px]">
            {/* Central Vertical Line */}
            <div className="absolute left-1/2 top-0 w-px h-full bg-gradient-to-b from-transparent via-brand-blue/20 to-transparent hidden md:block" />

            <div className="grid grid-cols-1 md:grid-cols-2 h-full gap-4 md:gap-0">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.15 }}
                  className={`relative flex flex-col justify-center p-6 ${
                    index % 2 === 0
                      ? "md:items-end md:text-right md:pr-12"
                      : "md:items-start md:text-left md:pl-12 md:mt-32"
                  }`}>
                  {/* Indicator Dot on the Line */}
                  <div
                    className={`hidden md:block absolute top-1/2 ${index % 2 === 0 ? "-right-[5px]" : "-left-[5px]"} -translate-y-1/2 w-2 h-2 rounded-full bg-brand-blue shadow-[0_0_10px_var(--brand-yellow)]`}
                  />

                  {/* Icon Hexagon/Box */}
                  <div
                    className="w-16 h-16 flex items-center justify-center rounded-2xl mb-6 shadow-xl transition-transform hover:rotate-12 duration-500"
                    style={{
                      backgroundColor: "white",
                      border: `2px solid ${stat.color}`,
                      color: stat.color,
                    }}>
                    {stat.icon}
                  </div>

                  <div className="space-y-1">
                    <h3
                      className="text-6xl font-black tracking-tighter"
                      style={{ color: stat.color }}>
                      {stat.value}
                    </h3>
                    <p className="text-xs font-mono font-bold text-brand-blue uppercase tracking-widest">
                      {stat.label}
                    </p>
                    <p className="text-slate-400 text-[11px] font-bold mt-2 uppercase">
                      {stat.desc}
                    </p>
                  </div>

                  {/* Visual Background Element */}
                  <div className="absolute inset-0 bg-white/40 -z-10 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* --- Floating Data Tag --- */}
      <div className="absolute bottom-10 left-10 hidden xl:block">
        <div className="flex items-center gap-4 bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-brand-blue/5 shadow-2xl">
          <div className="w-10 h-10 rounded-full bg-brand-blue flex items-center justify-center text-white font-bold">
            QS
          </div>
          <div>
            <p className="text-[10px] font-mono font-black text-brand-blue uppercase">
              Quality Standard
            </p>
            <p className="text-[9px] text-slate-400">ISO 9001:2025 COMPLIANT</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlobalStats;

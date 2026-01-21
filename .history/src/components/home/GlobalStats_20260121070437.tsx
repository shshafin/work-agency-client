"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Globe2,
  Users2,
  Building2,
  Briefcase,
  Plus,
  Sparkles,
} from "lucide-react";

const stats = [
  {
    label: "Global Presence",
    value: "16+",
    icon: <Globe2 size={28} />,
    desc: "EU & EEA Zones",
    position: "lg:top-0 lg:left-0",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    label: "Active Workforce",
    value: "2000+",
    icon: <Users2 size={28} />,
    desc: "Elite Professionals",
    position: "lg:top-20 lg:left-1/3",
    color: "text-orange-600",
    bg: "bg-orange-50",
  },
  {
    label: "Partner Network",
    value: "150+",
    icon: <Building2 size={28} />,
    desc: "Industry Leaders",
    position: "lg:-top-10 lg:left-2/3",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    label: "Specialized Sectors",
    value: "08",
    icon: <Briefcase size={28} />,
    desc: "Industries Served",
    position: "lg:top-40 lg:left-[85%]",
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
];

const GlobalStats = () => {
  return (
    <section className="py-32 bg-white relative overflow-hidden">
      {/* --- Abstract Tech Background --- */}
      <div className="absolute inset-0 pointer-events-none">
        <svg
          className="absolute w-full h-full opacity-[0.05]"
          viewBox="0 0 100 100"
          preserveAspectRatio="none">
          <path
            d="M0,50 Q25,45 50,50 T100,50"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.1"
            className="text-blue-600"
          />
          <path
            d="M0,60 Q30,55 60,60 T100,60"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.1"
            className="text-orange-600"
          />
        </svg>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-50/30 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* --- Header --- */}
        <div className="text-center max-w-3xl mx-auto mb-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-50 border border-slate-100 mb-6">
            <Sparkles
              size={14}
              className="text-brand-yellow"
            />
            <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-[0.3em]">
              Scalability Report
            </span>
          </motion.div>

          <h2 className="text-5xl md:text-7xl font-black text-[#0A192F] tracking-tighter leading-none mb-8">
            Expanding{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
              Beyond
            </span>{" "}
            <br />
            Boundaries.
          </h2>
          <p className="text-slate-500 text-lg font-medium">
            We don&apos;t just fill positions; we orchestrate a global network
            of talent.
          </p>
        </div>

        {/* --- Unique Node-Based Layout --- */}
        <div className="relative min-h-[500px] mt-20">
          {/* Connecting Path (Visible on Desktop) */}
          <svg
            className="hidden lg:block absolute top-1/2 left-0 w-full h-2 z-0"
            viewBox="0 0 1000 100">
            <motion.path
              d="M0,50 C200,50 300,0 500,50 C700,100 800,50 1000,50"
              fill="none"
              stroke="#E2E8F0"
              strokeWidth="2"
              strokeDasharray="10,10"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </svg>

          <div className="flex flex-col lg:block gap-12 relative">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`lg:absolute ${stat.position} group`}>
                <div className="flex items-center gap-6">
                  {/* The Node Circle */}
                  <div
                    className={`relative w-24 h-24 flex items-center justify-center rounded-full ${stat.bg} ${stat.color} border-4 border-white shadow-xl group-hover:scale-110 transition-all duration-500 z-10`}>
                    {stat.icon}
                    {/* Pulsing Outer Ring */}
                    <div
                      className={`absolute inset-0 rounded-full ${stat.bg} animate-ping opacity-20`}
                    />
                  </div>

                  {/* Info Sidebar (Floating) */}
                  <div className="flex flex-col">
                    <motion.div
                      whileHover={{ x: 10 }}
                      className="cursor-default">
                      <h3 className="text-5xl font-black text-[#0A192F] tracking-tight flex items-baseline gap-1">
                        {stat.value}
                        <span className="text-sm font-mono text-slate-400 font-bold uppercase tracking-widest block">
                          {stat.label}
                        </span>
                      </h3>
                      <p className="text-slate-400 text-xs font-bold bg-slate-50 px-3 py-1 rounded-full w-fit mt-2">
                        {stat.desc}
                      </p>
                    </motion.div>
                  </div>
                </div>

                {/* Decorative Small Nodes */}
                <div className="hidden lg:block absolute -top-2 -right-2 w-3 h-3 rounded-full bg-slate-200 group-hover:bg-brand-yellow transition-colors" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* --- Final CTA --- */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-40 text-center">
          <button className="group px-10 py-5 bg-[#0A192F] text-white rounded-[2rem] font-bold overflow-hidden relative inline-flex items-center gap-3 hover:pr-14 transition-all shadow-2xl shadow-blue-900/20">
            <span className="relative z-10">Download Impact Report 2025</span>
            <div className="w-2 h-2 rounded-full bg-brand-yellow absolute right-8 group-hover:scale-[10] transition-all duration-500 opacity-0 group-hover:opacity-20" />
            <Plus
              size={20}
              className="relative z-10 text-brand-yellow"
            />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default GlobalStats;

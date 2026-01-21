"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Search,
  UserCheck,
  Handshake,
  FileCheck,
  ArrowRight,
  Activity,
} from "lucide-react";

const steps = [
  {
    title: "Needs Assessment",
    desc: "Analyzing industry requirements and critical workforce gaps.",
    icon: <Search size={22} />,
    accent: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    title: "Selection & Vetting",
    desc: "Rigorous screening and multi-level background checks.",
    icon: <UserCheck size={22} />,
    accent: "text-orange-600",
    bg: "bg-orange-50",
  },
  {
    title: "Legal Contracting",
    desc: "Managing Portuguese labor laws, insurance, and payroll.",
    icon: <FileCheck size={22} />,
    accent: "text-brand-blue",
    bg: "bg-indigo-50",
  },
  {
    title: "Onboarding",
    desc: "Seamless integration into your operational workflow.",
    icon: <Handshake size={22} />,
    accent: "text-emerald-600",
    bg: "bg-emerald-50",
  },
];

const Process = () => {
  return (
    <section className="py-32 bg-white relative overflow-hidden">
      {/* --- Digital Grid Overlay (Subtle White Tech Vibe) --- */}
      <div
        className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* --- Section Header --- */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-24 gap-12">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200 mb-6">
              <Activity
                size={14}
                className="text-blue-600 animate-pulse"
              />
              <span className="text-[10px] font-mono font-bold text-slate-600 uppercase tracking-[0.3em]">
                Workflow Protocol v2.0
              </span>
            </motion.div>

            <h2 className="text-5xl md:text-7xl font-black text-[#0A192F] tracking-tight leading-[0.9]">
              The Precision <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                Pipeline.
              </span>
            </h2>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-slate-500 font-medium text-lg max-w-sm leading-relaxed border-l-4 border-blue-600 pl-6">
            A high-velocity deployment system engineered for the modern
            industrial landscape.
          </motion.p>
        </div>

        {/* --- Process Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative">
              {/* Animated Connection Arrow (Desktop) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 -right-4 z-20">
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}>
                    <ArrowRight
                      className="text-slate-200"
                      size={24}
                    />
                  </motion.div>
                </div>
              )}

              {/* Card Container */}
              <div className="h-full bg-white border border-slate-100 p-8 rounded-[2rem] shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.1)] transition-all duration-500 relative overflow-hidden">
                {/* Background Number Trace */}
                <span className="absolute -right-4 -top-4 font-mono text-9xl font-black text-slate-50 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                  {index + 1}
                </span>

                {/* Icon Layer */}
                <div
                  className={`w-14 h-14 rounded-2xl ${step.bg} ${step.accent} flex items-center justify-center mb-10 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-sm`}>
                  {step.icon}
                </div>

                {/* Content */}
                <div className="space-y-4 relative z-10">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold text-blue-500 bg-blue-50 px-2 py-0.5 rounded">
                      STEP_0{index + 1}
                    </span>
                  </div>
                  <h3 className="text-2xl font-black text-[#0A192F] tracking-tight group-hover:text-blue-600 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed font-medium">
                    {step.desc}
                  </p>
                </div>

                {/* Digital "Scanning" Light Effect */}
                <div className="absolute top-0 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-blue-400 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* --- Bottom Data Bar --- */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 pt-10 border-t border-slate-100">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
              Protocol Integrity
            </span>
            <span className="text-sm font-bold text-[#0A192F]">
              100% Legal Compliance
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
              Efficiency Rate
            </span>
            <span className="text-sm font-bold text-[#0A192F]">
              98.4% Retention Scale
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
              Network Speed
            </span>
            <span className="text-sm font-bold text-[#0A192F]">
              Real-time Talent Syncing
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;

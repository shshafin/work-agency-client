"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Search,
  UserCheck,
  Handshake,
  FileCheck,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    title: "Needs Assessment",
    desc: "Analyzing industry requirements and critical workforce gaps.",
    icon: <Search size={22} />,
    color: "from-blue-600 to-cyan-400",
  },
  {
    title: "Selection & Vetting",
    desc: "Rigorous screening and multi-level background checks.",
    icon: <UserCheck size={22} />,
    color: "from-amber-500 to-orange-400",
  },
  {
    title: "Legal Contracting",
    desc: "Managing Portuguese labor laws, insurance, and payroll.",
    icon: <FileCheck size={22} />,
    color: "from-indigo-600 to-blue-500",
  },
  {
    title: "Onboarding",
    desc: "Seamless integration into your operational workflow.",
    icon: <Handshake size={22} />,
    color: "from-emerald-600 to-teal-400",
  },
];

const Process = () => {
  return (
    <section className="py-32 bg-[#020617] relative overflow-hidden">
      {/* --- Digital Grid Background --- */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#fff 1px, transparent 1px)`,
          backgroundSize: "30px 30px",
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* --- Section Header --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-3 px-3 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-[0.3em]">
                System Architecture
              </span>
            </motion.div>

            <h2 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-none">
              The Digital <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-600">
                Bridge.
              </span>
            </h2>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-gray-500 font-mono text-xs uppercase tracking-widest border-l border-white/10 pl-6 hidden md:block">
            Optimizing <br /> Human Capital <br /> Efficiency.
          </motion.div>
        </div>

        {/* --- Process Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative">
              {/* Card Container */}
              <div className="h-full bg-white/[0.02] border border-white/5 p-8 rounded-3xl hover:bg-white/[0.04] hover:border-white/10 transition-all duration-500 relative overflow-hidden">
                {/* Top Interaction Layer */}
                <div className="flex justify-between items-start mb-12">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-500`}>
                    {step.icon}
                  </div>
                  <span className="font-mono text-4xl font-black text-white/5 group-hover:text-white/10 transition-colors">
                    0{index + 1}
                  </span>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    {step.title}
                    <ArrowRight
                      size={14}
                      className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-blue-400"
                    />
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed font-medium">
                    {step.desc}
                  </p>
                </div>

                {/* Bottom Digital Line Effect */}
                <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent group-hover:w-full transition-all duration-700" />
              </div>

              {/* Connecting Arrows (Desktop Only) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:flex absolute top-1/2 -right-6 z-20 items-center justify-center opacity-20">
                  <div className="w-8 h-px bg-gradient-to-r from-white to-transparent" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* --- Bottom Status Bar --- */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 py-6 border-t border-white/5 flex flex-wrap justify-between items-center gap-6">
          <div className="flex gap-8">
            <div className="flex flex-col">
              <span className="text-[10px] text-gray-500 font-mono uppercase">
                System Status
              </span>
              <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider">
                Operational
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-gray-500 font-mono uppercase">
                Avg. Deployment
              </span>
              <span className="text-xs text-white font-bold uppercase tracking-wider">
                14-21 Days
              </span>
            </div>
          </div>

          <div className="h-10 w-px bg-white/5 hidden md:block" />

          <p className="text-gray-500 text-[11px] max-w-sm italic">
            * Our framework is designed for high-velocity industrial scaling
            while maintaining 100% legal compliance protocols.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Process;

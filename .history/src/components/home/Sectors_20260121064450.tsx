"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  HardHat,
  Wheat,
  Truck,
  ChefHat,
  Factory,
  Hammer,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const industries = [
  {
    title: "Construction",
    desc: "Building the future of Europe with precision & power.",
    icon: <HardHat size={28} />,
    glow: "group-hover:shadow-[0_0_40px_-10px_#f97316]",
    accent: "bg-orange-500",
    border: "hover:border-orange-500/50",
  },
  {
    title: "Agriculture",
    desc: "Connecting skilled farmers to the heart of nature.",
    icon: <Wheat size={28} />,
    glow: "group-hover:shadow-[0_0_40px_-10px_#22c55e]",
    accent: "bg-green-500",
    border: "hover:border-green-500/50",
  },
  {
    title: "Logistics",
    desc: "Driving global supply chains with expert coordination.",
    icon: <Truck size={28} />,
    glow: "group-hover:shadow-[0_0_40px_-10px_#3b82f6]",
    accent: "bg-blue-500",
    border: "hover:border-blue-500/50",
  },
  {
    title: "HoReCa",
    desc: "Excellence in hospitality & professional services.",
    icon: <ChefHat size={28} />,
    glow: "group-hover:shadow-[0_0_40px_-10px_#ef4444]",
    accent: "bg-red-500",
    border: "hover:border-red-500/50",
  },
  {
    title: "Production",
    desc: "Optimizing manufacturing lines with elite personnel.",
    icon: <Factory size={28} />,
    glow: "group-hover:shadow-[0_0_40px_-10px_#a855f7]",
    accent: "bg-purple-500",
    border: "hover:border-purple-500/50",
  },
  {
    title: "General Labour",
    desc: "Versatile labor solutions for complex industry needs.",
    icon: <Hammer size={28} />,
    glow: "group-hover:shadow-[0_0_40px_-10px_#64748b]",
    accent: "bg-slate-400",
    border: "hover:border-slate-400/50",
  },
];

const Sectors = () => {
  return (
    <section className="py-24 bg-[#030712] relative overflow-hidden">
      {/* --- Ambient Background --- */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-orange-500/10 rounded-full blur-[120px] animate-pulse" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* --- Header --- */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl mb-6">
            <span className="w-2 h-2 rounded-full bg-brand-yellow animate-ping" />
            <span className="text-[11px] font-bold text-gray-300 uppercase tracking-[0.3em]">
              Our Specialization
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-extrabold text-white leading-[1.1] tracking-tight">
            Industries We <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow via-orange-400 to-yellow-200">
              Empower.
            </span>
          </motion.h2>
        </div>

        {/* --- Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className={`group relative rounded-[2.5rem] p-px transition-all duration-500 ${item.glow}`}>
              <div
                className={`relative h-full bg-[#0f172a]/80 backdrop-blur-2xl p-8 md:p-10 rounded-[2.4rem] border border-white/10 transition-all duration-500 ${item.border}`}>
                {/* Icon Box */}
                <div
                  className={`w-14 h-14 rounded-2xl ${item.accent} bg-opacity-15 flex items-center justify-center text-white mb-8 border border-white/5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                  {item.icon}
                </div>

                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-white mb-4 flex items-center justify-between">
                    {item.title}
                    <ArrowRight
                      className="text-white/20 group-hover:text-brand-yellow group-hover:translate-x-2 transition-all duration-300"
                      size={24}
                    />
                  </h3>

                  <p className="text-gray-400 font-medium leading-relaxed mb-10 min-h-[60px]">
                    {item.desc}
                  </p>

                  <div className="flex flex-col gap-4">
                    <div className="h-px w-full bg-gradient-to-r from-white/10 to-transparent" />
                    <div className="flex items-center justify-between">
                      <Link
                        href="/jobs"
                        className="group/link flex items-center gap-2 text-xs font-bold text-brand-yellow uppercase tracking-widest">
                        Explore More
                        <span className="block h-px w-0 group-hover/link:w-4 bg-brand-yellow transition-all duration-300" />
                      </Link>

                      {/* Visual Progress Dot */}
                      <div className="flex gap-1">
                        {[1, 2, 3].map((i) => (
                          <div
                            key={i}
                            className={`h-1 w-1 rounded-full ${i === 1 ? item.accent : "bg-white/10"}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Subtle Bottom Glow */}
                <div
                  className={`absolute -bottom-10 -left-10 w-32 h-32 ${item.accent} opacity-0 group-hover:opacity-10 blur-[50px] transition-opacity`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sectors;

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
    glow: "group-hover:shadow-[0_0_30px_-5px_#f97316]",
    accent: "bg-orange-500",
  },
  {
    title: "Agriculture",
    desc: "Connecting skilled farmers to the heart of nature.",
    icon: <Wheat size={28} />,
    glow: "group-hover:shadow-[0_0_30px_-5px_#22c55e]",
    accent: "bg-green-500",
  },
  {
    title: "Logistics",
    desc: "Driving global supply chains with expert coordination.",
    icon: <Truck size={28} />,
    glow: "group-hover:shadow-[0_0_30px_-5px_#3b82f6]",
    accent: "bg-blue-500",
  },
  {
    title: "HoReCa",
    desc: "Excellence in hospitality & professional services.",
    icon: <ChefHat size={28} />,
    glow: "group-hover:shadow-[0_0_30px_-5px_#ef4444]",
    accent: "bg-red-500",
  },
  {
    title: "Production",
    desc: "Optimizing manufacturing lines with elite personnel.",
    icon: <Factory size={28} />,
    glow: "group-hover:shadow-[0_0_30px_-5px_#a855f7]",
    accent: "bg-purple-500",
  },
  {
    title: "General Labour",
    desc: "Versatile labor solutions for complex industry needs.",
    icon: <Hammer size={28} />,
    glow: "group-hover:shadow-[0_0_30px_-5px_#64748b]",
    accent: "bg-slate-500",
  },
];

const Sectors = () => {
  return (
    <section className="py-24 bg-[#0A192F] relative overflow-hidden">
      {/* --- Deep Background Gradients --- */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand-blue/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-brand-yellow/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* --- Centered Dynamic Header --- */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-4">
            <span className="text-[10px] font-black text-brand-yellow uppercase tracking-[0.5em]">
              Global Expertise
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tighter">
            Industries We <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow to-orange-400 italic">
              Revolutionize.
            </span>
          </motion.h2>
        </div>

        {/* --- Interactive Animated Grid --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className={`group relative p-1 rounded-[2.5rem] transition-all duration-500 ${item.glow}`}>
              {/* Card Inner Content */}
              <div className="bg-[#112240] h-full p-8 md:p-10 rounded-[2.4rem] border border-white/5 relative overflow-hidden transition-all group-hover:bg-[#172a48]">
                {/* Accent Background Glow */}
                <div
                  className={`absolute top-0 right-0 w-24 h-24 ${item.accent} opacity-10 blur-[40px] group-hover:opacity-30 transition-opacity`}
                />

                <div className="relative z-10">
                  <div
                    className={`w-16 h-16 rounded-2xl ${item.accent} bg-opacity-10 flex items-center justify-center text-white mb-8 group-hover:scale-110 transition-transform duration-500`}>
                    {item.icon}
                  </div>

                  <h3 className="text-2xl font-black text-white mb-4 flex items-center gap-3">
                    {item.title}
                    <motion.span
                      initial={{ x: -10, opacity: 0 }}
                      whileHover={{ x: 0, opacity: 1 }}
                      className="text-brand-yellow">
                      <ArrowRight size={20} />
                    </motion.span>
                  </h3>

                  <p className="text-blue-100/60 font-medium leading-relaxed mb-8">
                    {item.desc}
                  </p>

                  <div className="flex items-center justify-between mt-auto">
                    <Link
                      href="/jobs"
                      className="text-xs font-black text-brand-yellow uppercase tracking-widest hover:underline">
                      Browse Jobs
                    </Link>
                    <div className="h-1 w-12 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ x: "-100%" }}
                        whileInView={{ x: "0%" }}
                        transition={{ duration: 1 }}
                        className={`h-full w-full ${item.accent}`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sectors;

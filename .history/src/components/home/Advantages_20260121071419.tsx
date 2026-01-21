"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Globe,
  Users,
  Zap,
  Scale,
  HeartHandshake,
  ArrowUpRight,
} from "lucide-react";

const advantages = [
  {
    title: "Global Reach",
    desc: "Active presence in 16+ countries across the European Union, ensuring cross-border excellence.",
    icon: <Globe size={28} />,
    size: "lg:col-span-2 lg:row-span-1",
    gradient: "from-blue-50 to-transparent",
  },
  {
    title: "Legal Security",
    desc: "100% compliance with Portuguese labor laws & insurance protocols.",
    icon: <Scale size={28} />,
    size: "lg:col-span-1 lg:row-span-1",
    gradient: "from-slate-50 to-transparent",
  },
  {
    title: "Diverse Talent",
    desc: "Access to 2000+ specialized workers across 8 industrial sectors.",
    icon: <Users size={28} />,
    size: "lg:col-span-1 lg:row-span-2",
    gradient: "from-amber-50 to-transparent",
  },
  {
    title: "Professionalism",
    desc: "Dedicated account managers providing 24/7 partner support.",
    icon: <ShieldCheck size={28} />,
    size: "lg:col-span-1 lg:row-span-1",
    gradient: "from-indigo-50 to-transparent",
  },
  {
    title: "Fast Deployment",
    desc: "Rapid mobilization to meet your most urgent workforce needs.",
    icon: <Zap size={28} />,
    size: "lg:col-span-1 lg:row-span-1",
    gradient: "from-orange-50 to-transparent",
  },
];

const Advantages = () => {
  return (
    <section className="py-24 bg-brand-light relative overflow-hidden">
      {/* --- Background Aesthetic --- */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-brand-yellow/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* --- Header --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-brand-blue/5 border border-brand-blue/10 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow animate-pulse" />
              <span className="text-[10px] font-mono font-bold text-brand-blue uppercase tracking-[0.3em]">
                Strategic Edge
              </span>
            </motion.div>
            <h2 className="text-5xl md:text-7xl font-black text-brand-blue tracking-tighter leading-[0.9]">
              Why Industry Leaders <br />
              <span className="text-brand-yellow italic">Choose Us.</span>
            </h2>
          </div>
          <p className="text-slate-500 font-medium max-w-xs border-l-2 border-brand-yellow pl-6 hidden md:block">
            We combine legal rigidity with operational flexibility to scale your
            business.
          </p>
        </div>

        {/* --- Glorious Bento Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-rows-auto lg:grid-rows-2 gap-4">
          {advantages.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className={`${item.size} group relative bg-white border border-slate-200/60 rounded-[2rem] p-8 shadow-sm hover:shadow-xl hover:border-brand-yellow/30 transition-all duration-500 overflow-hidden flex flex-col justify-between`}>
              {/* Subtle Gradient Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />

              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-brand-light border border-slate-100 flex items-center justify-center text-brand-blue group-hover:bg-brand-blue group-hover:text-white group-hover:rotate-6 transition-all duration-500 shadow-sm">
                  {item.icon}
                </div>
              </div>

              <div className="relative z-10 mt-12">
                <h3 className="text-2xl font-black text-brand-blue mb-3 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-slate-500 text-sm font-semibold leading-relaxed group-hover:text-slate-600 transition-colors">
                  {item.desc}
                </p>
              </div>

              {/* Decorative Corner Arrow */}
              <div className="absolute top-8 right-8 text-slate-200 group-hover:text-brand-yellow group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-500">
                <ArrowUpRight size={24} />
              </div>
            </motion.div>
          ))}

          {/* Special CTA Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="lg:col-span-1 lg:row-span-1 bg-brand-blue rounded-[2rem] p-8 flex flex-col justify-between items-start relative overflow-hidden group shadow-lg shadow-brand-blue/20">
            <div className="relative z-10 bg-brand-yellow/20 p-3 rounded-xl border border-brand-yellow/30">
              <HeartHandshake
                className="text-brand-yellow"
                size={32}
              />
            </div>

            <div className="relative z-10">
              <h3 className="text-3xl font-black text-white leading-tight mb-6">
                Ready to <br /> Scale Up?
              </h3>
              <button className="flex items-center gap-3 bg-brand-yellow text-brand-blue px-6 py-3 rounded-xl font-extrabold text-sm hover:bg-white hover:scale-105 transition-all active:scale-95">
                Contact Us <ArrowUpRight size={18} />
              </button>
            </div>

            {/* Background Decorative Pattern */}
            <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/5 rounded-full blur-3xl group-hover:bg-brand-yellow/10 transition-colors" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Advantages;

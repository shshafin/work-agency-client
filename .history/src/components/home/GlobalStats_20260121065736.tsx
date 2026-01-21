"use client";

import React from "react";
import { motion } from "framer-motion";
import { Globe2, Users2, Building2, Briefcase } from "lucide-react";

const stats = [
  {
    label: "Presence in Countries",
    value: "16+",
    icon: <Globe2 className="text-brand-yellow" size={32} />,
    desc: "Expanding across the EU & EEA zone."
  },
  {
    label: "Assigned Workers",
    value: "2000+",
    icon: <Users2 className="text-brand-yellow" size={32} />,
    desc: "A workforce that drives excellence."
  },
  {
    label: "Specialized Sectors",
    value: "08",
    icon: <Briefcase className="text-brand-yellow" size={32} />,
    desc: "Tailored solutions for every industry."
  },
  {
    label: "Partner Companies",
    value: "150+",
    icon: <Building2 className="text-brand-yellow" size={32} />,
    desc: "Trusted by leaders across Europe."
  }
];

const GlobalStats = () => {
  return (
    <section className="py-24 bg-brand-blue relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 skew-x-12 translate-x-1/2 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* বাম পাশ: কন্টেন্ট */}
          <div className="space-y-8">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tighter"
            >
              Our Growth is Your <br />
              <span className="text-brand-yellow italic">Competitive Edge.</span>
            </motion.h2>
            <p className="text-blue-100/60 text-lg leading-relaxed max-w-xl">
              Since 2019, Work Supply has bridged the gap between labor shortages and professional 
              excellence. Our footprint across Europe ensures that no matter where you are, 
              quality manpower is just a call away.
            </p>
            
            <div className="pt-4">
              <button className="px-8 py-4 bg-brand-yellow text-brand-blue font-black rounded-2xl hover:bg-white transition-all transform hover:scale-105">
                Explore Our Journey
              </button>
            </div>
          </div>

          {/* ডান পাশ: স্ট্যাটস গ্রিড */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-8 bg-white/5 backdrop-blur-lg border border-white/10 rounded-[2.5rem] hover:bg-white/10 transition-all group"
              >
                <div className="mb-4">{stat.icon}</div>
                <div className="text-4xl font-black text-white mb-1 group-hover:text-brand-yellow transition-colors">
                  {stat.value}
                </div>
                <div className="text-sm font-bold text-brand-yellow uppercase tracking-widest mb-2">
                  {stat.label}
                </div>
                <p className="text-xs text-blue-100/40 leading-relaxed">
                  {stat.desc}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default GlobalStats;
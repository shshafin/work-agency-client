"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  Globe,
  Users,
  Zap,
  Scale,
  ArrowRight,
  ChevronRight,
} from "lucide-react";

const advantages = [
  {
    id: "01",
    title: "Global Reach",
    desc: "We maintain an active, high-velocity presence in 16+ countries across the European Union, bridging the gap between talent and demand.",
    icon: <Globe size={24} />,
    stat: "16+ Countries",
  },
  {
    id: "02",
    title: "Legal Security",
    desc: "Our operations are backed by 100% compliance with Portuguese labor laws, comprehensive insurance, and full tax transparency.",
    icon: <Scale size={24} />,
    stat: "100% Compliant",
  },
  {
    id: "03",
    title: "Professionalism",
    desc: "Every partnership is assigned a dedicated account manager to ensure seamless communication and operational excellence.",
    icon: <ShieldCheck size={24} />,
    stat: "24/7 Support",
  },
  {
    id: "04",
    title: "Diverse Talent",
    desc: "Access a massive pool of 2000+ specialized workers across 8 industrial sectors, vetted for precision and reliability.",
    icon: <Users size={24} />,
    stat: "2k+ Workers",
  },
];

const Advantages = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-20 md:py-32 bg-brand-light relative overflow-hidden">
      {/* Background Decorative Text - Hidden on small mobile to avoid clutter */}
      <div className="absolute top-10 left-10 text-[15vw] font-black text-brand-blue/[0.02] select-none pointer-events-none leading-none hidden md:block">
        ADVANTAGE
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">
          {/* --- Left Content Area --- */}
          <div className="w-full lg:w-1/2 lg:sticky lg:top-32">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white border border-brand-blue/5 shadow-sm mb-6 md:mb-8">
              <span className="w-2 h-2 rounded-full bg-brand-yellow animate-pulse" />
              <span className="text-[10px] font-mono font-bold text-brand-blue uppercase tracking-[0.3em]">
                Strategic Edge
              </span>
            </motion.div>

            <h2 className="text-5xl md:text-8xl font-black text-brand-blue tracking-tighter leading-[0.85] mb-8 md:mb-12">
              Why <br className="hidden md:block" /> Partners{" "}
              <br className="hidden md:block" />
              <span className="text-brand-yellow">Trust Us.</span>
            </h2>

            {/* Desktop Only: Immersive Display Card */}
            <div className="relative h-[300px] w-full hidden lg:block">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-brand-blue p-10 rounded-[3rem] shadow-2xl shadow-brand-blue/20 relative overflow-hidden h-full flex flex-col justify-between">
                  <div className="absolute -right-10 -bottom-10 text-white/5 transform -rotate-12">
                    {React.cloneElement(
                      advantages[activeIndex].icon as React.ReactElement,
                      { size: 200 },
                    )}
                  </div>

                  <div className="relative z-10">
                    <span className="text-brand-yellow font-mono text-xl font-bold">
                      {advantages[activeIndex].id}
                    </span>
                    <h3 className="text-4xl font-black text-white mt-2">
                      {advantages[activeIndex].title}
                    </h3>
                  </div>

                  <div className="relative z-10 flex items-center justify-between">
                    <p className="text-blue-100/60 text-lg max-w-xs">
                      {advantages[activeIndex].desc}
                    </p>
                    <div className="text-right">
                      <p className="text-brand-yellow text-2xl font-black">
                        {advantages[activeIndex].stat}
                      </p>
                      <p className="text-white/40 text-[10px] uppercase font-bold tracking-widest">
                        Verified Data
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* --- Right Content Area: Interactive Mobile Stack --- */}
          <div className="w-full lg:w-1/2 space-y-4">
            {advantages.map((item, index) => (
              <button
                key={index}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => setActiveIndex(index)}
                className={`w-full text-left p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border transition-all duration-500 group flex flex-col gap-4 ${
                  activeIndex === index
                    ? "bg-white border-brand-yellow shadow-xl md:translate-x-4"
                    : "bg-transparent border-brand-blue/5 hover:border-brand-blue/20"
                }`}>
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-4 md:gap-6">
                    <div
                      className={`w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center transition-all duration-500 ${
                        activeIndex === index
                          ? "bg-brand-blue text-white"
                          : "bg-white text-brand-blue shadow-sm"
                      }`}>
                      {item.icon}
                    </div>
                    <div>
                      <h4
                        className={`text-lg md:text-xl font-black transition-colors ${
                          activeIndex === index
                            ? "text-brand-blue"
                            : "text-brand-blue/40"
                        }`}>
                        {item.title}
                      </h4>
                      {/* Mobile Only Stat Label */}
                      <p
                        className={`text-[10px] font-mono font-bold uppercase tracking-wider md:hidden ${
                          activeIndex === index ? "text-brand-yellow" : "hidden"
                        }`}>
                        {item.stat}
                      </p>
                    </div>
                  </div>
                  <ChevronRight
                    className={`transition-transform duration-500 ${
                      activeIndex === index
                        ? "text-brand-yellow rotate-90 scale-125"
                        : "text-brand-blue/10"
                    }`}
                  />
                </div>

                {/* Animated Description - Works perfectly on mobile tap */}
                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden">
                      <p className="text-sm md:text-base font-medium text-slate-500 leading-relaxed pr-4">
                        {item.desc}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            ))}

            {/* Final CTA Strip */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="pt-6 md:pt-8">
              <button className="w-full p-6 md:p-8 bg-brand-yellow rounded-[1.5rem] md:rounded-[2rem] flex items-center justify-between group overflow-hidden relative shadow-lg shadow-brand-yellow/10">
                <div className="relative z-10 text-left">
                  <h3 className="text-xl md:text-2xl font-black text-brand-blue leading-tight">
                    Start Your Journey
                  </h3>
                  <p className="text-brand-blue/60 text-[10px] md:text-sm font-bold uppercase tracking-widest mt-1">
                    Let&apos;s build excellence together
                  </p>
                </div>
                <div className="relative z-10 w-12 h-12 md:w-16 md:h-16 bg-brand-blue rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                  <ArrowRight size={20} />
                </div>
                {/* Decorative Background for CTA */}
                <div className="absolute top-0 right-0 w-24 md:w-32 h-full bg-white/10 skew-x-[30deg] translate-x-10" />
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Advantages;

"use client";

import React from "react";
import { motion } from "framer-motion";
import { Handshake, Star } from "lucide-react";

const partnerLogos = [
  "Partner 1",
  "Partner 2",
  "Partner 3",
  "Partner 4",
  "Partner 5",
  "Partner 6",
];

const Partners = () => {
  return (
    <section className="py-24 bg-brand-light relative overflow-hidden">
      {/* --- Background Elements --- */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-brand-blue/10 to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-brand-blue/10 to-transparent" />
      </div>

      <div className="container mx-auto px-6 mb-16">
        <div className="flex flex-col items-center justify-center text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/5 border border-brand-blue/10">
            <Star
              size={12}
              className="text-brand-yellow fill-brand-yellow"
            />
            <span className="text-[10px] font-mono font-bold text-brand-blue uppercase tracking-[0.3em]">
              Institutional Network
            </span>
          </motion.div>

          <h2 className="text-3xl md:text-5xl font-black text-brand-blue tracking-tighter max-w-2xl">
            Trusted by the Architects of <br />
            <span className="text-brand-yellow italic">
              Modern Infrastructure.
            </span>
          </h2>
        </div>
      </div>

      {/* --- Infinite Kinetic Slider --- */}
      <div className="relative group">
        {/* Left & Right Fading Masks (Makes it look premium) */}
        <div className="absolute inset-y-0 left-0 w-24 md:w-64 bg-gradient-to-r from-brand-light to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 md:w-64 bg-gradient-to-l from-brand-light to-transparent z-10 pointer-events-none" />

        <div className="flex overflow-hidden py-10 select-none">
          <motion.div
            animate={{ x: ["0%", "-100%"] }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            className="flex whitespace-nowrap gap-20 md:gap-40 items-center pr-20 md:pr-40">
            {[...partnerLogos, ...partnerLogos, ...partnerLogos].map(
              (logo, index) => (
                <div
                  key={index}
                  className="group/logo relative flex flex-col items-center justify-center">
                  {/* Visual Number Indicator (Small & Subtle) */}
                  <span className="absolute -top-6 left-0 font-mono text-[10px] text-brand-blue/20 font-bold">
                    PARTNER_0{(index % 6) + 1}
                  </span>

                  <span className="text-4xl md:text-7xl font-black text-brand-blue/5 group-hover/logo:text-brand-blue transition-all duration-700 cursor-default tracking-tighter uppercase italic transform group-hover/logo:scale-110">
                    {logo}
                  </span>

                  {/* Bottom Underline Effect */}
                  <div className="w-0 h-1 bg-brand-yellow group-hover/logo:w-full transition-all duration-500 rounded-full mt-2" />
                </div>
              ),
            )}
          </motion.div>
        </div>
      </div>

      {/* --- Status Footer --- */}
      <div className="container mx-auto px-6 mt-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-t border-brand-blue/5 pt-8">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-brand-blue rounded-lg text-white">
              <Handshake size={20} />
            </div>
            <p className="text-xs md:text-sm font-bold text-slate-400 max-w-[250px] leading-snug">
              Certified partnerships across 16+ EEA member states.
            </p>
          </div>

          <div className="flex gap-2">
            {[1, 2, 3, 4].map((dot) => (
              <div
                key={dot}
                className={`h-1.5 w-1.5 rounded-full ${dot === 1 ? "bg-brand-yellow" : "bg-brand-blue/10"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;

"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Target, Users2, Award, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const stats = [
  {
    icon: <ShieldCheck size={28} />,
    title: "Licensed Agency",
    desc: "Fully registered under CAE 78201-R4 for labor subcontracting.",
  },
  {
    icon: <Award size={28} />,
    title: "Strong Capital",
    desc: "A solid foundation with a social capital of €250,000.00.",
  },
  {
    icon: <Target size={28} />,
    title: "Expert Sourcing",
    desc: "Professional search and placement at all domains.",
  },
  {
    icon: <Users2 size={28} />,
    title: "Human Management",
    desc: "Specialized in professional human resource management.",
  },
];

const StatsAndLegal = () => {
  return (
    <section className="py-16 md:py-24 bg-[#FDFDFD] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-yellow/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* সেকশন হেডার (Mobile Optimized) */}
        <div className="max-w-4xl mb-12 md:mb-20 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center md:justify-start gap-2 mb-4">
            <div className="h-0.5 w-8 bg-brand-yellow" />
            <span className="text-[10px] font-black text-brand-blue uppercase tracking-[0.3em]">
              Legal Standing
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-6xl font-black text-brand-blue mb-6 leading-[1.1] tracking-tighter">
            A Foundation of <br />
            <span className="text-brand-yellow">Reliability & Trust.</span>
          </motion.h2>
          <p className="text-gray-500 text-base md:text-xl max-w-2xl font-medium leading-relaxed">
            EQUAÇÕES RAZOÁVEIS operates with full transparency and legal
            compliance in Portugal, ensuring maximum protection.
          </p>
        </div>

        {/* গ্রিড কার্ডস (Premium Glass Look) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="p-6 md:p-8 rounded-[2rem] bg-white border border-gray-100 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.05)] hover:border-brand-yellow/50 transition-all duration-500 group relative overflow-hidden">
              {/* Hover Glow */}
              <div className="absolute inset-0 bg-linear-to-br from-brand-yellow/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="mb-6 w-14 h-14 rounded-2xl bg-brand-light flex items-center justify-center text-brand-yellow group-hover:bg-brand-yellow group-hover:text-brand-blue transition-all duration-500 shadow-inner">
                {item.icon}
              </div>
              <h3 className="text-lg md:text-xl font-black text-brand-blue mb-3 group-hover:text-brand-yellow transition-colors">
                {item.title}
              </h3>
              <p className="text-gray-500 text-xs md:text-sm font-medium leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* লিগ্যাল ইনফো বক্স (Ultra Mobile Optimized) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-12 md:mt-20 p-1 md:p-2 bg-brand-blue rounded-[2rem] md:rounded-[3rem] shadow-2xl shadow-brand-blue/30">
          <div className="bg-white/5 backdrop-blur-md rounded-[1.8rem] md:rounded-[2.8rem] p-6 md:p-10 flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12">
            <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left w-full lg:w-auto">
              <div className="w-16 h-16 rounded-3xl bg-white/10 flex items-center justify-center shadow-xl border border-white/10 shrink-0">
                <ShieldCheck
                  className="text-brand-yellow"
                  size={32}
                />
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black text-blue-200 uppercase tracking-widest">
                  Official Registration
                </p>
                <p className="text-xl md:text-3xl font-black text-white italic">
                  NIF 519138716
                </p>
              </div>
            </div>

            <div className="hidden lg:block h-16 w-px bg-white/10" />

            <div className="text-center md:text-left space-y-1">
              <p className="text-[10px] font-black text-blue-200 uppercase tracking-widest">
                Global Head Office
              </p>
              <p className="text-sm md:text-base font-bold text-white/90">
                Avenida Padre Alberto Neto, nº 19, 2º dto,{" "}
                <br className="hidden md:block" /> Sintra, Lisbon - 2635 346
              </p>
            </div>

            <Link
              href="/contact"
              className="group w-full lg:w-auto bg-brand-yellow text-brand-blue px-8 py-4 rounded-2xl font-black text-sm md:text-base flex items-center justify-center gap-2 hover:bg-white transition-all duration-300 shadow-xl shadow-brand-yellow/20">
              Verify Documents
              <ArrowUpRight
                size={18}
                className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
              />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsAndLegal;

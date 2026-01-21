"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Users,
  Zap,
  Search,
  ClipboardCheck,
  ArrowUpRight,
} from "lucide-react";

const services = [
  {
    title: "Search & Selection",
    desc: "Rigorous vetting process to find the perfect match for your industry needs.",
    icon: (
      <Search
        className="group-hover:text-white transition-colors"
        size={28}
      />
    ),
    color: "bg-blue-500",
  },
  {
    title: "Labour Subcontracting",
    desc: "Legal supply of personnel hired and paid by us, reducing your burden.",
    icon: (
      <ClipboardCheck
        className="group-hover:text-white transition-colors"
        size={28}
      />
    ),
    color: "bg-orange-500",
  },
  {
    title: "HR Consultancy",
    desc: "Expert advice on planning, organization, and human resource management.",
    icon: (
      <Users
        className="group-hover:text-white transition-colors"
        size={28}
      />
    ),
    color: "bg-emerald-500",
  },
  {
    title: "Operational Assistance",
    desc: "Support in safety, hygiene, and organizational control for your workforce.",
    icon: (
      <Zap
        className="group-hover:text-white transition-colors"
        size={28}
      />
    ),
    color: "bg-purple-500",
  },
];

const CoreServices = () => {
  return (
    <section className="py-32 bg-[#FDFDFD] relative overflow-hidden">
      {/* --- Aesthetic Background Elements --- */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50/50 -skew-x-12 translate-x-20 pointer-events-none" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand-yellow/5 rounded-full blur-[100px]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-20 items-start">
          {/* --- Left Side: Content --- */}
          <div className="lg:sticky lg:top-32 flex-1 space-y-10">
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-3 bg-white shadow-sm border border-slate-100 px-5 py-2 rounded-full">
                <div className="w-2 h-2 rounded-full bg-brand-yellow animate-pulse" />
                <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-[0.3em]">
                  Premium Solutions
                </span>
              </motion.div>

              <h2 className="text-5xl md:text-7xl font-black text-[#0A192F] leading-[0.95] tracking-tighter">
                Elevating <br />
                Business{" "}
                <span className="text-brand-yellow italic">Potential.</span>
              </h2>

              <p className="text-slate-500 text-lg md:text-xl leading-relaxed max-w-xl">
                Equações Razoáveis is more than an agency. We are a fully
                licensed partner architecting the future of Portuguese workforce
                solutions.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
              {[
                "Full Legal Compliance",
                "Expert Industry Knowledge",
                "Fast & Reliable Sourcing",
                "Scalable Infrastructure",
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3 group cursor-default">
                  <div className="bg-brand-yellow/10 p-1 rounded-md group-hover:bg-brand-yellow transition-colors">
                    <CheckCircle2
                      className="text-brand-yellow group-hover:text-white transition-colors"
                      size={16}
                    />
                  </div>
                  <span className="font-bold text-slate-700 text-sm tracking-tight">
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>

            <button className="px-8 py-4 bg-[#0A192F] text-white rounded-2xl font-bold flex items-center gap-4 hover:bg-brand-yellow hover:text-[#0A192F] transition-all duration-300 group shadow-xl shadow-blue-900/10">
              Explore All Services
              <ArrowUpRight
                size={20}
                className="group-hover:rotate-45 transition-transform"
              />
            </button>
          </div>

          {/* --- Right Side: Staggered Cards --- */}
          <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 gap-6 pt-10 lg:pt-0">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`group relative p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_60px_-20px_rgba(0,0,0,0.1)] transition-all duration-500 ${
                  index % 2 !== 0 ? "md:translate-y-12" : ""
                }`}>
                {/* Decoration */}
                <div className="absolute top-6 right-8 opacity-0 group-hover:opacity-10 transition-opacity">
                  <ArrowUpRight size={40} />
                </div>

                <div
                  className={`mb-8 w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 bg-slate-50 group-hover:scale-110 group-hover:shadow-lg group-hover:bg-[#0A192F] text-slate-700 group-hover:text-white`}>
                  {service.icon}
                </div>

                <h3 className="text-2xl font-black text-[#0A192F] mb-4 tracking-tight">
                  {service.title}
                </h3>

                <p className="text-slate-500 text-sm leading-relaxed mb-6">
                  {service.desc}
                </p>

                <div className="w-12 h-1 bg-slate-100 rounded-full group-hover:w-full group-hover:bg-brand-yellow transition-all duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoreServices;

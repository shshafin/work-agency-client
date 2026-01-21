"use client";

import React from "react";
import { motion } from "framer-motion";
import { Search, UserCheck, Handshake, FileCheck } from "lucide-react";

const steps = [
  {
    title: "Needs Assessment",
    desc: "We analyze your specific industry requirements and workforce gaps.",
    icon: <Search size={24} />,
    color: "bg-blue-500",
  },
  {
    title: "Selection & Vetting",
    desc: "Rigorous screening and background checks for every candidate.",
    icon: <UserCheck size={24} />,
    color: "bg-brand-yellow",
  },
  {
    title: "Legal Contracting",
    desc: "Handling all Portuguese labor laws, insurance, and payroll.",
    icon: <FileCheck size={24} />,
    color: "bg-brand-blue",
  },
  {
    title: "Onboarding",
    desc: "Seamless integration of workers into your operational workflow.",
    icon: <Handshake size={24} />,
    color: "bg-orange-500",
  },
];

const Process = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="max-w-3xl mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 mb-4">
            <span className="w-12 h-0.5 bg-brand-yellow"></span>
            <span className="text-[10px] font-black text-brand-blue uppercase tracking-[0.4em]">
              Our Workflow
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-black text-brand-blue tracking-tighter leading-tight">
            How We Bridge the <br />
            <span className="text-gray-300">Talent Gap.</span>
          </h2>
        </div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative">
          {/* Decorative Connecting Line (Desktop Only) */}
          <div className="hidden lg:block absolute top-1/4 left-0 w-full h-0.5 bg-gray-100 -z-10" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group">
              <div className="mb-8 relative">
                <div
                  className={`w-16 h-16 ${step.color} rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:rotate-12 transition-transform duration-500 relative z-10`}>
                  {step.icon}
                </div>
                {/* Step Number Badge */}
                <div className="absolute -top-4 -right-2 w-10 h-10 bg-white border-4 border-gray-50 rounded-full flex items-center justify-center font-black text-brand-blue text-sm shadow-sm">
                  0{index + 1}
                </div>
              </div>

              <h3 className="text-2xl font-black text-brand-blue mb-4 group-hover:text-brand-yellow transition-colors">
                {step.title}
              </h3>
              <p className="text-gray-500 font-medium leading-relaxed text-sm">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;

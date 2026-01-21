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
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";

const industries = [
  {
    title: "Construction",
    desc: "Precision engineering & skilled labor for European infrastructure.",
    icon: <HardHat size={32} />,
    gradient: "from-orange-500/20 to-orange-500/5",
    border: "group-hover:border-orange-500/50",
    iconColor: "text-orange-500",
  },
  {
    title: "Agriculture",
    desc: "Modern farming & harvesting solutions for seasonal growth.",
    icon: <Wheat size={32} />,
    gradient: "from-green-500/20 to-green-500/5",
    border: "group-hover:border-green-500/50",
    iconColor: "text-green-500",
  },
  {
    title: "Logistics",
    desc: "Seamless supply chain staff for global warehouse operations.",
    icon: <Truck size={32} />,
    gradient: "from-blue-500/20 to-blue-500/5",
    border: "group-hover:border-blue-500/50",
    iconColor: "text-blue-500",
  },
  {
    title: "HoReCa",
    desc: "Excellence in hospitality & professional catering personnel.",
    icon: <ChefHat size={32} />,
    gradient: "from-red-500/20 to-red-500/5",
    border: "group-hover:border-red-500/50",
    iconColor: "text-red-500",
  },
  {
    title: "Production",
    desc: "Efficient workforce for manufacturing & factory assembly lines.",
    icon: <Factory size={32} />,
    gradient: "from-purple-500/20 to-purple-500/5",
    border: "group-hover:border-purple-500/50",
    iconColor: "text-purple-500",
  },
  {
    title: "General Labour",
    desc: "Versatile labor subcontracting for diverse industry needs.",
    icon: <Hammer size={32} />,
    gradient: "from-slate-500/20 to-slate-500/5",
    border: "group-hover:border-slate-500/50",
    iconColor: "text-slate-500",
  },
];

const Sectors = () => {
  return (
    <section className="py-24 bg-[#FBFCFE] relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 mb-4">
              <span className="w-12 h-[2px] bg-brand-yellow"></span>
              <span className="text-[10px] font-black text-brand-blue uppercase tracking-[0.4em]">
                Our Expertise
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-black text-brand-blue leading-tight tracking-tighter">
              Industry Sectors <br />
              <span className="text-gray-300">We Empower.</span>
            </motion.h2>
          </div>
          <Link
            href="/jobs"
            className="group flex items-center gap-3 text-brand-blue font-bold text-lg">
            See All Jobs
            <div className="p-2 bg-brand-blue text-white rounded-full group-hover:bg-brand-yellow group-hover:text-brand-blue transition-all">
              <ArrowUpRight size={20} />
            </div>
          </Link>
        </div>

        {/* Dynamic Industry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`group relative p-10 rounded-[3rem] bg-white border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.03)] transition-all duration-500 ${item.border}`}>
              {/* Animated Gradient Background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[3rem]`}
              />

              <div className="relative z-10">
                <div
                  className={`w-16 h-16 rounded-2xl bg-white shadow-xl flex items-center justify-center ${item.iconColor} mb-8 transition-transform group-hover:rotate-12 group-hover:scale-110`}>
                  {item.icon}
                </div>

                <h3 className="text-2xl font-black text-brand-blue mb-4 flex items-center gap-2">
                  {item.title}
                  <ArrowUpRight
                    className="opacity-0 group-hover:opacity-100 transition-all text-brand-yellow"
                    size={20}
                  />
                </h3>
                <p className="text-gray-500 font-medium leading-relaxed">
                  {item.desc}
                </p>

                <div className="mt-8 pt-8 border-t border-gray-50 flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                    CAE Certified
                  </span>
                  <div className="h-1.5 w-1.5 rounded-full bg-brand-yellow"></div>
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

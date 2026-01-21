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
    desc: "Skilled labor for European infrastructure projects.",
    icon: <HardHat size={24} />,
    bgColor: "bg-orange-50",
    iconColor: "text-orange-600",
    borderColor: "hover:border-orange-200",
  },
  {
    title: "Agriculture",
    desc: "Modern farming & seasonal harvesting solutions.",
    icon: <Wheat size={24} />,
    bgColor: "bg-green-50",
    iconColor: "text-green-600",
    borderColor: "hover:border-green-200",
  },
  {
    title: "Logistics",
    desc: "Seamless supply chain and warehouse operations.",
    icon: <Truck size={24} />,
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600",
    borderColor: "hover:border-blue-200",
  },
  {
    title: "HoReCa",
    desc: "Excellence in hospitality & catering personnel.",
    icon: <ChefHat size={24} />,
    bgColor: "bg-red-50",
    iconColor: "text-red-600",
    borderColor: "hover:border-red-200",
  },
  {
    title: "Production",
    desc: "Efficient workforce for manufacturing units.",
    icon: <Factory size={24} />,
    bgColor: "bg-purple-50",
    iconColor: "text-purple-600",
    borderColor: "hover:border-purple-200",
  },
  {
    title: "General Labour",
    desc: "Versatile labor for diverse industry needs.",
    icon: <Hammer size={24} />,
    bgColor: "bg-slate-50",
    iconColor: "text-slate-600",
    borderColor: "hover:border-slate-200",
  },
];

const Sectors = () => {
  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        {/* Centered Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-4 bg-brand-blue/5 px-4 py-1.5 rounded-full">
            <span className="text-[10px] font-black text-brand-blue uppercase tracking-[0.3em]">
              Industry Sectors
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black text-brand-blue leading-tight tracking-tighter">
            Specialized Workforce <br />
            <span className="text-brand-yellow italic">
              For Every Industry.
            </span>
          </motion.h2>
        </div>

        {/* Compact Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {industries.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className={`group relative p-6 md:p-8 rounded-[2rem] ${item.bgColor} border border-transparent transition-all duration-300 ${item.borderColor} flex flex-col items-start`}>
              {/* Icon Circle */}
              <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center mb-6 transition-transform group-hover:scale-110">
                <div className={item.iconColor}>{item.icon}</div>
              </div>

              <div className="flex-grow">
                <h3 className="text-xl font-black text-brand-blue mb-2 group-hover:text-brand-yellow transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-xs md:text-sm font-medium leading-relaxed mb-6">
                  {item.desc}
                </p>
              </div>

              <Link
                href={`/jobs?sector=${item.title.toLowerCase()}`}
                className="inline-flex items-center gap-2 text-xs font-bold text-brand-blue group-hover:gap-3 transition-all">
                View Jobs <ArrowUpRight size={14} />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sectors;

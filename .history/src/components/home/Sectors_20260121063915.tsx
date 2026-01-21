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
    desc: "Skilled masons, engineers, and general laborers for infrastructure projects.",
    icon: <HardHat size={32} />,
    color: "bg-orange-500",
  },
  {
    title: "Agriculture",
    desc: "Experienced seasonal workers for harvesting and farm management.",
    icon: <Wheat size={32} />,
    color: "bg-green-600",
  },
  {
    title: "Logistics",
    desc: "Reliable warehouse staff and drivers for seamless supply chain operations.",
    icon: <Truck size={32} />,
    color: "bg-blue-600",
  },
  {
    title: "HoReCa",
    desc: "Professional staff for hotels, restaurants, and catering services.",
    icon: <ChefHat size={32} />,
    color: "bg-red-500",
  },
  {
    title: "Production",
    desc: "Efficient workers for factory lines and manufacturing units.",
    icon: <Factory size={32} />,
    color: "bg-purple-600",
  },
  {
    title: "General Labour",
    desc: "Versatile workforce for various subcontracting needs across industries.",
    icon: <Hammer size={32} />,
    color: "bg-gray-700",
  },
];

const Sectors = () => {
  return (
    <section className="py-20 bg-[#F8FAFC]">
      <div className="container mx-auto px-4 md:px-6">
        {/* সেকশন হেডার */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-brand-yellow font-black uppercase tracking-[0.3em] text-xs mb-4">
            Industries We Serve
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-brand-blue mb-6 tracking-tighter">
            Specialized Workforce for <br className="hidden md:block" /> Every
            Sector.
          </motion.h2>
        </div>

        {/* ইন্ডাস্ট্রি গ্রিড */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden">
              {/* ব্যাকগ্রাউন্ড ডেকোরেশন */}
              <div
                className={`absolute -right-8 -top-8 w-32 h-32 ${item.color} opacity-[0.03] rounded-full group-hover:scale-150 transition-transform duration-700`}
              />

              <div
                className={`w-16 h-16 rounded-2xl ${item.color} text-white flex items-center justify-center mb-8 shadow-lg shadow-gray-200 group-hover:rotate-6 transition-transform`}>
                {item.icon}
              </div>

              <h3 className="text-2xl font-black text-brand-blue mb-4">
                {item.title}
              </h3>
              <p className="text-gray-500 text-sm font-medium leading-relaxed mb-8">
                {item.desc}
              </p>

              <Link
                href={`/jobs?category=${item.title.toLowerCase()}`}
                className="flex items-center gap-2 text-sm font-bold text-brand-blue group-hover:text-brand-yellow transition-colors">
                View Vacancies{" "}
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-2 transition-transform"
                />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* কল টু অ্যাকশন বাটন (নিচে) */}
        <div className="mt-16 text-center">
          <Link
            href="/jobs"
            className="inline-flex items-center gap-3 bg-brand-blue text-white px-10 py-5 rounded-full font-black text-lg hover:bg-brand-yellow hover:text-brand-blue transition-all shadow-xl shadow-brand-blue/20">
            Explore All Opportunities
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Sectors;

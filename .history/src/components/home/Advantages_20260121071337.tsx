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
} from "lucide-react";

const advantages = [
  {
    title: "Global Reach",
    desc: "Active presence in 16+ countries across the European Union.",
    icon: (
      <Globe
        className="text-brand-blue"
        size={24}
      />
    ),
    size: "lg:col-span-2",
  },
  {
    title: "Legal Security",
    desc: "100% compliance with Portuguese labor laws & insurance.",
    icon: (
      <Scale
        className="text-brand-blue"
        size={24}
      />
    ),
    size: "lg:col-span-1",
  },
  {
    title: "Professionalism",
    desc: "Dedicated account managers for every partner.",
    icon: (
      <ShieldCheck
        className="text-brand-blue"
        size={24}
      />
    ),
    size: "lg:col-span-1",
  },
  {
    title: "Diverse Talent",
    desc: "Access to 2000+ specialized workers across 8 sectors.",
    icon: (
      <Users
        className="text-brand-blue"
        size={24}
      />
    ),
    size: "lg:col-span-1",
  },
  {
    title: "Fast Deployment",
    desc: "Quick mobilization of workers to meet urgent needs.",
    icon: (
      <Zap
        className="text-brand-blue"
        size={24}
      />
    ),
    size: "lg:col-span-1",
  },
];

const Advantages = () => {
  return (
    <section className="py-24 bg-[#F8FAFC]">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-brand-yellow font-black uppercase tracking-[0.4em] text-[10px] mb-4">
            Why Partner With Us
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-black text-brand-blue tracking-tighter leading-tight">
            Strategic Advantages of <br />
            <span className="text-brand-yellow italic">Working with Us.</span>
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {advantages.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`${item.size} group relative bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden`}>
              {/* Background Icon Watermark */}
              <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:scale-125 transition-transform duration-700">
                {item.icon}
              </div>

              <div className="flex flex-col h-full justify-between gap-6">
                <div className="w-12 h-12 rounded-2xl bg-brand-light flex items-center justify-center group-hover:bg-brand-yellow transition-colors duration-500">
                  {item.icon}
                </div>

                <div className="space-y-3">
                  <h3 className="text-2xl font-black text-brand-blue group-hover:text-brand-yellow transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-sm font-medium leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Last Card - Special CTA style */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="lg:col-span-1 bg-brand-blue p-8 rounded-[2.5rem] flex flex-col justify-center items-center text-center gap-6">
            <HeartHandshake
              className="text-brand-yellow"
              size={48}
            />
            <h3 className="text-2xl font-black text-white">
              Ready to <br /> Start?
            </h3>
            <button className="bg-brand-yellow text-brand-blue px-6 py-3 rounded-full font-black text-sm hover:bg-white transition-colors">
              Contact Us
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Advantages;

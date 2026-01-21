"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Target, Users2, Award } from "lucide-react";

const stats = [
  {
    icon: (
      <ShieldCheck
        className="text-brand-yellow"
        size={32}
      />
    ),
    title: "Licensed Agency",
    desc: "Fully registered under CAE 78201-R4 for labor subcontracting.",
  },
  {
    icon: (
      <Award
        className="text-brand-yellow"
        size={32}
      />
    ),
    title: "Strong Capital",
    desc: "A solid foundation with a registered social capital of €250,000.00.",
  },
  {
    icon: (
      <Target
        className="text-brand-yellow"
        size={32}
      />
    ),
    title: "Expert Sourcing",
    desc: "Professional search, selection, and placement at all domains.",
  },
  {
    icon: (
      <Users2
        className="text-brand-yellow"
        size={32}
      />
    ),
    title: "Human Management",
    desc: "Specialized in training and professional human resource management.",
  },
];

const StatsAndLegal = () => {
  return (
    <section className="py-20 bg-white relative">
      <div className="container mx-auto px-6">
        {/* সেকশন হেডার */}
        <div className="max-w-3xl mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-brand-blue mb-6 leading-tight">
            A Foundation of <br />
            <span className="text-brand-yellow">Reliability & Trust.</span>
          </motion.h2>
          <p className="text-gray-500 text-lg">
            EQUAÇÕES RAZOÁVEIS operates with full transparency and legal
            compliance in Portugal, ensuring both businesses and workers are
            protected.
          </p>
        </div>

        {/* গ্রিড কার্ডস */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="p-8 rounded-[2.5rem] bg-[#F8FAFC] border border-gray-100 hover:border-brand-yellow/30 transition-all duration-300 shadow-sm hover:shadow-xl group">
              <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-brand-blue mb-3">
                {item.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* নিচের ছোট লিগ্যাল ফুটার (সেকশন এর ভেতরেই) */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-16 p-6 bg-brand-blue rounded-3xl text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
              <ShieldCheck
                className="text-brand-yellow"
                size={24}
              />
            </div>
            <div>
              <p className="text-xs font-bold text-blue-200 uppercase tracking-widest">
                Official Registration
              </p>
              <p className="text-lg font-bold">NIF/NIPC: 519138716</p>
            </div>
          </div>
          <div className="h-10 w-px bg-white/10 hidden md:block" />
          <div className="text-center md:text-left">
            <p className="text-xs font-bold text-blue-200 uppercase tracking-widest">
              Head Office
            </p>
            <p className="text-sm font-medium">
              Avenida Padre Alberto Neto, nº 19, Sintra, Lisbon
            </p>
          </div>
          <Link
            href="/contact"
            className="bg-brand-yellow text-brand-blue px-6 py-3 rounded-full font-bold text-sm hover:bg-white transition-colors">
            Verify Documents
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsAndLegal;

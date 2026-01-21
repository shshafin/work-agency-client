"use client";

import React from "react";

import { motion } from "framer-motion";

import {
  CheckCircle2,
  ShieldCheck,
  Users,
  Zap,
  Search,
  ClipboardCheck,
} from "lucide-react";

const services = [
  {
    title: "Search & Selection",

    desc: "Rigorous vetting process to find the perfect match for your specific industry needs.",

    icon: (
      <Search
        className="text-brand-yellow"
        size={32}
      />
    ),
  },

  {
    title: "Labour Subcontracting",

    desc: "Legal supply of personnel hired and paid by us, reducing your administrative burden.",

    icon: (
      <ClipboardCheck
        className="text-brand-yellow"
        size={32}
      />
    ),
  },

  {
    title: "HR Consultancy",

    desc: "Expert advice on planning, organization, and human resource management.",

    icon: (
      <Users
        className="text-brand-yellow"
        size={32}
      />
    ),
  },

  {
    title: "Operational Assistance",

    desc: "Support in safety, hygiene, and organizational control for your workforce.",

    icon: (
      <Zap
        className="text-brand-yellow"
        size={32}
      />
    ),
  },
];

const CoreServices = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* ১. বাম পাশ: টেক্সট কন্টেন্ট */}

          <div className="flex-1 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-brand-blue/5 px-4 py-2 rounded-full">
              <ShieldCheck
                size={16}
                className="text-brand-blue"
              />

              <span className="text-xs font-black text-brand-blue uppercase tracking-widest">
                Our Commitment
              </span>
            </motion.div>

            <h2 className="text-4xl md:text-6xl font-black text-brand-blue leading-tight tracking-tighter">
              A Partner You Can <br />
              <span className="text-brand-yellow italic">Rely On.</span>
            </h2>

            <p className="text-gray-500 text-lg md:text-xl leading-relaxed">
              Equações Razoáveis isn&apos;t just a recruitment agency. We are a
              fully licensed Portuguese entity providing end-to-end personnel
              solutions.
            </p>

            <div className="space-y-4">
              {[
                "Full Legal Compliance",
                "Expert Industry Knowledge",
                "Fast & Reliable Sourcing",
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3">
                  <CheckCircle2
                    className="text-brand-yellow"
                    size={20}
                  />

                  <span className="font-bold text-brand-blue">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ২. ডান পাশ: সার্ভিস গ্রিড (Modern Bento Style) */}

          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
            {services.map((service, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10 }}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 bg-[#F8FAFC] border border-gray-100 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:bg-brand-blue group transition-all duration-500">
                <div className="mb-6 bg-white w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm group-hover:bg-brand-yellow transition-colors">
                  {service.icon}
                </div>

                <h3 className="text-xl font-black text-brand-blue mb-3 group-hover:text-white transition-colors">
                  {service.title}
                </h3>

                <p className="text-gray-500 text-sm leading-relaxed group-hover:text-blue-100/70 transition-colors">
                  {service.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoreServices;

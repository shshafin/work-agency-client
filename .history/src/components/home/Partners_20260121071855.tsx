"use client";

import React from "react";
import { motion } from "framer-motion";
import { Handshake } from "lucide-react";

// লোগো স্লাইডারের জন্য ডামি ডেটা (পরে রিয়েল লোগো দিয়ে রিপ্লেস করবি)
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
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-6 mb-12 text-center md:text-left">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="p-3 bg-brand-yellow/10 rounded-2xl text-brand-yellow">
            <Handshake size={24} />
          </div>
          <h3 className="text-2xl font-black text-brand-blue tracking-tighter italic">
            Trusted by Industry Leaders across Europe.
          </h3>
        </div>
      </div>

      {/* ইনফিনিট লুপ স্লাইডার */}
      <div className="relative flex overflow-x-hidden border-y border-gray-100 py-10">
        <motion.div
          animate={{ x: ["0%", "-100%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap gap-16 md:gap-32 items-center">
          {/* লোগো লিস্ট - দুইবার ডুপ্লিকেট করা হয়েছে লুপ স্মুথ রাখার জন্য */}
          {[...partnerLogos, ...partnerLogos].map((logo, index) => (
            <span
              key={index}
              className="text-3xl md:text-5xl font-black text-gray-200 hover:text-brand-blue transition-colors cursor-default tracking-tighter uppercase italic">
              {logo}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Partners;

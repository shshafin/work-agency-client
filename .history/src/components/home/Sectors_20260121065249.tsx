"use client";

import React, { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
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
    desc: "Building the future of Europe with precision & power.",
    icon: <HardHat size={32} />,
    accent: "#f97316",
    shape: "rounded-tr-[80px] rounded-bl-[80px] rounded-tl-2xl rounded-br-2xl",
  },
  {
    title: "Agriculture",
    desc: "Connecting skilled farmers to the heart of nature.",
    icon: <Wheat size={32} />,
    accent: "#22c55e",
    shape: "rounded-tl-[80px] rounded-br-[80px] rounded-tr-2xl rounded-bl-2xl",
  },
  {
    title: "Logistics",
    desc: "Driving global supply chains with expert coordination.",
    icon: <Truck size={32} />,
    accent: "#3b82f6",
    shape: "rounded-tr-[80px] rounded-bl-[80px] rounded-tl-2xl rounded-br-2xl",
  },
  {
    title: "HoReCa",
    desc: "Excellence in hospitality & professional services.",
    icon: <ChefHat size={32} />,
    accent: "#ef4444",
    shape: "rounded-tl-[80px] rounded-br-[80px] rounded-tr-2xl rounded-bl-2xl",
  },
  {
    title: "Production",
    desc: "Optimizing manufacturing lines with elite personnel.",
    icon: <Factory size={32} />,
    accent: "#a855f7",
    shape: "rounded-tr-[80px] rounded-bl-[80px] rounded-tl-2xl rounded-br-2xl",
  },
  {
    title: "General Labour",
    desc: "Versatile labor solutions for complex industry needs.",
    icon: <Hammer size={32} />,
    accent: "#94a3b8",
    shape: "rounded-tl-[80px] rounded-br-[80px] rounded-tr-2xl rounded-bl-2xl",
  },
];

const Card = ({
  item,
  index,
}: {
  item: (typeof industries)[0];
  index: number;
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), {
    stiffness: 150,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), {
    stiffness: 150,
    damping: 20,
  });

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    mouseX.set((clientX - left) / width - 0.5);
    mouseY.set((clientY - top) / height - 0.5);
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={onMouseMove}
      onMouseLeave={() => {
        mouseX.set(0);
        mouseY.set(0);
      }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative group cursor-pointer">
      {/* Background Glow */}
      <div
        className="absolute -inset-2 rounded-[2.6rem] opacity-0 group-hover:opacity-20 blur-2xl transition duration-500"
        style={{ backgroundColor: item.accent }}
      />

      <div
        className={`relative h-full ${item.shape} bg-[#0f172a]/90 border border-white/10 p-10 overflow-hidden transition-all duration-500 group-hover:border-white/30 backdrop-blur-xl`}>
        {/* Animated Gradient Border Overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-[-100%] animate-[spin_5s_linear_infinite] bg-[conic-gradient(from_0deg,transparent,white,transparent)] opacity-20" />
        </div>

        <div
          className="relative z-10"
          style={{ transform: "translateZ(50px)" }}>
          <div
            className="w-16 h-16 mb-8 flex items-center justify-center rounded-2xl text-white shadow-2xl transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6"
            style={{
              backgroundColor: `${item.accent}20`,
              border: `1px solid ${item.accent}40`,
            }}>
            {item.icon}
          </div>

          <h3 className="text-3xl font-black text-white mb-4 tracking-tighter">
            {item.title}
          </h3>

          <p className="text-slate-400 font-medium leading-relaxed mb-8">
            {item.desc}
          </p>

          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 text-white font-bold group/link uppercase text-[10px] tracking-[0.2em]">
            View Opportunities
            <div className="w-8 h-[2px] bg-white/20 group-hover/link:w-12 group-hover/link:bg-white transition-all duration-300" />
            <ArrowRight
              size={16}
              className="group-hover/link:translate-x-2 transition-transform"
            />
          </Link>
        </div>

        {/* Decorative Element */}
        <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
          {React.cloneElement(
            item.icon as React.ReactElement,
            { size: 120 } as any,
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Sectors = () => {
  return (
    <section className="py-32 bg-[#020617] relative overflow-hidden">
      {/* --- Background Effects --- */}
      <div className="absolute inset-0 z-0">
        {/* Modern Grid/Wireframe */}
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Radial Lighting */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-125 h-[500px] bg-orange-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-brand-yellow font-bold uppercase tracking-[0.4em] text-xs mb-4 block">
              Industry Leaders
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none">
              We Build <br /> <span className="text-slate-500">The Modern</span>{" "}
              World.
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-slate-400 max-w-xs text-sm font-medium border-l border-white/10 pl-6">
            Leveraging elite talent across 6 core sectors to drive European
            industrial growth.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 perspective-1000">
          {industries.map((item, index) => (
            <Card
              key={index}
              item={item}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sectors;

"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Globe2, Users2, Building2, Briefcase, Plus } from "lucide-react";

const stats = [
  {
    label: "Global Presence",
    value: 16,
    suffix: "+",
    icon: <Globe2 size={24} />,
    desc: "Expanding footprint across EU & EEA zones.",
    color: "from-blue-500 to-cyan-400",
  },
  {
    label: "Active Workforce",
    value: 2000,
    suffix: "+",
    icon: <Users2 size={24} />,
    desc: "Elite professionals driving excellence.",
    color: "from-orange-500 to-brand-yellow",
  },
  {
    label: "Industries",
    value: 8,
    suffix: "",
    icon: <Briefcase size={24} />,
    desc: "Specialized solutions for every sector.",
    color: "from-purple-500 to-pink-500",
  },
  {
    label: "Partner Network",
    value: 150,
    suffix: "+",
    icon: <Building2 size={24} />,
    desc: "Trusted by industry leaders globally.",
    color: "from-emerald-500 to-teal-400",
  },
];

const Counter = ({ value, suffix }: { value: number; suffix: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
};

const GlobalStats = () => {
  return (
    <section className="py-32 bg-[#050B1A] relative overflow-hidden">
      {/* --- Dynamic Background Elements --- */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-yellow/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
        {/* Tech Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.826 10.558c1.026 0 1.858-.832 1.858-1.858 0-1.026-.832-1.858-1.858-1.858-1.026 0-1.858.832-1.858 1.858 0 1.026.832 1.858 1.858 1.858zM2.72 4.93C1.694 4.93.862 4.098.862 3.072 0 2.046.832 1.214 1.858 1.214c1.026 0 1.858.832 1.858 1.858 0 1.026-.832 1.858-1.858 1.858z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3C/path%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* --- Left Side: Content --- */}
          <div className="lg:col-span-5 space-y-10">
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-yellow opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-yellow"></span>
                </span>
                <span className="text-[10px] font-mono font-bold text-white uppercase tracking-[0.3em]">
                  Live Global Metrics
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-5xl md:text-7xl font-black text-white leading-[0.9] tracking-tighter">
                Our Growth <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow via-orange-400 to-yellow-200 italic">
                  Is Your Edge.
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-slate-400 text-lg leading-relaxed max-w-xl">
                Engineering the bridge between industrial demand and
                professional excellence. Our metrics reflect a legacy of trust
                and logistical precision across Europe.
              </motion.p>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <button className="group relative px-8 py-4 bg-white text-[#050B1A] font-black rounded-2xl overflow-hidden transition-all active:scale-95">
                <span className="relative z-10 flex items-center gap-2">
                  Our Mission{" "}
                  <Plus
                    size={18}
                    className="group-hover:rotate-90 transition-transform duration-300"
                  />
                </span>
                <div className="absolute inset-0 bg-brand-yellow translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </button>
              <button className="px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-2xl hover:bg-white/10 transition-all">
                Partner with Us
              </button>
            </div>
          </div>

          {/* --- Right Side: Stats Grid --- */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative p-px rounded-[2.5rem] bg-gradient-to-b from-white/20 to-transparent hover:from-brand-yellow/50 transition-all duration-500">
                <div className="h-full bg-[#0A1121]/90 backdrop-blur-xl p-8 rounded-[2.4rem] relative overflow-hidden">
                  {/* Icon with glow */}
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white mb-8 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                    {stat.icon}
                  </div>

                  <div className="relative z-10">
                    <div className="text-5xl font-black text-white mb-2 tracking-tighter">
                      <Counter
                        value={stat.value}
                        suffix={stat.suffix}
                      />
                    </div>
                    <div className="text-xs font-mono font-bold text-brand-yellow uppercase tracking-[0.2em] mb-4">
                      {stat.label}
                    </div>
                    <p className="text-slate-500 text-xs leading-relaxed font-medium">
                      {stat.desc}
                    </p>
                  </div>

                  {/* Abstract card bg element */}
                  <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/[0.02] rounded-full group-hover:bg-white/[0.05] transition-colors" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlobalStats;

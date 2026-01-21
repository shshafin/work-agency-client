import React from "react";
import { Wrench, Clock } from "lucide-react";

const page = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-blue via-blue-900 to-black px-6">
      <div className="max-w-xl w-full text-center bg-white/10 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl">
        {/* Icon */}
        <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-6 rounded-full bg-brand-yellow flex items-center justify-center shadow-lg">
          <Wrench
            className="text-brand-blue"
            size={32}
          />
        </div>

        {/* Heading */}
        <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
          Worker Request Page
        </h1>

        {/* Status */}
        <p className="mt-3 text-sm md:text-base text-white/70 font-medium">
          This page is currently under maintenance
        </p>

        {/* Divider */}
        <div className="flex items-center justify-center gap-3 my-6">
          <span className="h-px w-16 bg-white/30" />
          <Clock
            size={16}
            className="text-white/50"
          />
          <span className="h-px w-16 bg-white/30" />
        </div>

        {/* Coming soon */}
        <p className="text-[11px] md:text-sm uppercase tracking-[0.3em] text-brand-yellow font-bold">
          Coming Soon
        </p>

        {/* Sub text */}
        <p className="mt-4 text-xs md:text-sm text-white/60 leading-relaxed">
          We are working hard to bring you a seamless worker request experience.
          Please check back soon.
        </p>

        {/* Button */}
        <div className="mt-8">
          <a
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl
            bg-brand-yellow text-brand-blue font-extrabold text-xs uppercase tracking-widest
            hover:scale-105 transition-transform shadow-lg">
            Go Back Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default page;

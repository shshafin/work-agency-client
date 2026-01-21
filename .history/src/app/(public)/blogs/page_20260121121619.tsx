import React from "react";
import { Newspaper, Clock } from "lucide-react";
import Link from "next/link";

const page = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 px-6">
      <div className="max-w-2xl w-full text-center bg-white rounded-3xl p-8 md:p-12 border border-gray-200 shadow-xl">
        {/* Icon */}
        <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-6 rounded-full bg-black flex items-center justify-center">
          <Newspaper
            className="text-white"
            size={32}
          />
        </div>

        {/* Heading */}
        <h1 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">
          News Articles
        </h1>

        {/* Status */}
        <p className="mt-3 text-sm md:text-base text-gray-500 font-medium">
          Our newsroom is currently under preparation
        </p>

        {/* Divider */}
        <div className="flex items-center justify-center gap-3 my-6">
          <span className="h-px w-20 bg-gray-300" />
          <Clock
            size={16}
            className="text-gray-400"
          />
          <span className="h-px w-20 bg-gray-300" />
        </div>

        {/* Coming Soon */}
        <p className="text-[11px] md:text-sm uppercase tracking-[0.35em] text-gray-700 font-bold">
          Coming Soon
        </p>

        {/* Sub text */}
        <p className="mt-4 text-xs md:text-sm text-gray-600 leading-relaxed max-w-lg mx-auto">
          We are crafting high-quality news articles, insights, and updates for
          you. Stay tuned for trustworthy and impactful stories.
        </p>

        {/* Button */}
        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl
            bg-black text-white font-extrabold text-xs uppercase tracking-widest
            hover:scale-105 transition-transform shadow-lg">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;

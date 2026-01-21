/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useEffect, useState } from "react";
import { JobService } from "@/services/JobService";
import {
  MapPin,
  Briefcase,
  CheckCircle2,
  ChevronLeft,
  Loader2,
  Euro,
  Calendar,
  ArrowRight,
  Share2,
  X,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { motion } from "framer-motion";

const PublicJobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await JobService.getSingleJob(id as string);
        setJob(res.data);
      } catch (error) {
        console.error("Job not found");
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  // --- Share Logic (Mobile Native Share + URL Copy Fallback) ---
  const handleShare = async () => {
    const shareData = {
      title: job?.title || "Job Opportunity",
      text: `Apply for ${job?.title} in ${job?.location}. Check it out!`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Job link copied to clipboard!", {
          description: "Now you can share it anywhere.",
        });
      }
    } catch (err) {
      console.error("Error sharing:", err);
    }
  };

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <Loader2
            className="animate-spin text-brand-yellow"
            size={50}
          />
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-blue animate-pulse">
            Loading Details...
          </p>
        </div>
      </div>
    );

  if (!job)
    return (
      <div className="h-screen flex flex-col items-center justify-center font-black uppercase italic text-brand-blue gap-4 bg-gray-50">
        <h2 className="text-3xl">Job not found!</h2>
        <Link
          href="/jobs"
          className="text-xs bg-brand-yellow px-6 py-3 rounded-xl not-italic tracking-widest text-brand-blue">
          Return to listings
        </Link>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-20">
      <div className="container mx-auto px-6">
        {/* Back Button */}
        <Link
          href="/jobs"
          className="group inline-flex items-center gap-2 text-gray-400 hover:text-brand-blue transition-all font-black uppercase text-xs tracking-widest mb-8">
          <div className="p-2 bg-white rounded-lg shadow-sm group-hover:bg-brand-yellow transition-colors">
            <ChevronLeft size={18} />
          </div>
          Back to all jobs
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* --- Left: Job Main Info --- */}
          <div className="lg:col-span-8 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-8 md:p-16 rounded-[3rem] md:rounded-[4rem] border border-gray-100 shadow-xl shadow-brand-blue/5">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-4 mb-8">
                <span className="px-5 py-2 bg-brand-light text-brand-blue text-[10px] font-black uppercase rounded-full tracking-widest border border-brand-blue/5">
                  {job.sector}
                </span>
                <span className="flex items-center gap-2 text-gray-400 font-bold text-[10px] uppercase tracking-widest">
                  <Calendar
                    size={14}
                    className="text-brand-yellow"
                  />{" "}
                  {new Date(job.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-6xl font-black text-brand-blue tracking-tighter italic uppercase leading-[0.85] mb-12">
                {job.title}
              </h1>

              {/* Key Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-10 border-y border-gray-50 mb-12">
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">
                    Location
                  </p>
                  <p className="text-brand-blue font-black flex items-center gap-2">
                    <MapPin
                      size={18}
                      className="text-brand-yellow"
                    />{" "}
                    {job.location}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">
                    Employment
                  </p>
                  <p className="text-brand-blue font-black flex items-center gap-2">
                    <Briefcase
                      size={18}
                      className="text-brand-yellow"
                    />{" "}
                    {job.jobType}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">
                    Remuneration
                  </p>
                  <p className="text-brand-blue font-black flex items-center gap-2 text-xl italic">
                    <Euro
                      size={20}
                      className="text-brand-yellow"
                    />{" "}
                    {job.salary}
                  </p>
                </div>
              </div>

              {/* Description & Requirements */}
              <div className="space-y-12">
                <section>
                  <h3 className="text-2xl font-black text-brand-blue uppercase italic tracking-tighter mb-6 border-l-4 border-brand-yellow pl-4">
                    About the Role
                  </h3>
                  <p className="text-gray-500 leading-relaxed font-medium text-lg whitespace-pre-wrap">
                    {job.description}
                  </p>
                </section>

                <section>
                  <h3 className="text-2xl font-black text-brand-blue uppercase italic tracking-tighter mb-6 border-l-4 border-brand-yellow pl-4">
                    Candidate Requirements
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {job.requirements.map((req: string, i: number) => (
                      <div
                        key={i}
                        className="flex items-start gap-4 p-6 bg-gray-50 rounded-3xl hover:bg-brand-yellow/5 transition-colors group">
                        <CheckCircle2
                          size={22}
                          className="text-brand-yellow shrink-0 mt-0.5 group-hover:scale-110 transition-transform"
                        />
                        <span className="text-brand-blue font-bold leading-tight uppercase text-xs tracking-tight">
                          {req}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </motion.div>
          </div>

          {/* --- Right: Sticky Call-to-Action Sidebar --- */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-brand-blue p-10 rounded-[3rem] md:rounded-[4rem] text-white shadow-2xl shadow-brand-blue/20 lg:sticky lg:top-32 border border-white/5">
              <Link href={`/jobs/${job._id}/apply`}> <h3 className="text-3xl font-black italic uppercase text-brand-yellow tracking-tighter mb-6 leading-none">
                Apply Now
              </h3>
              <p className="text-blue-100/60 text-sm font-medium mb-10 leading-relaxed">
                Start your professional journey today. Ensure you meet all the
                criteria before applying.
              </p>

              <div className="space-y-4">
                <button className="w-full py-6 bg-brand-yellow text-brand-blue font-black rounded-4xl flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all uppercase tracking-widest text-sm shadow-xl shadow-brand-yellow/10">
                  Submit Application <ArrowRight size={20} />
                </button>

                <button
                  onClick={handleShare}
                  className="w-full py-4 border-2 border-white/10 text-white font-black rounded-4xl flex items-center justify-center gap-3 hover:bg-white hover:text-brand-blue hover:border-white transition-all uppercase tracking-widest text-xs">
                  <Share2 size={16} /> Share Opportunity
                </button>
              </div>

              {/* Benefits Badge Section */}
              <div className="mt-10 pt-10 border-t border-white/10 space-y-6">
                <p className="text-[10px] font-black text-blue-300 uppercase tracking-[0.2em] mb-4">
                  Perks & Benefits:
                </p>
                <div className="flex flex-wrap gap-2">
                  {(Object as any).entries(job.benefits).map(
                    ([key, val]: any) =>
                      val && (
                        <div
                          key={key}
                          className="px-4 py-2 bg-white/5 rounded-xl text-[9px] font-black uppercase tracking-widest border border-white/5">
                          {key}
                        </div>
                      ),
                  )}
                </div>
              </div>

              {/* Ref ID */}
              <div className="mt-8 text-center">
                <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.3em]">
                  REF ID: {job.jobId}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicJobDetails;

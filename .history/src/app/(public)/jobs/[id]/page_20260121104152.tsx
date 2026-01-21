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
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

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

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2
          className="animate-spin text-brand-yellow"
          size={50}
        />
      </div>
    );
  if (!job)
    return (
      <div className="h-screen flex items-center justify-center font-black uppercase italic text-brand-blue">
        Job not found!
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20">
      <div className="container mx-auto px-6">
        <Link
          href="/jobs"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-brand-blue transition-all font-black uppercase text-xs tracking-widest mb-8">
          <ChevronLeft size={18} /> Back to all jobs
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Job Info */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white p-10 md:p-16 rounded-[4rem] border border-gray-100 shadow-xl shadow-brand-blue/5">
              <div className="flex flex-wrap items-center gap-4 mb-8">
                <span className="px-5 py-2 bg-brand-light text-brand-blue text-[10px] font-black uppercase rounded-full tracking-widest">
                  {job.sector}
                </span>
                <span className="flex items-center gap-2 text-gray-400 font-bold text-xs">
                  <Calendar size={16} /> Posted{" "}
                  {new Date(job.createdAt).toLocaleDateString()}
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-black text-brand-blue tracking-tighter italic uppercase leading-[0.85] mb-10">
                {job.title}
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-10 border-y border-gray-50 mb-10">
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
                    Job Type
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
                    Monthly Salary
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

              <div className="space-y-10">
                <section>
                  <h3 className="text-2xl font-black text-brand-blue uppercase italic tracking-tighter mb-6">
                    About the Role
                  </h3>
                  <p className="text-gray-500 leading-relaxed font-medium text-lg whitespace-pre-wrap">
                    {job.description}
                  </p>
                </section>

                <section>
                  <h3 className="text-2xl font-black text-brand-blue uppercase italic tracking-tighter mb-6">
                    Requirements
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {job.requirements.map((req: string, i: number) => (
                      <div
                        key={i}
                        className="flex items-start gap-4 p-5 bg-gray-50 rounded-[2rem]">
                        <CheckCircle2
                          size={22}
                          className="text-brand-yellow shrink-0 mt-0.5"
                        />
                        <span className="text-brand-blue font-bold leading-tight">
                          {req}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>

          {/* Right: Sticky Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-brand-blue p-10 rounded-[4rem] text-white shadow-2xl shadow-brand-blue/20 sticky top-32">
              <h3 className="text-2xl font-black italic uppercase text-brand-yellow tracking-tighter mb-8 leading-none">
                Apply for this position
              </h3>
              <p className="text-blue-100/60 font-medium mb-10">
                Make sure to review all requirements before submitting your
                application.
              </p>

              <button className="w-full py-6 bg-brand-yellow text-brand-blue font-black rounded-[2rem] flex items-center justify-center gap-3 hover:scale-[1.02] transition-all uppercase tracking-widest text-sm mb-4">
                Apply Now <ArrowRight size={20} />
              </button>

              <button className="w-full py-4 border-2 border-white/10 text-white font-black rounded-[2rem] flex items-center justify-center gap-3 hover:bg-white hover:text-brand-blue transition-all uppercase tracking-widest text-xs">
                <Share2 size={16} /> Share Job
              </button>

              <div className="mt-10 pt-10 border-t border-white/10 space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black text-blue-300 uppercase tracking-widest">
                    Benefits Included:
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(Object as any).entries(job.benefits).map(
                    ([key, val]: any) =>
                      val && (
                        <span
                          key={key}
                          className="px-4 py-2 bg-white/5 rounded-xl text-[10px] font-black uppercase tracking-widest">
                          {key}
                        </span>
                      ),
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicJobDetails;

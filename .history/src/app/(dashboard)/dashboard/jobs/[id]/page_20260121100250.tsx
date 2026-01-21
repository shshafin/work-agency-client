"use client";

import React, { useEffect, useState } from "react";
import { JobService } from "@/services/JobService";
import {
  MapPin,
  Briefcase,
  Calendar,
  CheckCircle2,
  ChevronLeft,
  Loader2,
  Star,
  Clock,
  Euro,
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

const JobDetails = () => {
  const { id } = useParams();
  const router = useRouter();
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await JobService.getSingleJob(id as string);
        setJob(res.data);
      } catch (error) {
        toast.error("Job not found");
        router.push("/dashboard/jobs");
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id, router]);

  if (loading)
    return (
      <div className="h-96 flex items-center justify-center">
        <Loader2
          className="animate-spin text-brand-yellow"
          size={40}
        />
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20">
      <div className="flex items-center justify-between">
        <Link
          href="/dashboard/jobs"
          className="flex items-center gap-2 text-gray-400 hover:text-brand-blue transition-all font-bold">
          <ChevronLeft size={20} /> Back to List
        </Link>
        <Link
          href={`/dashboard/jobs/edit/${id}`}
          className="px-6 py-2 bg-brand-blue text-white rounded-xl font-black uppercase text-xs">
          Edit Job
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="px-4 py-1.5 bg-brand-light text-brand-blue text-xs font-black uppercase rounded-full">
                  {job.sector}
                </span>
                {job.isFeatured && (
                  <span className="flex items-center gap-1 text-brand-yellow font-black text-[10px] uppercase tracking-widest">
                    <Star
                      size={14}
                      fill="currentColor"
                    />{" "}
                    Featured
                  </span>
                )}
              </div>
              <h1 className="text-4xl font-black text-brand-blue tracking-tighter italic uppercase leading-none">
                {job.title}
              </h1>
              <div className="flex flex-wrap gap-6 text-sm font-bold text-gray-400 pt-2">
                <div className="flex items-center gap-2">
                  <MapPin
                    size={18}
                    className="text-brand-yellow"
                  />{" "}
                  {job.location}
                </div>
                <div className="flex items-center gap-2">
                  <Clock
                    size={18}
                    className="text-brand-yellow"
                  />{" "}
                  {job.jobType}
                </div>
                <div className="flex items-center gap-2 font-black text-brand-blue">
                  <Euro
                    size={18}
                    className="text-brand-yellow"
                  />{" "}
                  {job.salary}
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-gray-50">
              <h3 className="text-lg font-black text-brand-blue uppercase mb-4 tracking-tight">
                Description
              </h3>
              <p className="text-gray-500 leading-relaxed whitespace-pre-wrap">
                {job.description}
              </p>
            </div>

            <div className="pt-8">
              <h3 className="text-lg font-black text-brand-blue uppercase mb-4 tracking-tight">
                Key Requirements
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {job.requirements.map((req: string, i: number) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 p-4 bg-gray-50 rounded-2xl">
                    <CheckCircle2
                      size={18}
                      className="text-brand-yellow shrink-0 mt-0.5"
                    />
                    <span className="text-sm font-medium text-gray-600">
                      {req}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-brand-blue p-8 rounded-[3rem] text-white space-y-6">
            <h3 className="text-xl font-black italic uppercase text-brand-yellow tracking-tighter">
              Job Overview
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between border-b border-white/10 pb-4">
                <span className="text-xs font-bold text-blue-200 uppercase">
                  Job ID
                </span>
                <span className="text-sm font-black">{job.jobId}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-4">
                <span className="text-xs font-bold text-blue-200 uppercase">
                  Status
                </span>
                <span
                  className={`text-[10px] font-black px-3 py-1 rounded-full uppercase ${job.status === "active" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                  {job.status}
                </span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-xs font-bold text-blue-200 uppercase">
                  Posted On
                </span>
                <span className="text-sm font-black">
                  {new Date(job.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm">
            <h3 className="text-lg font-black text-brand-blue uppercase mb-6 tracking-tight">
              Benefits
            </h3>
            <div className="space-y-4">
              {Object.entries(job.benefits).map(([key, value]) => (
                <div
                  key={key}
                  className={`flex items-center justify-between p-3 rounded-xl ${value ? "bg-green-50 text-green-700" : "bg-gray-50 text-gray-300"}`}>
                  <span className="text-xs font-black uppercase tracking-widest">
                    {key}
                  </span>
                  {value ? (
                    <CheckCircle2 size={16} />
                  ) : (
                    <x
                      size={16}
                      className="opacity-30"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;

/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";

import React, { useEffect, useState } from "react";
import { ApplicationService } from "@/services/ApplicationService";
import {
  ChevronLeft,
  Loader2,
  Mail,
  Phone,
  Calendar,
  Briefcase,
  FileText,
  ExternalLink,
  CheckCircle2,
  XCircle,
  Clock,
  MapPin,
  Tag,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { motion } from "framer-motion";

const SingleApplicationView = () => {
  const { id } = useParams();
  const router = useRouter();
  const [app, setApp] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // ১. সিঙ্গেল অ্যাপ্লিকেশন ডাটা ফেচ করা
  useEffect(() => {
    const fetchApp = async () => {
      try {
        const res = await ApplicationService.getSingleApplication(id as string);
        setApp(res.data);
      } catch (error) {
        toast.error("Application not found");
        router.push("/dashboard/applications");
      } finally {
        setLoading(false);
      }
    };
    fetchApp();
  }, [id, router]);

  const updateStatus = async (status: string) => {
    setUpdating(true);
    try {
      await ApplicationService.updateStatus(id as string, status);
      toast.success(`Application marked as ${status}`);
      setApp((prev: any) => ({ ...prev, status }));
    } catch (error) {
      toast.error("Status update failed");
    } finally {
      setUpdating(false);
    }
  };

  if (loading)
    return (
      <div className="h-screen flex flex-col items-center justify-center gap-4">
        <Loader2
          className="animate-spin text-brand-yellow"
          size={50}
        />
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-blue animate-pulse">
          Fetching Submission...
        </p>
      </div>
    );

  if (!app) return null;

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      {/* --- Top Bar Actions --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <Link
          href="/dashboard/applications"
          className="group flex items-center gap-2 text-gray-400 hover:text-brand-blue transition-all font-black uppercase text-[10px] tracking-widest">
          <div className="p-2 bg-white rounded-xl shadow-sm group-hover:bg-brand-yellow transition-colors border border-gray-100">
            <ChevronLeft size={18} />
          </div>
          Back to List
        </Link>

        {/* Status Quick Switchers */}
        <div className="bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
  <div className="flex flex-wrap sm:flex-nowrap gap-2">
    {["shortlisted", "reviewed", "rejected"].map((status) => (
      <button
        key={status}
        disabled={updating || app.status === status}
        onClick={() => updateStatus(status)}
        className={`w-full sm:w-auto flex items-center justify-center gap-2
          px-4 sm:px-5 py-3 sm:py-2.5
          rounded-xl font-extrabold uppercase tracking-widest
          text-[10px] sm:text-[9px]
          transition-all
          ${
            status === "shortlisted"
              ? "bg-green-50 text-green-600 hover:bg-green-600 hover:text-white"
              : status === "reviewed"
              ? "bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white"
              : "bg-red-50 text-red-600 hover:bg-red-600 hover:text-white"
          }
          disabled:opacity-40 disabled:cursor-not-allowed`}
      >
        {status === "shortlisted" ? (
          <CheckCircle2 size={14} />
        ) : status === "reviewed" ? (
          <Clock size={14} />
        ) : (
          <XCircle size={14} />
        )}
        <span>{status}</span>
      </button>
    ))}
  </div>
</div>


      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* --- Left Column: Candidate & Job Details --- */}
        <div className="lg:col-span-8 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 md:p-12 rounded-[3.5rem] border border-gray-100 shadow-xl shadow-brand-blue/5">
            {/* Header Identity */}
            <div className="flex flex-col md:flex-row items-center gap-8 mb-12 pb-12 border-b border-gray-50 text-center md:text-left">
              <div className="w-28 h-28 bg-brand-light text-brand-blue rounded-[2.5rem] flex items-center justify-center text-4xl font-black italic shadow-inner border-4 border-white">
                {app.name?.charAt(0).toUpperCase()}
              </div>
              <div className="space-y-3">
                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                  <span
                    className={`px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.2em]
                    ${
                      app.status === "pending"
                        ? "bg-orange-100 text-orange-600"
                        : app.status === "shortlisted"
                          ? "bg-green-100 text-green-600"
                          : app.status === "reviewed"
                            ? "bg-blue-100 text-blue-600"
                            : "bg-red-100 text-red-600"
                    }`}>
                    {app.status}
                  </span>
                  <span className="px-4 py-1 bg-gray-50 text-gray-400 rounded-full text-[9px] font-black uppercase tracking-[0.2em] flex items-center gap-1">
                    <Calendar
                      size={10}
                      className="text-brand-yellow"
                    />{" "}
                    {new Date(app.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <h1 className="text-4xl font-black text-brand-blue tracking-tighter italic uppercase leading-none">
                  {app.name}
                </h1>
              </div>
            </div>

            {/* Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Contact Info */}
              <div className="space-y-6">
                <h3 className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em] border-l-4 border-brand-yellow pl-3">
                  Contact Details
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-brand-blue font-bold text-sm">
                    <div className="p-2.5 bg-gray-50 rounded-xl text-brand-yellow shadow-sm">
                      <Mail size={20} />
                    </div>
                    {app.email}
                  </div>
                  <div className="flex items-center gap-4 text-brand-blue font-bold text-sm">
                    <div className="p-2.5 bg-gray-50 rounded-xl text-brand-yellow shadow-sm">
                      <Phone size={20} />
                    </div>
                    {app.phone}
                  </div>
                </div>
              </div>

              {/* Applied Job Info */}
              <div className="space-y-6">
                <h3 className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em] border-l-4 border-brand-yellow pl-3">
                  Position Applied
                </h3>
                <div className="p-6 bg-brand-blue rounded-3xl text-white shadow-lg shadow-brand-blue/10 relative overflow-hidden group">
                  <Briefcase
                    className="absolute -right-4 -bottom-4 text-white/5 group-hover:scale-110 transition-transform"
                    size={100}
                  />
                  <p className="font-black uppercase italic text-sm leading-tight mb-2 relative z-10">
                    {app.job?.title}
                  </p>
                  <div className="flex flex-col gap-1 relative z-10">
                    <span className="text-[9px] font-black text-brand-yellow uppercase tracking-widest">
                      Job ID: {app.job?.jobId}
                    </span>
                    <span className="text-[9px] font-bold text-blue-200 uppercase tracking-widest opacity-80">
                      {app.job?.sector} • {app.job?.location}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Cover Letter Section */}
            <div className="mt-12 pt-12 border-t border-gray-50 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em] border-l-4 border-brand-yellow pl-3">
                  Cover Letter / Message
                </h3>
                <Tag
                  size={16}
                  className="text-gray-200"
                />
              </div>
              <div className="bg-gray-50 p-8 rounded-[2.5rem] border border-gray-100 italic relative">
                <p className="text-gray-600 leading-relaxed font-medium whitespace-pre-wrap text-sm">
                  {app.coverLetter ||
                    "Candidate did not provide a cover letter."}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* --- Right Column: Sidebar (Resume Access) --- */}
        <div className="lg:col-span-4">
          <div className="bg-brand-blue p-10 rounded-[3.5rem] text-white space-y-8 lg:sticky lg:top-32 shadow-2xl shadow-brand-blue/20 border border-white/5">
            <div className="text-center space-y-4">
              <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto border border-white/10 shadow-inner">
                <FileText
                  size={48}
                  className="text-brand-yellow"
                />
              </div>
              <div>
                <h3 className="text-2xl font-black italic uppercase tracking-tighter">
                  Review CV
                </h3>
                <p className="text-blue-200 text-[10px] font-bold uppercase tracking-widest mt-1">
                  Attachment Found
                </p>
              </div>
            </div>

            <a
              href={app.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-6 bg-white text-brand-blue font-black rounded-2xl flex items-center justify-center gap-3 hover:bg-brand-yellow hover:scale-[1.02] transition-all uppercase tracking-[0.2em] text-xs shadow-xl shadow-black/20">
              Open Resume <ExternalLink size={16} />
            </a>

            {/* Job Quick Recap */}
            <div className="pt-8 border-t border-white/10 space-y-5">
              <p className="text-[10px] font-bold text-blue-300 uppercase tracking-widest">
                Job Recap
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin
                    size={14}
                    className="text-brand-yellow mt-0.5"
                  />
                  <div className="text-[10px] uppercase font-bold tracking-tight">
                    <p className="text-blue-200 opacity-60">Location</p>
                    <p className="text-white">{app.job?.location}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Briefcase
                    size={14}
                    className="text-brand-yellow mt-0.5"
                  />
                  <div className="text-[10px] uppercase font-bold tracking-tight">
                    <p className="text-blue-200 opacity-60">Employment Type</p>
                    <p className="text-white">{app.job?.jobType}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 p-6 rounded-3xl border border-white/10">
              <p className="text-[9px] font-black text-brand-yellow uppercase tracking-widest text-center leading-relaxed italic opacity-80">
                Verify skills and work experience before making a final
                decision.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleApplicationView;

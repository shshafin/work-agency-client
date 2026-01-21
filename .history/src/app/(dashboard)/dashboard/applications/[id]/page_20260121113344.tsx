/* eslint-disable @typescript-eslint/no-explicit-any */
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
  User,
  CheckCircle2,
  XCircle,
  Clock,
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
        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
          Loading Application...
        </p>
      </div>
    );

  if (!app) return null;

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <Link
          href="/dashboard/applications"
          className="group flex items-center gap-2 text-gray-400 hover:text-brand-blue transition-all font-black uppercase text-[10px] tracking-widest">
          <div className="p-2 bg-white rounded-xl shadow-sm group-hover:bg-brand-yellow transition-colors">
            <ChevronLeft size={18} />
          </div>
          Back to Applications
        </Link>

        <div className="flex bg-white p-1.5 rounded-2xl shadow-sm border border-gray-100 gap-1">
          {["shortlisted", "rejected"].map((status) => (
            <button
              key={status}
              disabled={updating || app.status === status}
              onClick={() => updateStatus(status)}
              className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2
                ${
                  status === "shortlisted"
                    ? "bg-green-50 text-green-600 hover:bg-green-600 hover:text-white"
                    : "bg-red-50 text-red-600 hover:bg-red-600 hover:text-white"
                } 
                disabled:opacity-30 disabled:cursor-not-allowed`}>
              {status === "shortlisted" ? (
                <CheckCircle2 size={14} />
              ) : (
                <XCircle size={14} />
              )}
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Content: Profile & Letter */}
        <div className="lg:col-span-8 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 md:p-12 rounded-[3.5rem] border border-gray-100 shadow-xl shadow-brand-blue/5">
            {/* Candidate Identity */}
            <div className="flex flex-col md:flex-row items-center gap-8 mb-12 pb-12 border-b border-gray-50">
              <div className="w-32 h-32 bg-brand-light text-brand-blue rounded-[2.5rem] flex items-center justify-center text-5xl font-black italic shadow-inner">
                {app.name?.charAt(0)}
              </div>
              <div className="text-center md:text-left space-y-3">
                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                  <span
                    className={`px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.2em] shadow-sm
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
                  <span className="px-4 py-1 bg-gray-100 text-gray-400 rounded-full text-[9px] font-black uppercase tracking-[0.2em] flex items-center gap-1">
                    <Clock size={10} />{" "}
                    {new Date(app.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-brand-blue tracking-tighter italic uppercase leading-none">
                  {app.name}
                </h1>
              </div>
            </div>

            {/* Quick Contact & Job Ref */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-6">
                <h3 className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em] border-l-2 border-brand-yellow pl-3">
                  Contact Info
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-brand-blue font-bold text-sm truncate">
                    <div className="p-2 bg-gray-50 rounded-lg text-brand-yellow">
                      <Mail size={18} />
                    </div>
                    {app.email}
                  </div>
                  <div className="flex items-center gap-4 text-brand-blue font-bold text-sm">
                    <div className="p-2 bg-gray-50 rounded-lg text-brand-yellow">
                      <Phone size={18} />
                    </div>
                    {app.phone}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em] border-l-2 border-brand-yellow pl-3">
                  Applied Position
                </h3>
                <div className="p-6 bg-brand-blue rounded-3xl text-white shadow-lg shadow-brand-blue/10">
                  <p className="font-black uppercase italic text-sm leading-tight mb-2">
                    {app.job?.title}
                  </p>
                  <div className="flex items-center justify-between text-[10px] font-bold text-blue-200 uppercase tracking-widest opacity-80 font-mono">
                    <span>ID: {app.job?.jobId}</span>
                    <span className="bg-white/10 px-2 py-0.5 rounded">
                      {app.job?.jobType}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Cover Letter */}
            <div className="mt-12 pt-12 border-t border-gray-50 space-y-6">
              <h3 className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em] border-l-2 border-brand-yellow pl-3">
                Candidate Message
              </h3>
              <div className="bg-gray-50 p-8 rounded-[2rem] relative italic">
                <p className="text-gray-600 leading-relaxed font-medium whitespace-pre-wrap text-sm">
                  {app.coverLetter ||
                    "The candidate did not provide a cover letter for this application."}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Sidebar: CV Access */}
        <div className="lg:col-span-4">
          <div className="bg-brand-blue p-10 rounded-[3.5rem] text-white space-y-8 lg:sticky lg:top-32 shadow-2xl shadow-brand-blue/20">
            <div className="text-center space-y-4">
              <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto border border-white/10">
                <FileText
                  size={48}
                  className="text-brand-yellow"
                />
              </div>
              <div>
                <h3 className="text-2xl font-black italic uppercase tracking-tighter">
                  Candidate CV
                </h3>
                <p className="text-blue-200 text-[10px] font-bold uppercase tracking-widest mt-1">
                  Ready for Review
                </p>
              </div>
            </div>

            <a
              href={app.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-6 bg-white text-brand-blue font-black rounded-2xl flex items-center justify-center gap-3 hover:bg-brand-yellow hover:scale-[1.02] transition-all uppercase tracking-[0.2em] text-xs shadow-xl shadow-black/20">
              Open Document <ExternalLink size={16} />
            </a>

            <div className="pt-8 border-t border-white/10 space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest">
                  <span className="text-blue-300">Sector</span>
                  <span className="text-white bg-white/10 px-3 py-1 rounded-lg">
                    {app.job?.sector}
                  </span>
                </div>
                <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest">
                  <span className="text-blue-300">Target Location</span>
                  <span className="text-white">{app.job?.location}</span>
                </div>
              </div>
            </div>

            <div className="bg-brand-yellow/10 p-6 rounded-3xl border border-brand-yellow/20">
              <p className="text-[9px] font-black text-brand-yellow uppercase tracking-widest text-center leading-relaxed">
                Verify the candidates skills and experience based on their CV
                before shortlisting.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleApplicationView;

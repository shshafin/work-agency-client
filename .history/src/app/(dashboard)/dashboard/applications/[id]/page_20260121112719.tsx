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
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";

const SingleApplicationView = () => {
  const { id } = useParams();
  const router = useRouter();
  const [app, setApp] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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
    try {
      await ApplicationService.updateStatus(id as string, status);
      toast.success(`Application marked as ${status}`);
      setApp({ ...app, status });
    } catch (error) {
      toast.error("Status update failed");
    }
  };

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
          href="/dashboard/applications"
          className="flex items-center gap-2 text-gray-400 hover:text-brand-blue transition-all font-black uppercase text-xs tracking-widest">
          <ChevronLeft size={18} /> Back to List
        </Link>

        <div className="flex gap-2">
          {["shortlisted", "rejected"].map((status) => (
            <button
              key={status}
              onClick={() => updateStatus(status)}
              className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all
                ${status === "shortlisted" ? "bg-green-500 text-white shadow-lg shadow-green-500/20" : "bg-red-500 text-white shadow-lg shadow-red-500/20"}`}>
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Candidate Details */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm">
            <div className="flex items-center gap-6 mb-10 pb-10 border-b border-gray-50">
              <div className="w-24 h-24 bg-brand-light text-brand-blue rounded-3xl flex items-center justify-center text-4xl font-black italic">
                {app.name.charAt(0)}
              </div>
              <div className="space-y-1">
                <span
                  className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${app.status === "pending" ? "bg-orange-100 text-orange-600" : "bg-brand-light text-brand-blue"}`}>
                  {app.status}
                </span>
                <h1 className="text-4xl font-black text-brand-blue tracking-tighter italic uppercase">
                  {app.name}
                </h1>
                <p className="text-gray-400 font-bold text-sm">
                  Applied on {new Date(app.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-6">
                <h3 className="text-xs font-black text-gray-300 uppercase tracking-[0.2em]">
                  Contact Details
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-brand-blue font-bold">
                    <Mail
                      size={18}
                      className="text-brand-yellow"
                    />{" "}
                    {app.email}
                  </div>
                  <div className="flex items-center gap-4 text-brand-blue font-bold">
                    <Phone
                      size={18}
                      className="text-brand-yellow"
                    />{" "}
                    {app.phone}
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <h3 className="text-xs font-black text-gray-300 uppercase tracking-[0.2em]">
                  Job Applied For
                </h3>
                <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100">
                  <p className="font-black text-brand-blue uppercase italic text-sm">
                    {app.job?.title}
                  </p>
                  <p className="text-[10px] font-black text-brand-yellow mt-1">
                    ID: {app.job?.jobId}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-12 border-t border-gray-50 space-y-6">
              <h3 className="text-xs font-black text-gray-300 uppercase tracking-[0.2em]">
                Cover Letter / Message
              </h3>
              <p className="text-gray-500 leading-relaxed font-medium whitespace-pre-wrap italic">
                {app.coverLetter || "No cover letter provided."}
              </p>
            </div>
          </div>
        </div>

        {/* Right: Resume Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-brand-blue p-8 rounded-[3rem] text-white space-y-8 sticky top-32">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto">
                <FileText
                  size={40}
                  className="text-brand-yellow"
                />
              </div>
              <h3 className="text-xl font-black italic uppercase tracking-tighter">
                Curriculum Vitae
              </h3>
            </div>

            <a
              href={app.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-5 bg-white text-brand-blue font-black rounded-2xl flex items-center justify-center gap-3 hover:bg-brand-yellow transition-all uppercase tracking-widest text-xs shadow-xl shadow-black/20">
              View Document <ExternalLink size={16} />
            </a>

            <div className="pt-6 border-t border-white/10">
              <p className="text-[10px] font-bold text-blue-200 uppercase mb-4 tracking-widest">
                Quick Review Stats
              </p>
              <div className="space-y-3">
                <div className="flex justify-between text-xs">
                  <span className="opacity-60 font-bold uppercase">
                    Job Sector
                  </span>
                  <span className="font-black">{app.job?.sector}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="opacity-60 font-bold uppercase">
                    Location
                  </span>
                  <span className="font-black">{app.job?.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleApplicationView;

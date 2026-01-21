/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { JobService } from "@/services/JobService";
import { ApplicationService } from "@/services/ApplicationService";
import {
  ChevronLeft,
  Loader2,
  Upload,
  Send,
  CheckCircle2,
  Briefcase,
  User,
  Mail,
  Phone,
  FileText,
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { motion } from "framer-motion";

const ApplyJobPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  // জবের ডাটা ফেচ করা (টাইটেল দেখানোর জন্য)
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await JobService.getSingleJob(id as string);
        setJob(res.data);
      } catch (error) {
        toast.error("Job details could not be loaded");
        router.push("/jobs");
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id, router]);

  const handleApply = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // ফাইল ভ্যালিডেশন
    if (!file) {
      return toast.error("Please upload your CV/Resume (PDF)");
    }

    const formData = new FormData();
    const formElement = e.currentTarget;

    // ব্যাকএন্ডের প্রত্যাশিত ডাটা স্ট্রাকচার
    const applicationData = {
      job: id, // MongoDB ObjectId
      name: (formElement.elements.namedItem("name") as HTMLInputElement).value,
      email: (formElement.elements.namedItem("email") as HTMLInputElement)
        .value,
      phone: (formElement.elements.namedItem("phone") as HTMLInputElement)
        .value,
      coverLetter: (
        formElement.elements.namedItem("coverLetter") as HTMLTextAreaElement
      ).value,
    };

    // ব্যাকএন্ডে req.body.data হিসেবে JSON স্ট্রিং পাঠাচ্ছি
    formData.append("data", JSON.stringify(applicationData));
    // ব্যাকএন্ডে upload.single('file') এর সাথে মিল রেখে 'file' কি-তে সিভি পাঠাচ্ছি
    formData.append("file", file);

    setIsSubmitting(true);
    try {
      const res = await ApplicationService.applyJob(formData);

      if (res.success) {
        toast.success("Applied successfully! Our team will review your CV.");
        router.push(`/jobs/${id}`);
      }
    } catch (error: any) {
      console.error("Application Error:", error);
      const errorMsg =
        error?.response?.data?.errorMessage || "Submission failed. Try again.";
      toast.error(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center bg-white">
        <Loader2
          className="animate-spin text-brand-yellow"
          size={50}
        />
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Header Section */}
        <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <Link
              href={`/jobs/${id}`}
              className="flex items-center gap-2 text-gray-400 hover:text-brand-blue transition-all font-black uppercase text-[10px] tracking-[0.2em] mb-4">
              <ChevronLeft size={16} /> Back to job details
            </Link>
            <h1 className="text-4xl font-black text-brand-blue italic uppercase tracking-tighter leading-none">
              Apply for <br />{" "}
              <span className="text-brand-yellow">{job?.title}</span>
            </h1>
          </div>
          <div className="hidden md:flex items-center gap-3 bg-white p-4 rounded-3xl border border-gray-100 shadow-sm">
            <div className="w-12 h-12 bg-brand-light rounded-2xl flex items-center justify-center text-brand-blue">
              <Briefcase size={24} />
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-300 uppercase leading-none">
                Job Reference
              </p>
              <p className="text-sm font-black text-brand-blue uppercase">
                {job?.jobId}
              </p>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[3rem] shadow-xl shadow-brand-blue/5 border border-gray-100 overflow-hidden">
          <div className="bg-brand-blue p-8 text-white">
            <p className="text-blue-200 text-xs font-bold uppercase tracking-[0.3em] mb-1">
              Candidate Details
            </p>
            <h3 className="text-xl text-white uppercase italic tracking-tighter">
              Submit your information
            </h3>
          </div>

          <form
            onSubmit={handleApply}
            className="p-8 md:p-16 space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">
                  <User
                    size={14}
                    className="text-brand-yellow"
                  />{" "}
                  Full Name
                </label>
                <input
                  name="name"
                  required
                  type="text"
                  className="w-full p-5 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-brand-yellow transition-all font-bold text-brand-blue placeholder:text-gray-300"
                  placeholder="e.g. John Doe"
                />
              </div>
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">
                  <Mail
                    size={14}
                    className="text-brand-yellow"
                  />{" "}
                  Email Address
                </label>
                <input
                  name="email"
                  required
                  type="email"
                  className="w-full p-5 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-brand-yellow transition-all font-bold text-brand-blue placeholder:text-gray-300"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">
                  <Phone
                    size={14}
                    className="text-brand-yellow"
                  />{" "}
                  Phone Number
                </label>
                <input
                  name="phone"
                  required
                  type="text"
                  className="w-full p-5 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-brand-yellow transition-all font-bold text-brand-blue placeholder:text-gray-300"
                  placeholder="+351..."
                />
              </div>
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">
                  <FileText
                    size={14}
                    className="text-brand-yellow"
                  />{" "}
                  Resume / CV (PDF)
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept=".pdf"
                    required
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div
                    className={`w-full p-5 flex items-center justify-between border-2 border-dashed rounded-2xl transition-all ${
                      file
                        ? "bg-green-50 border-green-200 text-green-600"
                        : "bg-gray-50 border-gray-100 text-gray-400"
                    }`}>
                    <span className="text-xs font-bold uppercase truncate max-w-[200px]">
                      {file ? file.name : "Select PDF File"}
                    </span>
                    <Upload
                      size={18}
                      className={file ? "text-green-500" : "text-gray-300"}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">
                Cover Letter (Optional)
              </label>
              <textarea
                name="coverLetter"
                rows={6}
                className="w-full p-6 bg-gray-50 border border-gray-100 rounded-3xl outline-none focus:ring-2 focus:ring-brand-yellow transition-all font-medium text-brand-blue resize-none placeholder:text-gray-300"
                placeholder="Briefly explain why you're a good fit for this role..."
              />
            </div>

            <div className="pt-6">
              <button
                disabled={isSubmitting}
                type="submit"
                className="w-full py-6 bg-brand-blue text-white font-black rounded-[2rem] flex items-center justify-center gap-3 hover:bg-brand-yellow hover:text-brand-blue transition-all uppercase tracking-widest shadow-xl shadow-brand-blue/20">
                {isSubmitting ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <Send size={20} />
                )}
                {isSubmitting
                  ? "Processing Application..."
                  : "Confirm & Send Application"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default ApplyJobPage;

/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useEffect, useState, useCallback } from "react";
import { JobService } from "@/services/JobService";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  MapPin,
  Briefcase,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Star,
  Eye,
  AlertTriangle,
  PackageOpen,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

const JobListPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPage: 1,
  });

  // Modal State
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    try {
      const res = await JobService.getAllJobs({ page, limit: 10, searchTerm });
      setJobs(res.data);
      setMeta(res.meta);
    } catch (error) {
      toast.error("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  }, [page, searchTerm]);

  useEffect(() => {
    const delay = setTimeout(() => fetchJobs(), 500);
    return () => clearTimeout(delay);
  }, [fetchJobs]);

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      await JobService.deleteJob(deleteId);
      toast.success("Job post deleted successfully");
      setDeleteId(null);
      fetchJobs();
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  const toggleFeatured = async (id: string, current: boolean) => {
    try {
      await JobService.updateJob(id, { isFeatured: !current });
      toast.success("Featured status updated");
      fetchJobs();
    } catch (error) {
      toast.error("Update failed");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-brand-blue tracking-tighter italic uppercase">
            Manage Jobs
          </h1>
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-1">
            Publish and control job vacancies
          </p>
        </div>
        <Link
          href="/dashboard/jobs/create"
          className="bg-brand-yellow text-brand-blue px-6 py-3 rounded-2xl font-black uppercase text-xs flex items-center gap-2 hover:bg-brand-blue hover:text-white transition-all shadow-lg shadow-brand-yellow/20">
          <Plus size={18} /> Post New Job
        </Link>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          size={18}
        />
        <input
          type="text"
          placeholder="Search jobs..."
          className="w-full pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-2xl text-sm outline-none shadow-sm focus:ring-2 focus:ring-brand-yellow/30 transition-all"
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(1);
          }}
        />
      </div>

      {/* Jobs Content */}
      {loading ? (
        <div className="py-20 flex justify-center">
          <Loader2
            className="animate-spin text-brand-yellow"
            size={40}
          />
        </div>
      ) : jobs.length > 0 ? (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {jobs.map((job: any) => (
            <div
              key={job._id}
              className="bg-white p-6 rounded-4xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-6 hover:shadow-md transition-all group">
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-brand-light text-brand-blue text-[9px] font-black uppercase rounded-lg">
                    {job.sector}
                  </span>
                  <span
                    className={`px-3 py-1 text-[9px] font-black uppercase rounded-lg ${
                      job.status === "active"
                        ? "bg-green-50 text-green-600"
                        : "bg-red-50 text-red-600"
                    }`}>
                    {job.status}
                  </span>
                </div>
                <h3 className="text-xl font-black text-brand-blue leading-tight truncate pr-10">
                  {job.title}
                </h3>
                <div className="flex flex-wrap gap-4 text-xs font-bold text-gray-400">
                  <div className="flex items-center gap-1">
                    <MapPin
                      size={14}
                      className="text-brand-yellow"
                    />
                    {job.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Briefcase
                      size={14}
                      className="text-brand-yellow"
                    />
                    {job.jobType}
                  </div>
                  <div className="font-black text-brand-blue">
                    € {job.salary}
                  </div>
                </div>
              </div>

              <div className="flex md:flex-col justify-end gap-2">
                <button
                  onClick={() => toggleFeatured(job._id, job.isFeatured)}
                  className={`p-3 rounded-xl transition-all ${
                    job.isFeatured
                      ? "bg-brand-yellow text-brand-blue shadow-inner"
                      : "bg-gray-50 text-gray-300 hover:bg-gray-100"
                  }`}>
                  <Star
                    size={18}
                    fill={job.isFeatured ? "currentColor" : "none"}
                  />
                </button>
                <Link
                  href={`/dashboard/jobs/edit/${job._id}`}
                  className="p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-all">
                  <Edit2 size={18} />
                </Link>
                <Link
                  href={`/dashboard/jobs/${job._id}`}
                  className="p-3 bg-brand-light text-brand-blue rounded-xl hover:bg-brand-yellow transition-all">
                  <Eye size={18} />
                </Link>
                <button
                  onClick={() => setDeleteId(job._id)}
                  className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-100 transition-all">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white border-2 border-dashed border-gray-100 rounded-4xl p-20 text-center space-y-4">
          <div className="w-20 h-20 bg-gray-50 text-gray-300 rounded-full flex items-center justify-center mx-auto">
            <PackageOpen size={40} />
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-black text-brand-blue uppercase italic tracking-tighter">
              No Vacancies Available
            </h3>
            <p className="text-gray-400 text-sm font-medium">
              You haven&apos;t posted any job opportunities yet.
            </p>
          </div>
          <Link
            href="/dashboard/jobs/create"
            className="inline-flex items-center gap-2 bg-brand-blue text-white px-8 py-4 rounded-2xl font-black uppercase text-xs hover:bg-brand-yellow hover:text-brand-blue transition-all">
            Post Your First Job
          </Link>
        </div>
      )}

      {/* Pagination */}
      {jobs.length > 0 && (
        <div className="flex items-center justify-between pt-6">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic">
            Page {meta.page} of {meta.totalPage}
          </p>
          <div className="flex gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="p-2.5 bg-white border border-gray-200 rounded-xl hover:border-brand-yellow disabled:opacity-20 transition-all shadow-sm">
              <ChevronLeft size={20} />
            </button>
            <button
              disabled={page === meta.totalPage}
              onClick={() => setPage((p) => p + 1)}
              className="p-2.5 bg-white border border-gray-200 rounded-xl hover:border-brand-yellow disabled:opacity-20 transition-all shadow-sm">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      )}

      {/* --- Delete Confirmation Modal --- */}
      {deleteId && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-6 bg-brand-blue/30 backdrop-blur-md">
          <div className="bg-white w-full max-w-sm rounded-[3rem] p-10 shadow-2xl text-center space-y-6 animate-in zoom-in duration-300">
            <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <AlertTriangle size={40} />
            </div>
            <div>
              <h3 className="text-2xl font-black text-brand-blue tracking-tighter italic uppercase leading-none">
                Delete Job?
              </h3>
              <p className="text-gray-400 text-sm font-medium mt-2">
                This will remove the job post from the public listing. This
                action cannot be undone.
              </p>
            </div>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 py-4 bg-gray-100 text-gray-500 font-black rounded-2xl hover:bg-gray-200 transition-all uppercase text-[10px] tracking-widest">
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 py-4 bg-red-500 text-white font-black rounded-2xl hover:bg-red-600 transition-all shadow-lg shadow-red-500/20 uppercase text-[10px] tracking-widest">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobListPage;

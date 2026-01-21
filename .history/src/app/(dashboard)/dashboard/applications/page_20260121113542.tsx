/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState, useCallback } from "react";
import { ApplicationService } from "@/services/ApplicationService";
import {
  FileText,
  Mail,
  Phone,
  ExternalLink,
  Eye,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Briefcase,
  User,
  Search,
  Filter,
} from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

const ApplicationsPage = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPage: 1,
  });

  const fetchApplications = useCallback(async () => {
    setLoading(true);
    try {
      // শুধু ডাটা থাকলে তবেই প্যারামিটারে পাঠাবো
      const params: any = { page, limit: 10 };
      if (searchTerm.trim()) params.searchTerm = searchTerm;
      if (statusFilter) params.status = statusFilter;

      const res = await ApplicationService.getAllApplications(params);
      setApplications(res.data);
      setMeta(res.meta);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load applications");
    } finally {
      setLoading(false);
    }
  }, [page, searchTerm, statusFilter]);

  useEffect(() => {
    const delay = setTimeout(() => fetchApplications(), 500);
    return () => clearTimeout(delay);
  }, [fetchApplications]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <h1 className="text-3xl font-black text-brand-blue tracking-tighter italic uppercase">
            Submissions
          </h1>
          <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mt-1 italic font-mono bg-white px-3 py-1 rounded-lg border border-gray-100 w-fit">
            Total Results: {meta.total}
          </p>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-3xl border border-gray-100 shadow-sm">
        <div className="flex-1 relative">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"
            size={18}
          />
          <input
            type="text"
            placeholder="Search by name or email..."
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-2xl text-sm outline-none focus:ring-2 focus:ring-brand-yellow/30 font-bold text-brand-blue"
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
          />
        </div>
        <div className="md:w-56 relative">
          <Filter
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"
            size={18}
          />
          <select
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-2xl text-sm outline-none appearance-none font-black uppercase tracking-widest text-brand-blue cursor-pointer"
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}>
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="reviewed">Reviewed</option>
            <option value="shortlisted">Shortlisted</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-4xl border border-gray-100 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">
                  Candidate info
                </th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">
                  Position Details
                </th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr>
                  <td
                    colSpan={3}
                    className="py-24 text-center">
                    <Loader2
                      className="animate-spin mx-auto text-brand-yellow"
                      size={40}
                    />
                  </td>
                </tr>
              ) : applications.length > 0 ? (
                applications.map((app: any) => (
                  <tr
                    key={app._id}
                    className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-8 py-7">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-brand-light text-brand-blue rounded-2xl flex items-center justify-center text-lg font-black italic shadow-inner">
                          {app.name?.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-brand-blue text-sm uppercase tracking-tight">
                            {app.name}
                          </p>
                          <p className="text-[10px] text-gray-400 font-bold lowercase mt-0.5">
                            {app.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-7">
                      <div className="space-y-1">
                        <p className="font-black text-brand-blue text-[11px] uppercase tracking-tighter flex items-center gap-2 italic">
                          <Briefcase
                            size={12}
                            className="text-brand-yellow"
                          />{" "}
                          {app.job?.title}
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest border border-gray-100 px-2 py-0.5 rounded shadow-sm">
                            ID: {app.job?.jobId}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-[0.2em]
                            ${
                              app.status === "pending"
                                ? "bg-orange-50 text-orange-500"
                                : app.status === "reviewed"
                                  ? "bg-blue-50 text-blue-500"
                                  : app.status === "shortlisted"
                                    ? "bg-green-50 text-green-500"
                                    : "bg-red-50 text-red-500"
                            }`}>
                            {app.status}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-7 text-right">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/dashboard/applications/${app._id}`}
                          className="p-3 bg-white border border-gray-100 text-brand-blue rounded-xl hover:bg-brand-yellow hover:border-brand-yellow transition-all shadow-sm group-hover:scale-105">
                          <Eye size={18} />
                        </Link>
                        <a
                          href={app.cvUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 bg-brand-blue text-white rounded-xl hover:bg-brand-blue/80 transition-all shadow-md group-hover:scale-105">
                          <FileText size={18} />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={3}
                    className="py-32 text-center">
                    <div className="space-y-3 opacity-20 flex flex-col items-center">
                      <Briefcase size={48} />
                      <p className="text-[10px] font-black uppercase tracking-[0.4em]">
                        No Submissions Found
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Section */}
        <div className="px-8 py-6 bg-gray-50/50 flex justify-between items-center border-t border-gray-100">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] italic font-mono">
            Page {meta.page} of {meta.totalPage || 1}
          </span>
          <div className="flex gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="p-3 bg-white border border-gray-200 rounded-xl hover:border-brand-yellow hover:text-brand-blue disabled:opacity-20 transition-all shadow-sm">
              <ChevronLeft size={20} />
            </button>
            <button
              disabled={page === meta.totalPage || meta.totalPage === 0}
              onClick={() => setPage((p) => p + 1)}
              className="p-3 bg-white border border-gray-200 rounded-xl hover:border-brand-yellow hover:text-brand-blue disabled:opacity-20 transition-all shadow-sm">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationsPage;

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
      const res = await ApplicationService.getAllApplications({
        page,
        limit: 10,
        searchTerm,
        status: statusFilter,
      });
      setApplications(res.data);
      setMeta(res.meta);
    } catch (error) {
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
      <div>
        <h1 className="text-3xl font-black text-brand-blue tracking-tighter italic uppercase">
          Candidate Submissions
        </h1>
        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-1 italic font-mono">
          Total Found: {meta.total}
        </p>
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
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-2xl text-sm outline-none focus:ring-2 focus:ring-brand-yellow/30"
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
          />
        </div>
        <div className="md:w-48 relative">
          <Filter
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"
            size={18}
          />
          <select
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-2xl text-sm outline-none appearance-none font-bold text-brand-blue"
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
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">
                  Candidate
                </th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">
                  Job Information
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
                    className="py-20 text-center">
                    <Loader2
                      className="animate-spin mx-auto text-brand-yellow"
                      size={32}
                    />
                  </td>
                </tr>
              ) : applications.length > 0 ? (
                applications.map((app: any) => (
                  <tr
                    key={app._id}
                    className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-brand-light rounded-xl flex items-center justify-center text-brand-blue font-black">
                          {app.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-brand-blue text-sm">
                            {app.name}
                          </p>
                          <p className="text-[10px] text-gray-400 font-bold">
                            {app.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div>
                        <p className="font-black text-brand-blue text-[11px] uppercase tracking-tight">
                          {app.job?.title}
                        </p>
                        <p className="text-[9px] text-brand-yellow font-black uppercase tracking-widest">
                          REF: {app.job?.jobId}
                        </p>
                        <div
                          className={`mt-2 inline-block px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest
                          ${
                            app.status === "pending"
                              ? "bg-orange-100 text-orange-600"
                              : app.status === "reviewed"
                                ? "bg-blue-100 text-blue-600"
                                : app.status === "shortlisted"
                                  ? "bg-green-100 text-green-600"
                                  : "bg-red-100 text-red-600"
                          }`}>
                          {app.status}
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/dashboard/applications/${app._id}`}
                          className="p-2.5 bg-gray-50 text-brand-blue rounded-xl hover:bg-brand-yellow transition-all">
                          <Eye size={18} />
                        </Link>
                        <a
                          href={app.cvUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2.5 bg-gray-50 text-brand-blue rounded-xl hover:bg-brand-blue hover:text-white transition-all">
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
                    className="py-20 text-center text-[10px] font-black uppercase text-gray-300">
                    No Applications Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-8 py-5 bg-gray-50/50 flex justify-between items-center border-t border-gray-100">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic">
            Page {meta.page} of {meta.totalPage}
          </span>
          <div className="flex gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="p-2 bg-white border rounded-xl hover:border-brand-yellow disabled:opacity-20 transition-all">
              <ChevronLeft size={18} />
            </button>
            <button
              disabled={page === meta.totalPage}
              onClick={() => setPage((p) => p + 1)}
              className="p-2 bg-white border rounded-xl hover:border-brand-yellow disabled:opacity-20 transition-all">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationsPage;

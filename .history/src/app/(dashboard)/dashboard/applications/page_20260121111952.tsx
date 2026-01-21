"use client";

import React, { useEffect, useState, useCallback } from "react";
import { ApplicationService } from "@/services/ApplicationService";
import {
  FileText,
  Mail,
  Phone,
  ExternalLink,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Briefcase,
  User,
} from "lucide-react";
import { toast } from "sonner";

const ApplicationsPage = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
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
      });
      setApplications(res.data);
      setMeta(res.meta);
    } catch (error) {
      toast.error("Failed to load applications");
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  const handleStatusUpdate = async (id: string, status: string) => {
    try {
      await ApplicationService.updateStatus(id, status);
      toast.success(`Status updated to ${status}`);
      fetchApplications();
    } catch (error) {
      toast.error("Update failed");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-brand-blue tracking-tighter italic uppercase">
            Applications
          </h1>
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-1">
            Review candidate submissions
          </p>
        </div>
      </div>

      <div className="bg-white rounded-4xl border border-gray-100 overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">
                Candidate
              </th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">
                Job Information
              </th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">
                Status
              </th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">
                Resume
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading ? (
              <tr>
                <td
                  colSpan={4}
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
                  className="hover:bg-gray-50/50 transition-colors">
                  {/* ক্যান্ডিডেট ইনফো */}
                  <td className="px-8 py-6">
                    <div className="flex flex-col">
                      <span className="font-bold text-brand-blue text-sm flex items-center gap-2">
                        <User
                          size={14}
                          className="text-gray-300"
                        />{" "}
                        {app.name}
                      </span>
                      <span className="text-[10px] text-gray-400 font-bold flex items-center gap-2 mt-1 lowercase">
                        <Mail size={10} /> {app.email}
                      </span>
                      <span className="text-[10px] text-gray-400 font-bold flex items-center gap-2 mt-1">
                        <Phone size={10} /> {app.phone}
                      </span>
                    </div>
                  </td>

                  {/* জব ইনফো - এখানেই jobId এবং Title ম্যাচ করা হয়েছে */}
                  <td className="px-8 py-6">
                    <div className="flex flex-col">
                      <span className="font-black text-brand-blue text-[11px] uppercase tracking-tight flex items-center gap-2">
                        <Briefcase
                          size={14}
                          className="text-brand-yellow"
                        />{" "}
                        {app.job?.title}
                      </span>
                      <span className="text-[9px] bg-brand-light text-brand-blue px-2 py-0.5 rounded mt-1 w-fit font-bold uppercase tracking-widest italic border border-brand-blue/5">
                        ID: {app.job?.jobId}
                      </span>
                    </div>
                  </td>

                  {/* স্ট্যাটাস আপডেট ড্রপডাউন */}
                  <td className="px-8 py-6">
                    <select
                      value={app.status}
                      onChange={(e) =>
                        handleStatusUpdate(app._id, e.target.value)
                      }
                      className={`text-[10px] font-black uppercase tracking-widest px-3 py-2 rounded-xl outline-none border-none cursor-pointer
                        ${
                          app.status === "pending"
                            ? "bg-orange-50 text-orange-600"
                            : app.status === "reviewed"
                              ? "bg-blue-50 text-blue-600"
                              : app.status === "shortlisted"
                                ? "bg-green-50 text-green-600"
                                : "bg-red-50 text-red-600"
                        }`}>
                      <option value="pending">Pending</option>
                      <option value="reviewed">Reviewed</option>
                      <option value="shortlisted">Shortlisted</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </td>

                  {/* সিভি লিংক */}
                  <td className="px-8 py-6 text-right">
                    <a
                      href={app.cvUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 p-3 bg-gray-50 text-brand-blue rounded-xl hover:bg-brand-yellow transition-all">
                      <FileText size={18} />
                      <ExternalLink size={12} />
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="py-20 text-center text-gray-400 uppercase font-black tracking-widest text-[10px]">
                  No applications received yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="px-8 py-5 bg-gray-50/50 flex justify-between items-center border-t border-gray-100">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic font-mono">
            Page {meta.page} of {meta.totalPage}
          </span>
          <div className="flex gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="p-2 border rounded-xl hover:bg-white disabled:opacity-20 shadow-sm transition-all">
              <ChevronLeft size={18} />
            </button>
            <button
              disabled={page === meta.totalPage}
              onClick={() => setPage((p) => p + 1)}
              className="p-2 border rounded-xl hover:bg-white disabled:opacity-20 shadow-sm transition-all">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationsPage;

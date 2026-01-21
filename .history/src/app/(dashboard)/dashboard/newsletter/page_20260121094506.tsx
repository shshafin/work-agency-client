/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useEffect, useState, useCallback } from "react";
import {
  Trash2,
  Search,
  Loader2,
  Users,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
} from "lucide-react";
import { toast } from "sonner";
import { NewsletterService } from "@/services/NewsLetterService";

const NewsletterSubscribers = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [meta, setMeta] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPage: 1,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  // মোডাল স্টেট
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchSubscribers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await NewsletterService.getAllSubscribers({
        page,
        limit: 10,
        searchTerm,
      });
      setSubscribers(res.data);
      setMeta(res.meta);
    } catch (error) {
      toast.error("Failed to load subscribers");
    } finally {
      setLoading(false);
    }
  }, [page, searchTerm]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => fetchSubscribers(), 500);
    return () => clearTimeout(delayDebounceFn);
  }, [fetchSubscribers]);

  // ডিলিট কনফার্মেশন ফাংশন
  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      await NewsletterService.deleteSubscriber(deleteId);
      toast.success("Subscriber removed successfully");
      setDeleteId(null);
      fetchSubscribers();
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-brand-blue tracking-tighter italic uppercase">
            Subscribers
          </h1>
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-1 italic">
            Manage your audience
          </p>
        </div>

        <div className="relative w-full md:w-80">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search email..."
            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-100 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-brand-yellow/30 transition-all"
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
          />
        </div>
      </div>

      <div className="bg-white rounded-4xl border border-gray-100 overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">
                Subscriber Email
              </th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">
                Join Date
              </th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">
                Action
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
            ) : subscribers.length > 0 ? (
              subscribers.map((s: any) => (
                <tr
                  key={s._id}
                  className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3 font-bold text-brand-blue">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <Users
                          size={16}
                          className="text-brand-blue"
                        />
                      </div>
                      {s.email}
                    </div>
                  </td>
                  <td className="px-8 py-6 text-xs text-gray-400 font-bold uppercase tracking-tighter">
                    {new Date(s.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button
                      onClick={() => setDeleteId(s._id)} // সরাসরি ডিলিট না করে আইডি সেট করছি
                      className="p-2.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={3}
                  className="py-20 text-center text-gray-400 uppercase font-black tracking-widest text-[10px] opacity-50">
                  No subscribers found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination Section */}
        <div className="px-8 py-5 bg-gray-50/50 flex justify-between items-center border-t border-gray-100">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic font-mono">
            Page {meta.page} of {meta.totalPage}
          </span>
          <div className="flex gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="p-2.5 bg-white border border-gray-200 rounded-xl hover:border-brand-yellow disabled:opacity-20 transition-all shadow-sm">
              <ChevronLeft size={18} />
            </button>
            <button
              disabled={page === meta.totalPage}
              onClick={() => setPage((p) => p + 1)}
              className="p-2.5 bg-white border border-gray-200 rounded-xl hover:border-brand-yellow disabled:opacity-20 transition-all shadow-sm">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* --- Custom Delete Modal --- */}
      {deleteId && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-brand-blue/30 backdrop-blur-md">
          <div className="bg-white w-full max-w-sm rounded-[3rem] p-10 shadow-2xl text-center space-y-6 animate-in zoom-in duration-300">
            <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <AlertTriangle size={40} />
            </div>
            <div>
              <h3 className="text-2xl font-black text-brand-blue tracking-tighter italic uppercase">
                Are you sure?
              </h3>
              <p className="text-gray-400 text-sm font-medium mt-2 leading-relaxed">
                This subscriber will be removed from your list and won&apos;t
                receive any more updates.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 py-4 bg-gray-100 text-gray-500 font-black rounded-2xl hover:bg-gray-200 transition-all uppercase text-[10px] tracking-[0.15em]">
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 py-4 bg-red-500 text-white font-black rounded-2xl hover:bg-red-600 transition-all shadow-lg shadow-red-500/20 uppercase text-[10px] tracking-[0.15em]">
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsletterSubscribers;

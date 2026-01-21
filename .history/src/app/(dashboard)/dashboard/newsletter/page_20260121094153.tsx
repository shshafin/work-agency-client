"use client";

import React, { useEffect, useState, useCallback } from "react";
import {
  Trash2,
  Search,
  Loader2,
  Users,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { toast } from "sonner";

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

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure? This will remove the email from your list."))
      return;
    try {
      await NewsletterService.deleteSubscriber(id);
      toast.success("Subscriber removed");
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
            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-100 rounded-2xl text-sm outline-none"
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
          />
        </div>
      </div>

      <div className="bg-white rounded-[2rem] border border-gray-100 overflow-hidden shadow-sm">
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
                      <Users
                        size={18}
                        className="text-gray-300"
                      />
                      {s.email}
                    </div>
                  </td>
                  <td className="px-8 py-6 text-xs text-gray-400 font-bold">
                    {new Date(s.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button
                      onClick={() => handleDelete(s._id)}
                      className="p-2 text-red-400 hover:bg-red-50 rounded-xl transition-all">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={3}
                  className="py-20 text-center text-gray-400 uppercase font-black tracking-widest text-[10px]">
                  No subscribers found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination Section */}
        <div className="px-8 py-5 bg-gray-50/50 flex justify-between items-center">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic">
            Page {meta.page} of {meta.totalPage}
          </span>
          <div className="flex gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="p-2 border rounded-xl hover:bg-white disabled:opacity-30">
              <ChevronLeft size={18} />
            </button>
            <button
              disabled={page === meta.totalPage}
              onClick={() => setPage((p) => p + 1)}
              className="p-2 border rounded-xl hover:bg-white disabled:opacity-30">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsletterSubscribers;

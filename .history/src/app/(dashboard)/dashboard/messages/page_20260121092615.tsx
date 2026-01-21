/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useEffect, useState, useCallback } from "react";
import { ContactService } from "@/services/ContactService";
import {
 
  MailOpen,
  CheckCheck,
  Trash2,
  Search,
  ChevronLeft,
  ChevronRight,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";

const MessagesPage = () => {
  const [messages, setMessages] = useState([]);
  const [meta, setMeta] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPage: 1,
  });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);

  // ডিলিট মোডাল স্টেট
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchMessages = useCallback(async () => {
    setLoading(true);
    try {
      const query: any = { page, limit: 10, sort: "-createdAt" };
      if (searchTerm) query.searchTerm = searchTerm;
      if (statusFilter) query.status = statusFilter;

      const res = await ContactService.getAllContacts(query);
      setMessages(res.data);
      setMeta(res.meta);
    } catch (error) {
      toast.error("Failed to load messages");
    } finally {
      setLoading(false);
    }
  }, [page, searchTerm, statusFilter]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => fetchMessages(), 500);
    return () => clearTimeout(delayDebounceFn);
  }, [fetchMessages]);

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      await ContactService.updateStatus(id, newStatus);
      toast.success(`Marked as ${newStatus}`);
      fetchMessages();
    } catch (error) {
      toast.error("Status update failed");
    }
  };

  const handleDeleteContact = async () => {
    if (!deleteId) return;
    try {
      await ContactService.deleteContact(deleteId);
      toast.success("Message deleted successfully");
      setDeleteId(null);
      fetchMessages();
    } catch (error) {
      toast.error("Failed to delete message");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-brand-blue tracking-tighter italic uppercase">
            Inbox
          </h1>
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-1 italic">
            Customer Inquiries
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-100 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-brand-yellow/30 transition-all"
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
            />
          </div>
          <select
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            className="px-4 py-3 bg-white border border-gray-100 rounded-2xl text-sm font-bold text-brand-blue outline-none cursor-pointer">
            <option value="">All Status</option>
            <option value="new">New</option>
            <option value="read">Read</option>
            <option value="replied">Replied</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50/50 border-b border-gray-100">
              <tr>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">
                  Sender
                </th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">
                  Subject & Message
                </th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">
                  Status
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
                    colSpan={4}
                    className="py-20 text-center">
                    <Loader2
                      className="animate-spin mx-auto text-brand-yellow"
                      size={32}
                    />
                  </td>
                </tr>
              ) : messages.length > 0 ? (
                messages.map((msg: any) => (
                  <tr
                    key={msg._id}
                    className={`hover:bg-gray-50/20 transition-colors ${msg.status === "new" ? "bg-brand-yellow/[0.02]" : ""}`}>
                    <td className="px-8 py-6 align-top">
                      <p className="font-bold text-brand-blue leading-none mb-1">
                        {msg.name}
                      </p>
                      <p className="text-[10px] text-gray-400 font-medium mb-2 truncate max-w-[150px]">
                        {msg.email}
                      </p>
                      <p className="text-[9px] text-gray-300 font-bold uppercase">
                        {new Date(msg.createdAt).toLocaleDateString()}
                      </p>
                    </td>
                    <td className="px-8 py-6 max-w-lg">
                      <p className="text-xs font-black text-brand-blue uppercase tracking-tight mb-1">
                        {msg.subject}
                      </p>
                      <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                        {msg.message}
                      </p>
                    </td>
                    <td className="px-8 py-6">
                      <span
                        className={`px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest ${
                          msg.status === "new"
                            ? "bg-blue-100 text-blue-600"
                            : msg.status === "read"
                              ? "bg-gray-100 text-gray-600"
                              : "bg-green-100 text-green-600"
                        }`}>
                        {msg.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right align-top">
                      <div className="flex items-center justify-end gap-1.5">
                        {msg.status === "new" && (
                          <button
                            onClick={() => handleUpdateStatus(msg._id, "read")}
                            title="Mark as Read"
                            className="p-2.5 text-blue-500 hover:bg-blue-50 rounded-xl transition-all">
                            <MailOpen size={18} />
                          </button>
                        )}
                        <button
                          onClick={() => handleUpdateStatus(msg._id, "replied")}
                          title="Mark as Replied"
                          className="p-2.5 text-green-500 hover:bg-green-50 rounded-xl transition-all">
                          <CheckCheck size={18} />
                        </button>
                        <button
                          onClick={() => setDeleteId(msg._id)}
                          title="Delete Message"
                          className="p-2.5 text-red-400 hover:bg-red-50 rounded-xl transition-all">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="py-20 text-center text-gray-400 font-black uppercase tracking-widest text-xs opacity-50">
                    Inbox is empty
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-8 py-5 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic font-mono">
            Page {meta.page} of {meta.totalPage}
          </p>
          <div className="flex gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="p-2.5 bg-white border border-gray-100 rounded-xl hover:border-brand-yellow disabled:opacity-20 transition-all">
              <ChevronLeft size={20} />
            </button>
            <button
              disabled={page === meta.totalPage}
              onClick={() => setPage((p) => p + 1)}
              className="p-2.5 bg-white border border-gray-100 rounded-xl hover:border-brand-yellow disabled:opacity-20 transition-all">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* --- Delete Confirmation Modal --- */}
      {deleteId && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-brand-blue/30 backdrop-blur-md">
          <div className="bg-white w-full max-w-sm rounded-[3rem] p-10 shadow-2xl text-center space-y-6">
            <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <AlertCircle size={40} />
            </div>
            <div>
              <h3 className="text-2xl font-black text-brand-blue tracking-tighter italic uppercase">
                Delete Message?
              </h3>
              <p className="text-gray-400 text-sm font-medium mt-2 leading-relaxed">
                This message will be permanently removed from the database.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 py-4 bg-gray-100 text-gray-500 font-black rounded-2xl hover:bg-gray-200 transition-all uppercase text-[10px] tracking-widest">
                Cancel
              </button>
              <button
                onClick={handleDeleteContact}
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

export default MessagesPage;

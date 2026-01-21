"use client";

import React, { useEffect, useState, useCallback } from "react";
import { ContactService } from "@/services/ContactService";
import {
  MailOpen,
  CheckCheck,
  Trash2,
  Search,
  Eye,
  ChevronLeft,
  ChevronRight,
  Loader2,
  AlertCircle,
  X,
  User,
  Calendar,
  Tag,
} from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

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

  // Modal States
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [viewMessage, setViewMessage] = useState<any | null>(null);

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
      if (viewMessage) setViewMessage({ ...viewMessage, status: newStatus });
      fetchMessages();
    } catch (error) {
      toast.error("Status update failed");
    }
  };

  const handleViewDetails = async (id: string) => {
    try {
      const res = await ContactService.getSingleContact(id);
      setViewMessage(res.data);
      // যদি মেসেজ 'new' থাকে, ভিউ করার সাথে সাথে ওটাকে 'read' মার্ক করে দেওয়া ভালো
      if (res.data.status === "new") {
        handleUpdateStatus(id, "read");
      }
    } catch (error) {
      toast.error("Could not load message details");
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
        <h1 className="text-3xl font-black text-brand-blue tracking-tighter italic uppercase">
          Inbox
        </h1>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-100 rounded-xl text-sm outline-none"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 bg-white border border-gray-100 rounded-xl text-sm font-bold text-brand-blue outline-none">
            <option value="">All Status</option>
            <option value="new">New</option>
            <option value="read">Read</option>
            <option value="replied">Replied</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] border border-gray-100 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">
                  Sender
                </th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">
                  Message Content
                </th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">
                  Status
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
                    colSpan={4}
                    className="py-20 text-center">
                    <Loader2
                      className="animate-spin mx-auto text-brand-yellow"
                      size={32}
                    />
                  </td>
                </tr>
              ) : (
                messages.map((msg: any) => (
                  <tr
                    key={msg._id}
                    className={`hover:bg-gray-50/50 transition-colors ${msg.status === "new" ? "font-bold" : ""}`}>
                    <td className="px-8 py-5">
                      <p className="text-sm text-brand-blue">{msg.name}</p>
                      <p className="text-[10px] text-gray-400 font-medium">
                        {msg.email}
                      </p>
                    </td>
                    <td className="px-8 py-5 max-w-xs md:max-w-md">
                      <p className="text-xs text-brand-blue uppercase font-black truncate">
                        {msg.subject}
                      </p>
                      <p className="text-xs text-gray-400 truncate">
                        {msg.message}
                      </p>
                    </td>
                    <td className="px-8 py-5 text-[10px] font-black uppercase tracking-widest">
                      <span
                        className={
                          msg.status === "new"
                            ? "text-blue-500"
                            : msg.status === "read"
                              ? "text-gray-400"
                              : "text-green-500"
                        }>
                        {msg.status}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleViewDetails(msg._id)}
                          className="p-2 text-brand-blue hover:bg-blue-50 rounded-lg">
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => setDeleteId(msg._id)}
                          className="p-2 text-red-400 hover:bg-red-50 rounded-lg">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {/* Pagination Logic Here (Same as before) */}
      </div>

      {/* --- Single View Modal --- */}
      {viewMessage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-blue/60 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white w-full max-w-2xl rounded-[2.5rem] overflow-hidden shadow-2xl">
            <div className="bg-brand-blue p-6 text-white flex justify-between items-center">
              <h3 className="text-lg font-black uppercase tracking-tighter italic">
                Message Details
              </h3>
              <button
                onClick={() => setViewMessage(null)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-brand-blue">
                    <User size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase">
                      Sender
                    </p>
                    <p className="text-sm font-bold text-brand-blue">
                      {viewMessage.name}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-brand-blue">
                    <Calendar size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase">
                      Date
                    </p>
                    <p className="text-sm font-bold text-brand-blue">
                      {new Date(viewMessage.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <div className="flex items-center gap-2 mb-2 text-brand-yellow">
                  <Tag size={14} />
                  <p className="text-[10px] font-black uppercase tracking-widest">
                    Subject
                  </p>
                </div>
                <p className="text-brand-blue font-black italic">
                  {viewMessage.subject}
                </p>
                <div className="h-px bg-gray-200 my-4" />
                <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">
                  {viewMessage.message}
                </p>
              </div>

              <div className="flex justify-between items-center pt-4">
                <div className="flex gap-2">
                  <span
                    className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest ${viewMessage.status === "replied" ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600"}`}>
                    Status: {viewMessage.status}
                  </span>
                </div>
                {viewMessage.status !== "replied" && (
                  <button
                    onClick={() =>
                      handleUpdateStatus(viewMessage._id, "replied")
                    }
                    className="px-6 py-3 bg-brand-yellow text-brand-blue font-black rounded-xl text-xs uppercase hover:bg-brand-blue hover:text-white transition-all">
                    Mark as Replied
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* --- Delete Modal (Same as before) --- */}
      {deleteId && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-blue/30 backdrop-blur-sm">
          <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl text-center">
            <AlertCircle
              size={40}
              className="mx-auto text-red-500 mb-4"
            />
            <h3 className="text-xl font-bold">Delete permanently?</h3>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 py-3 bg-gray-100 rounded-xl font-bold">
                Cancel
              </button>
              <button
                onClick={handleDeleteContact}
                className="flex-1 py-3 bg-red-500 text-white rounded-xl font-bold">
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

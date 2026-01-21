/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useEffect, useState, useCallback } from "react";
import { UserService } from "@/services/UserService";
import { useAuthStore } from "@/store/useAuthStore";
import {
  Trash2,
  ShieldAlert,
  ShieldCheck,
  Loader2,
  Search,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
} from "lucide-react";
import { toast } from "sonner";

const UsersList = () => {
  const { user: currentUser } = useAuthStore();
  const [users, setUsers] = useState([]);
  const [meta, setMeta] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPage: 1,
  });
  const [loading, setLoading] = useState(true);

  // Filtering & Pagination States
  const [searchTerm, setSearchTerm] = useState("");
  const [role, setRole] = useState("");
  const [page, setPage] = useState(1);

  // Modal & Processing States
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [processingId, setProcessingId] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const query: any = { page, limit: 10 };
      if (searchTerm) query.searchTerm = searchTerm;
      if (role) query.role = role;

      const res = await UserService.getAllUsers(query);

      // (id and userId both check for safety)
      const filteredUsers = res.data.filter(
        (u: any) => u._id !== currentUser?.userId && u._id !== currentUser?._id,
      );

      setUsers(filteredUsers);
      setMeta(res.meta);
    } catch (error) {
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  }, [page, searchTerm, role, currentUser]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchUsers();
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [fetchUsers]);

  const handleStatusToggle = async (id: string, currentStatus: string) => {
    setProcessingId(id);
    const newStatus = currentStatus === "active" ? "blocked" : "active";
    try {
      await UserService.updateUser(id, { status: newStatus });
      toast.success(`User status updated to ${newStatus}`);
      fetchUsers();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Status update failed");
    } finally {
      setProcessingId(null);
    }
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      await UserService.deleteUser(deleteId);
      toast.success("User removed successfully");
      setDeleteId(null);
      fetchUsers();
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-brand-blue tracking-tighter italic uppercase">
            Team Members
          </h1>
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-1 italic">
            Control Access and Status
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
              placeholder="Search users..."
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-100 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-brand-yellow/50 transition-all shadow-sm"
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
            />
          </div>
          <select
            onChange={(e) => {
              setRole(e.target.value);
              setPage(1);
            }}
            className="px-4 py-3 bg-white border border-gray-100 rounded-2xl text-sm font-bold text-brand-blue outline-none shadow-sm cursor-pointer">
            <option value="">All Roles</option>
            <option value="admin">Admin</option>
            <option value="super_admin">Super Admin</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50/50 border-b border-gray-100">
              <tr>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">
                  User Identity
                </th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">
                  Role
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
              ) : users.length > 0 ? (
                users.map((u: any) => (
                  <tr
                    key={u._id}
                    className="hover:bg-gray-50/30 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-11 h-11 rounded-2xl bg-brand-blue text-brand-yellow flex items-center justify-center font-black shadow-md italic">
                          {u.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-brand-blue leading-none mb-1.5">
                            {u.name}
                          </p>
                          <p className="text-[10px] text-gray-400 font-medium tracking-tight">
                            {u.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-[9px] font-black uppercase tracking-[0.15em] px-2.5 py-1 bg-gray-100 rounded-lg text-brand-blue">
                        {u.role.replace("_", " ")}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <span
                        className={`px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest ${
                          u.status === "active"
                            ? "bg-green-50 text-green-600"
                            : "bg-red-50 text-red-600"
                        }`}>
                        {u.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          disabled={processingId === u._id}
                          onClick={() => handleStatusToggle(u._id, u.status)}
                          title={
                            u.status === "active"
                              ? "Block User"
                              : "Unblock User"
                          }
                          className={`p-2.5 rounded-xl transition-all ${
                            u.status === "active"
                              ? "text-orange-500 hover:bg-orange-50"
                              : "text-green-500 hover:bg-green-50"
                          }`}>
                          {processingId === u._id ? (
                            <Loader2
                              size={18}
                              className="animate-spin"
                            />
                          ) : u.status === "active" ? (
                            <ShieldAlert size={18} />
                          ) : (
                            <ShieldCheck size={18} />
                          )}
                        </button>

                        <button
                          onClick={() => setDeleteId(u._id)}
                          className="p-2.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all">
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
                    No Data Available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* --- Pagination Footer --- */}
        <div className="px-8 py-5 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic">
            Page {meta.page} of {meta.totalPage}
          </p>
          <div className="flex gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="p-2.5 bg-white border border-gray-100 rounded-xl hover:border-brand-yellow disabled:opacity-20 transition-all shadow-sm">
              <ChevronLeft size={20} />
            </button>
            <button
              disabled={page === meta.totalPage}
              onClick={() => setPage((p) => p + 1)}
              className="p-2.5 bg-white border border-gray-100 rounded-xl hover:border-brand-yellow disabled:opacity-20 transition-all shadow-sm">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* --- Delete Confirmation Modal --- */}
      {deleteId && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-6 bg-brand-blue/30 backdrop-blur-md">
          <div className="bg-white w-full max-w-sm rounded-[3rem] p-10 shadow-2xl text-center space-y-6 animate-in zoom-in duration-300">
            <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <AlertTriangle size={40} />
            </div>
            <div>
              <h3 className="text-2xl font-black text-brand-blue tracking-tighter italic uppercase">
                Security Alert
              </h3>
              <p className="text-gray-400 text-sm font-medium mt-2">
                Confirming this will permanently revoke this user&apos;s
                administrative access.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 py-4 bg-gray-100 text-gray-500 font-black rounded-2xl hover:bg-gray-200 transition-all uppercase text-xs tracking-[0.15em]">
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 py-4 bg-red-500 text-white font-black rounded-2xl hover:bg-red-600 transition-all shadow-lg shadow-red-500/20 uppercase text-xs tracking-[0.15em]">
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersList;

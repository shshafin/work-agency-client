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

  // Filtering States
  const [searchTerm, setSearchTerm] = useState("");
  const [role, setRole] = useState("");
  const [page, setPage] = useState(1);

  // Modal State
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const query: any = { page, limit: 10 };
      if (searchTerm) query.searchTerm = searchTerm;
      if (role) query.role = role;

      const res = await UserService.getAllUsers(query);

      // নিজের প্রোফাইল ফিল্টার করা (Backend থেকেও করা যায়, এখানেও নিরাপদ)
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
    }, 500); // Debounce search
    return () => clearTimeout(delayDebounceFn);
  }, [fetchUsers]);

  const handleStatusToggle = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "active" ? "blocked" : "active";
    try {
      await UserService.updateUser(id, { status: newStatus });
      toast.success(`User is now ${newStatus}`);
      fetchUsers();
    } catch (error) {
      toast.error("Status update failed");
    }
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      await UserService.deleteUser(deleteId);
      toast.success("User removed from team");
      setDeleteId(null);
      fetchUsers();
    } catch (error) {
      toast.error("Failed to delete user");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-black text-brand-blue tracking-tighter italic uppercase">
          Team Members
        </h1>

        {/* --- Search & Filter Bar --- */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search name or email..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-yellow outline-none transition-all"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            onChange={(e) => setRole(e.target.value)}
            className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-bold text-brand-blue outline-none">
            <option value="">All Roles</option>
            <option value="admin">Admin</option>
            <option value="super_admin">Super Admin</option>
          </select>
        </div>
      </div>

      {/* --- Table Section --- */}
      <div className="bg-white rounded-[2rem] border border-gray-100 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50/50 border-b border-gray-100">
              <tr>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">
                  User Details
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
                    className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-brand-blue text-brand-yellow flex items-center justify-center font-black">
                          {u.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-brand-blue leading-none mb-1">
                            {u.name}
                          </p>
                          <p className="text-xs text-gray-400">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className="text-[10px] font-black uppercase tracking-widest px-2 py-1 bg-gray-100 rounded-md text-brand-blue">
                        {u.role.replace("_", " ")}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <button
                        onClick={() => handleStatusToggle(u._id, u.status)}
                        className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest transition-all ${
                          u.status === "active"
                            ? "bg-green-100 text-green-600 hover:bg-green-200"
                            : "bg-red-100 text-red-600 hover:bg-red-200"
                        }`}>
                        {u.status}
                      </button>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <button
                        onClick={() => setDeleteId(u._id)}
                        className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="py-10 text-center text-gray-400 text-sm">
                    No members found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* --- Pagination --- */}
        <div className="px-8 py-4 bg-gray-50/30 border-t border-gray-100 flex items-center justify-between">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
            Page {meta.page} of {meta.totalPage}
          </p>
          <div className="flex gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="p-2 border border-gray-200 rounded-lg hover:bg-white disabled:opacity-30 transition-all">
              <ChevronLeft size={18} />
            </button>
            <button
              disabled={page === meta.totalPage}
              onClick={() => setPage((p) => p + 1)}
              className="p-2 border border-gray-200 rounded-lg hover:bg-white disabled:opacity-30 transition-all">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* --- Custom Delete Modal --- */}
      {deleteId && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-blue/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-sm rounded-[2.5rem] p-8 shadow-2xl space-y-6 text-center">
            <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto">
              <AlertTriangle size={40} />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-brand-blue">
                Are you sure?
              </h3>
              <p className="text-sm text-gray-500 font-medium">
                This action will remove the user from your team access. This
                cannot be undone easily.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 py-4 bg-gray-100 text-gray-600 font-black rounded-2xl hover:bg-gray-200 transition-all">
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 py-4 bg-red-500 text-white font-black rounded-2xl hover:bg-red-600 transition-all shadow-lg shadow-red-500/30">
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersList;

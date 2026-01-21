"use client";

import React, { useEffect, useState } from "react";
import { UserService } from "@/services/UserService";
import {
  Trash2,
  ShieldAlert,
  ShieldCheck,
  MoreVertical,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await UserService.getAllUsers();
      setUsers(res.data);
    } catch (error) {
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

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

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      await UserService.deleteUser(id);
      toast.success("User deleted successfully");
      fetchUsers();
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  if (loading)
    return (
      <div className="h-96 flex items-center justify-center">
        <Loader2
          className="animate-spin text-brand-blue"
          size={40}
        />
      </div>
    );

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-black text-brand-blue tracking-tighter italic uppercase">
          Team Members
        </h1>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">
                User
              </th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">
                Role
              </th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">
                Status
              </th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {users.map((u: any) => (
              <tr
                key={u._id}
                className="hover:bg-gray-50 transition-colors">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-blue flex items-center justify-center text-brand-yellow font-black uppercase">
                      {u.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-brand-blue">{u.name}</p>
                      <p className="text-xs text-gray-400">{u.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6 uppercase text-[10px] font-black tracking-widest text-brand-blue">
                  {u.role.replace("_", " ")}
                </td>
                <td className="px-8 py-6">
                  <span
                    className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                      u.status === "active"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}>
                    {u.status}
                  </span>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleStatusToggle(u._id, u.status)}
                      title={
                        u.status === "active" ? "Block User" : "Activate User"
                      }
                      className={`p-2 rounded-lg transition-colors ${u.status === "active" ? "text-orange-500 hover:bg-orange-50" : "text-green-500 hover:bg-green-50"}`}>
                      {u.status === "active" ? (
                        <ShieldAlert size={18} />
                      ) : (
                        <ShieldCheck size={18} />
                      )}
                    </button>
                    <button
                      onClick={() => handleDelete(u._id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersList;

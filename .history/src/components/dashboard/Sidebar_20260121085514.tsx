"use client";

import { useAuthStore } from "@/store/useAuthStore";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  MessageSquare,
  LogOut,
  UserCircle,
  X,
  ChevronDown,
  UserPlus,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const SidebarContent = ({ pathname, user, logout, setIsOpen }: any) => {
  const [isUsersOpen, setIsUsersOpen] = useState(false); // ড্রপডাউন স্টেট

  const menuItems = [
    {
      name: "Overview",
      icon: <LayoutDashboard size={20} />,
      path: "/dashboard",
    },
    {
      name: "Manage Jobs",
      icon: <Briefcase size={20} />,
      path: "/dashboard/jobs",
    },
    {
      name: "Messages",
      icon: <MessageSquare size={20} />,
      path: "/dashboard/messages",
    },
    {
      name: "My Profile",
      icon: <UserCircle size={20} />,
      path: "/dashboard/profile",
    },
  ];

  return (
    <div className="flex flex-col h-full bg-brand-blue p-6 shadow-2xl">
      <div className="mb-10 flex items-center justify-between px-4">
        <h2 className="text-2xl font-black italic text-brand-yellow uppercase tracking-tighter">
          ER Admin
        </h2>
        <button
          className="lg:hidden text-white"
          onClick={() => setIsOpen(false)}>
          <X size={28} />
        </button>
      </div>

      <nav className="flex-1 space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            onClick={() => setIsOpen(false)}
            className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 ${
              pathname === item.path
                ? "bg-brand-yellow text-brand-blue font-bold"
                : "hover:bg-white/10 text-blue-100/60"
            }`}>
            {item.icon}{" "}
            <span className="text-sm font-semibold">{item.name}</span>
          </Link>
        ))}

        {/* --- Team Management Dropdown (Only for Super Admin) --- */}
        {user?.role === "super_admin" && (
          <div className="space-y-1">
            <button
              onClick={() => setIsUsersOpen(!isUsersOpen)}
              className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${
                pathname.includes("/dashboard/users")
                  ? "text-brand-yellow"
                  : "text-blue-100/60 hover:bg-white/10"
              }`}>
              <div className="flex items-center gap-4">
                <Users size={20} />{" "}
                <span className="text-sm font-semibold">Team Members</span>
              </div>
              <ChevronDown
                size={16}
                className={`transition-transform ${isUsersOpen ? "rotate-180" : ""}`}
              />
            </button>

            {isUsersOpen && (
              <div className="pl-12 space-y-1 animate-in slide-in-from-top-2 duration-300">
                <Link
                  href="/dashboard/users"
                  onClick={() => setIsOpen(false)}
                  className={`block py-3 text-xs font-bold uppercase tracking-widest ${pathname === "/dashboard/users" ? "text-brand-yellow" : "text-blue-100/40 hover:text-white"}`}>
                  All Members
                </Link>
                <Link
                  href="/dashboard/users/create"
                  onClick={() => setIsOpen(false)}
                  className={`block py-3 text-xs font-bold uppercase tracking-widest ${pathname === "/dashboard/users/create" ? "text-brand-yellow" : "text-blue-100/40 hover:text-white"}`}>
                  Add New Admin
                </Link>
              </div>
            )}
          </div>
        )}
      </nav>

      <div className="pt-6 border-t border-white/10">
        <button
          onClick={logout}
          className="w-full flex items-center gap-4 p-4 text-red-400 hover:bg-red-500 hover:text-white rounded-2xl transition-all group">
          <LogOut size={20} />{" "}
          <span className="text-sm font-black uppercase tracking-widest">
            Logout
          </span>
        </button>
      </div>
    </div>
  );
};

// ... Sidebar wrapper component remains the same
export default Sidebar;

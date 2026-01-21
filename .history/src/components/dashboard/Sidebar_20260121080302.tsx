"use client";

import { useAuthStore } from "@/store/useAuthStore";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  MessageSquare,
  LogOut,
  UserCircle,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const Sidebar = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}) => {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();

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
      name: "Profile Settings",
      icon: <UserCircle size={20} />,
      path: "/dashboard/profile",
    },
  ];

  if (user?.role === "super_admin") {
    menuItems.push({
      name: "Team Members",
      icon: <Users size={20} />,
      path: "/dashboard/users",
    });
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-brand-blue p-6">
      <div className="mb-10 flex items-center justify-between px-4">
        <h2 className="text-2xl font-black italic text-brand-yellow tracking-tighter">
          ER Admin
        </h2>
        <button
          className="lg:hidden text-white"
          onClick={() => setIsOpen(false)}>
          <X size={24} />
        </button>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            onClick={() => setIsOpen(false)}
            className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
              pathname === item.path
                ? "bg-brand-yellow text-brand-blue font-bold shadow-lg shadow-brand-yellow/20"
                : "hover:bg-white/10 text-blue-100/60"
            }`}>
            {item.icon} <span className="text-sm">{item.name}</span>
          </Link>
        ))}
      </nav>

      {/* User Info & Logout */}
      <div className="pt-6 border-t border-white/10">
        <div className="flex items-center gap-3 px-4 mb-4">
          <div className="w-10 h-10 rounded-full bg-brand-yellow/20 flex items-center justify-center text-brand-yellow font-black border border-brand-yellow/30">
            {user?.name?.charAt(0) || user?.email?.charAt(0).toUpperCase()}
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-bold truncate text-white">
              {user?.name || "Admin User"}
            </p>
            <p className="text-[10px] text-blue-100/40 uppercase font-black tracking-widest">
              {user?.role}
            </p>
          </div>
        </div>
        <button
          onClick={logout}
          className="w-full flex items-center gap-4 p-4 text-red-400 hover:bg-red-500/10 rounded-xl transition-all text-sm font-bold">
          <LogOut size={20} /> Logout
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 lg:hidden backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`
        fixed inset-y-0 left-0 z-50 w-72 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <SidebarContent />
      </aside>
    </>
  );
};

export default Sidebar;

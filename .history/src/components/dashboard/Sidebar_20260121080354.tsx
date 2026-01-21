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
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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

  // --- এই সেই SidebarContent যা তুই খুঁজছিস ---
  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-brand-blue p-6 shadow-2xl">
      {/* Logo & Close Button */}
      <div className="mb-10 flex items-center justify-between px-4">
        <h2 className="text-2xl font-black italic text-brand-yellow tracking-tighter uppercase">
          ER Admin
        </h2>
        {/* মোবাইলে ক্লোজ বাটন */}
        <button
          className="lg:hidden text-white hover:text-brand-yellow transition-colors"
          onClick={() => setIsOpen(false)}>
          <X size={28} />
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            onClick={() => setIsOpen(false)} // মোবাইলে ক্লিক করলে স্লাইড মেনু বন্ধ হবে
            className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 ${
              pathname === item.path
                ? "bg-brand-yellow text-brand-blue font-bold shadow-lg shadow-brand-yellow/20"
                : "hover:bg-white/10 text-blue-100/60"
            }`}>
            <div
              className={`${pathname === item.path ? "scale-110" : "opacity-70"}`}>
              {item.icon}
            </div>
            <span className="text-sm font-semibold tracking-wide">
              {item.name}
            </span>
          </Link>
        ))}
      </nav>

      {/* Footer / User Info */}
      <div className="pt-6 border-t border-white/10">
        <div className="flex items-center gap-4 px-4 mb-6 bg-white/5 p-4 rounded-2xl border border-white/5">
          <div className="w-10 h-10 rounded-xl bg-brand-yellow flex items-center justify-center text-brand-blue font-black shadow-lg">
            {user?.name?.charAt(0) || user?.email?.charAt(0).toUpperCase()}
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-black truncate text-white leading-none mb-1">
              {user?.name || "Admin User"}
            </p>
            <p className="text-[9px] text-brand-yellow font-black uppercase tracking-[0.2em] opacity-70">
              {user?.role?.replace("_", " ")}
            </p>
          </div>
        </div>

        <button
          onClick={logout}
          className="w-full flex items-center gap-4 p-4 text-red-400 hover:bg-red-500/10 rounded-2xl transition-all text-sm font-black uppercase tracking-widest">
          <LogOut size={20} /> Logout
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* ১. মোবাইল স্ক্রিনে ব্যাকগ্রাউন্ড ঝাপসা করার জন্য Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-brand-blue/60 z-50 lg:hidden backdrop-blur-md transition-all duration-500"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* ২. মেইন সাইডবার কন্টেইনার */}
      <aside
        className={`
        fixed inset-y-0 left-0 z-50 w-72 transform transition-transform duration-500 ease-in-out lg:relative lg:translate-x-0
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <SidebarContent />
      </aside>
    </>
  );
};

export default Sidebar;

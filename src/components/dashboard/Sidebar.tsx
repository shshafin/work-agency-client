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
  Mail,
  PlusCircle,
  List,
  FileSpreadsheet, // অ্যাপ্লিকেশনের জন্য নতুন আইকন
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SidebarContent = ({
  pathname,
  user,
  logout,
  setIsOpen,
}: {
  pathname: string;
  user: any;
  logout: () => void;
  setIsOpen: (val: boolean) => void;
}) => {
  // ড্রপডাউন স্টেট: পাথ অনুযায়ী অটোমেটিক ওপেন থাকবে
  const [isUsersOpen, setIsUsersOpen] = useState(
    pathname.includes("/dashboard/users"),
  );
  const [isJobsOpen, setIsJobsOpen] = useState(
    pathname.includes("/dashboard/jobs"),
  );

  // সাধারণ মেনু আইটেম (যেগুলোর ড্রপডাউন নেই)
  const menuItems = [
    {
      name: "Applications",
      icon: <FileSpreadsheet size={20} />,
      path: "/dashboard/applications",
    },
    {
      name: "Messages",
      icon: <MessageSquare size={20} />,
      path: "/dashboard/messages",
    },
    {
      name: "Newsletters",
      icon: <Mail size={20} />,
      path: "/dashboard/newsletter",
    },
    {
      name: "My Profile",
      icon: <UserCircle size={20} />,
      path: "/dashboard/profile",
    },
  ];

  return (
    <div className="flex flex-col h-full bg-brand-blue p-6 shadow-2xl overflow-y-auto no-scrollbar">
      {/* 1. Header & Close Button */}
      <div className="mb-10 flex items-center justify-between px-4 shrink-0">
        <h2 className="text-2xl font-black italic text-brand-yellow tracking-tighter uppercase">
          ER Admin
        </h2>
        <button
          className="lg:hidden text-white hover:text-brand-yellow transition-colors"
          onClick={() => setIsOpen(false)}>
          <X size={28} />
        </button>
      </div>

      {/* 2. Navigation Section */}
      <nav className="flex-1 space-y-2">
        {/* Overview Item */}
        <Link
          href="/dashboard"
          onClick={() => setIsOpen(false)}
          className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 ${
            pathname === "/dashboard"
              ? "bg-brand-yellow text-brand-blue font-bold shadow-lg shadow-brand-yellow/20"
              : "hover:bg-white/10 text-blue-100/60"
          }`}>
          <LayoutDashboard size={20} />
          <span className="text-sm font-semibold tracking-wide">Overview</span>
        </Link>

        {/* --- Manage Jobs Dropdown --- */}
        <div className="pt-1">
          <button
            onClick={() => setIsJobsOpen(!isJobsOpen)}
            className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-300 ${
              pathname.includes("/dashboard/jobs")
                ? "bg-white/5 text-brand-yellow"
                : "text-blue-100/60 hover:bg-white/10"
            }`}>
            <div className="flex items-center gap-4">
              <Briefcase size={20} />
              <span className="text-sm font-semibold tracking-wide">
                Manage Jobs
              </span>
            </div>
            <motion.div
              animate={{ rotate: isJobsOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}>
              <ChevronDown size={18} />
            </motion.div>
          </button>

          <AnimatePresence>
            {isJobsOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden">
                <div className="pl-12 py-2 space-y-1">
                  <Link
                    href="/dashboard/jobs"
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 py-3 text-[10px] font-black uppercase tracking-[0.2em] transition-colors ${
                      pathname === "/dashboard/jobs"
                        ? "text-brand-yellow"
                        : "text-blue-100/30 hover:text-white"
                    }`}>
                    <List size={14} /> All Vacancies
                  </Link>
                  <Link
                    href="/dashboard/jobs/create"
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 py-3 text-[10px] font-black uppercase tracking-[0.2em] transition-colors ${
                      pathname === "/dashboard/jobs/create"
                        ? "text-brand-yellow"
                        : "text-blue-100/30 hover:text-white"
                    }`}>
                    <PlusCircle size={14} /> Post New Job
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Regular Menu Items (Including Applications) */}
        {menuItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            onClick={() => setIsOpen(false)}
            className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 ${
              pathname === item.path
                ? "bg-brand-yellow text-brand-blue font-bold shadow-lg shadow-brand-yellow/20"
                : "hover:bg-white/10 text-blue-100/60"
            }`}>
            {item.icon}
            <span className="text-sm font-semibold tracking-wide">
              {item.name}
            </span>
          </Link>
        ))}

        {/* --- Team Management Dropdown (Only for Super Admin) --- */}
        {user?.role === "super_admin" && (
          <div className="pt-1">
            <button
              onClick={() => setIsUsersOpen(!isUsersOpen)}
              className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-300 ${
                pathname.includes("/dashboard/users")
                  ? "bg-white/5 text-brand-yellow"
                  : "text-blue-100/60 hover:bg-white/10"
              }`}>
              <div className="flex items-center gap-4">
                <Users size={20} />
                <span className="text-sm font-semibold tracking-wide">
                  Team Members
                </span>
              </div>
              <motion.div
                animate={{ rotate: isUsersOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}>
                <ChevronDown size={18} />
              </motion.div>
            </button>

            <AnimatePresence>
              {isUsersOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden">
                  <div className="pl-12 py-2 space-y-1">
                    <Link
                      href="/dashboard/users"
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-3 py-3 text-[10px] font-black uppercase tracking-[0.2em] transition-colors ${
                        pathname === "/dashboard/users"
                          ? "text-brand-yellow"
                          : "text-blue-100/30 hover:text-white"
                      }`}>
                      All Admins
                    </Link>
                    <Link
                      href="/dashboard/users/create"
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-3 py-3 text-[10px] font-black uppercase tracking-[0.2em] transition-colors ${
                        pathname === "/dashboard/users/create"
                          ? "text-brand-yellow"
                          : "text-blue-100/30 hover:text-white"
                      }`}>
                      Add New Admin
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </nav>

      {/* 3. Logout Section */}
      <div className="pt-6 border-t border-white/10 shrink-0">
        <button
          onClick={logout}
          className="w-full flex items-center gap-4 p-4 text-red-400 hover:bg-red-500 hover:text-white rounded-2xl transition-all duration-300 group">
          <div className="p-2 bg-red-500/10 group-hover:bg-white/20 rounded-lg transition-colors">
            <LogOut size={20} />
          </div>
          <span className="text-sm font-black uppercase tracking-widest">
            Logout Account
          </span>
        </button>
      </div>
    </div>
  );
};

// Sidebar wrapper component remains the same
const Sidebar = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}) => {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-brand-blue/60 z-50 lg:hidden backdrop-blur-md"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      <aside
        className={`
        fixed inset-y-0 left-0 z-50 w-72 transform transition-transform duration-500 ease-in-out lg:relative lg:translate-x-0
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <SidebarContent
          pathname={pathname}
          user={user}
          logout={logout}
          setIsOpen={setIsOpen}
        />
      </aside>
    </>
  );
};

export default Sidebar;

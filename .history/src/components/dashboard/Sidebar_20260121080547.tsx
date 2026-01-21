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

  return (
    <div className="flex flex-col h-full bg-brand-blue p-6 shadow-2xl">
      <div className="mb-10 flex items-center justify-between px-4">
        <h2 className="text-2xl font-black italic text-brand-yellow tracking-tighter uppercase">
          ER Admin
        </h2>
        <button
          className="lg:hidden text-white hover:text-brand-yellow transition-colors"
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
                ? "bg-brand-yellow text-brand-blue font-bold shadow-lg shadow-brand-yellow/20"
                : "hover:bg-white/10 text-blue-100/60"
            }`}>
            {item.icon}
            <span className="text-sm font-semibold tracking-wide">
              {item.name}
            </span>
          </Link>
        ))}
      </nav>

      {/* লগআউট বাটন - ক্লিন এবং সুন্দর */}
      <div className="pt-6 border-t border-white/10">
        <button
          onClick={logout}
          className="w-full flex items-center gap-4 p-4 text-red-400 hover:bg-red-500 hover:text-white rounded-2xl transition-all duration-300 group">
          <div className="p-2 bg-red-500/10 group-hover:bg-white/20 rounded-lg transition-colors">
            <LogOut size={20} />
          </div>
          <span className="text-sm font-black uppercase tracking-widest">
            Logout
          </span>
        </button>
      </div>
    </div>
  );
};

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
      {isOpen && (
        <div
          className="fixed inset-0 bg-brand-blue/60 z-50 lg:hidden backdrop-blur-md transition-all duration-500"
          onClick={() => setIsOpen(false)}
        />
      )}

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

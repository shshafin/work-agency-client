"use client";

import { useAuthStore } from "@/store/useAuthStore";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  MessageSquare,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
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
  ];

  if (user?.role === "super_admin") {
    menuItems.push({
      name: "Team Members",
      icon: <Users size={20} />,
      path: "/dashboard/users",
    });
  }

  return (
    <aside className="w-72 bg-brand-blue text-white flex flex-col p-6 shrink-0">
      <div className="mb-10 px-4">
        <h2 className="text-2xl font-black italic text-brand-yellow">
          ER Admin
        </h2>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
              pathname === item.path
                ? "bg-brand-yellow text-brand-blue font-bold shadow-lg"
                : "hover:bg-white/5 text-blue-100/60"
            }`}>
            {item.icon} {item.name}
          </Link>
        ))}
      </nav>

      <div className="pt-6 border-t border-white/10">
        <button
          onClick={logout}
          className="w-full flex items-center gap-4 p-4 text-red-400 hover:bg-red-500/10 rounded-xl transition-all">
          <LogOut size={20} /> Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

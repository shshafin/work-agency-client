"use client";


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

  // শুধুমাত্র Super Admin দের জন্য User Management
  if (user?.role === "super_admin") {
    menuItems.push({
      name: "Team Members",
      icon: <Users size={20} />,
      path: "/dashboard/users",
    });
  }

  return (
    <aside className="w-72 bg-brand-blue text-white flex flex-col p-6">
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
                ? "bg-brand-yellow text-brand-blue font-bold"
                : "hover:bg-white/5 text-blue-100/60"
            }`}>
            {item.icon} {item.name}
          </Link>
        ))}
      </nav>

      <div className="pt-6 border-t border-white/10 space-y-4">
        <div className="px-4">
          <p className="text-xs text-white/40 uppercase font-black">
            {user?.role}
          </p>
          <p className="text-sm font-bold truncate">{user?.email}</p>
        </div>
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

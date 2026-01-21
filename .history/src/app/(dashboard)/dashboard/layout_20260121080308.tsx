"use client";

import Sidebar from "@/components/dashboard/Sidebar";
import { useAuthStore } from "@/store/useAuthStore";
import { useState } from "react";
import { Menu, Bell, Search } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { token, user } = useAuthStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (!token) return null;

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-4 md:px-8 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg text-brand-blue"
              onClick={() => setIsSidebarOpen(true)}>
              <Menu size={24} />
            </button>
            <div className="hidden md:flex items-center gap-2 bg-gray-50 border border-gray-100 px-4 py-2 rounded-xl text-gray-400">
              <Search size={18} />
              <input
                type="text"
                placeholder="Quick search..."
                className="bg-transparent outline-none text-sm w-48"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-6">
            <button className="relative p-2 text-gray-400 hover:text-brand-blue transition-colors">
              <Bell size={22} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>

            <div className="h-8 w-px bg-gray-100 hidden md:block" />

            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="text-right hidden md:block">
                <p className="text-sm font-black text-brand-blue leading-none">
                  {user?.name || "Admin"}
                </p>
                <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">
                  Super Admin
                </p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-brand-blue flex items-center justify-center text-brand-yellow font-black shadow-lg shadow-brand-blue/20">
                {user?.email?.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-8 lg:p-10 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}

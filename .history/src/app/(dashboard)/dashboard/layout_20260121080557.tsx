"use client";

import Sidebar from "@/components/dashboard/Sidebar";
import { useAuthStore } from "@/store/useAuthStore";
import { useState } from "react";
import { Menu } from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { token, user } = useAuthStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (!token) return null;

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 sticky top-0 z-40">
           <div className="flex items-center gap-4">
              <button 
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg text-brand-blue"
                onClick={() => setIsSidebarOpen(true)}
              >
                <Menu size={24} />
              </button>
              <h2 className="text-xs font-black text-brand-blue uppercase tracking-widest hidden md:block">
                Dashboard Overview
              </h2>
           </div>

           <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-xs font-black text-brand-blue leading-none">{user?.name || user?.email?.split('@')[0]}</p>
                <p className="text-[9px] text-brand-yellow font-bold uppercase mt-1 tracking-tighter">
                  {user?.role?.replace('_', ' ')}
                </p>
              </div>
              <div className="w-8 h-8 rounded-lg bg-brand-blue flex items-center justify-center text-brand-yellow font-black text-xs shadow-md">
                 {user?.email?.charAt(0).toUpperCase()}
              </div>
           </div>
        </header>

        <main className="flex-1 p-6 md:p-8 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
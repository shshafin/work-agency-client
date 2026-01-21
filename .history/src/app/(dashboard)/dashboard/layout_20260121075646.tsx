"use client";

import Sidebar from "@/components/dashboard/Sidebar";
import { useAuthStore } from "@/store/useAuthStore";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { token } = useAuthStore();

  // সার্ভার সাইড মিডলওয়্যার প্রোটেক্ট করলেও ক্লায়েন্ট সাইডে ব্ল্যাংক স্ক্রিন প্রিভেন্ট করে
  if (!token) return null;

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-8">
          <h2 className="text-sm font-bold text-brand-blue uppercase">
            Control Panel
          </h2>
          <span className="text-[10px] font-black text-gray-300">v1.0.4</span>
        </header>
        <main className="flex-1 p-6 md:p-10 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}

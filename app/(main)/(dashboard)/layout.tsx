"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "@/componnents/dashboard/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 shadow-sm lg:hidden">
        <div className="w-8" />
        <h1 className="text-lg font-bold text-slate-900">
          Employee Management
        </h1>

        <button
          onClick={() => setIsOpen(true)}
          className="rounded-xl p-2 hover:bg-slate-100"
        >
          <Menu size={24} />
        </button>
      </header>

      <main className="min-h-screen p-2 sm:p-6 lg:ml-70 lg:p-8">
        {children}
      </main>
    </div>
  );
}

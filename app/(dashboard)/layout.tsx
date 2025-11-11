"use client";

import { Bell, Menu, Search, Settings, X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { type ReactNode, Suspense, useState } from "react";
import Sidebar from "./Sidebar";

type Props = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const searchParams = useSearchParams();

  return (
    <div className="min-h-screen bg-slate-50">
      <Suspense fallback={<div>Loading...</div>}>
        <div className="flex h-screen overflow-hidden">
          <Sidebar
            isMobileOpen={isSidebarOpen}
            onMobileClose={() => setIsSidebarOpen(false)}
          />

          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Header */}
            <header className="sticky top-0 z-40 border-b border-slate-200 bg-white shadow-sm">
              <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 lg:hidden"
                    aria-label="Toggle sidebar"
                  >
                    {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
                  </button>
                  <div className="hidden sm:block">
                    <p className="text-xs font-medium text-slate-500">
                      E-Commerce
                    </p>
                    <h1 className="text-lg font-semibold text-slate-900">
                      Dashboard
                    </h1>
                  </div>
                </div>

                {/* Search Bar */}
                <div className="hidden flex-1 mx-8 lg:block">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search..."
                      className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                {/* Header Actions */}
                <div className="flex items-center gap-2 sm:gap-3">
                  <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition">
                    <Bell size={20} />
                  </button>
                  <button className="hidden sm:flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 hover:bg-slate-50 transition">
                    <Settings size={18} />
                    Settings
                  </button>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-emerald-500 bg-emerald-50 text-sm font-semibold text-emerald-700">
                    U
                  </div>
                </div>
              </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 overflow-auto bg-slate-50">{children}</main>
          </div>
        </div>
      </Suspense>
    </div>
  );
}

"use client";

import {
  BarChart3,
  Box,
  Clock,
  HelpCircle,
  LayoutDashboard,
  LifeBuoy,
  LogOut,
  Settings,
  ShoppingBag,
  Users,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

type SidebarProps = {
  isMobileOpen: boolean;
  onMobileClose: () => void;
};

const Sidebar = ({ isMobileOpen, onMobileClose }: SidebarProps) => {
  const pathname = usePathname();

  const links = useMemo(
    () => [
      { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
      { href: "/dashboard/product", label: "Products", icon: Box },
      { href: "/dashboard/orders", label: "Orders", icon: ShoppingBag },
      { href: "/dashboard/customers", label: "Customers", icon: Users },
      { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
      { href: "/dashboard/settings", label: "Settings", icon: Settings },
    ],
    []
  );

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 lg:hidden ${
          isMobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onMobileClose}
      />

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-300 lg:static lg:translate-x-0 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo Section */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-600 text-lg font-bold text-white">
              P
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500">Pulse</p>
              <h1 className="text-base font-semibold text-slate-900">
                Control
              </h1>
            </div>
          </Link>
          <button
            onClick={onMobileClose}
            className="rounded-lg lg:hidden p-1.5 text-slate-600 hover:bg-slate-100"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-6">
          <div className="mb-6">
            <p className="px-2 mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Management
            </p>
            <div className="space-y-1">
              {links.map(({ href, label, icon: Icon }) => {
                const isActive =
                  pathname === href || pathname.startsWith(`${href}/`);
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={onMobileClose}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                      isActive
                        ? "bg-emerald-50 text-emerald-700"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    <Icon size={18} />
                    <span>{label}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Status Card */}
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white border border-slate-200">
                <Clock size={16} className="text-slate-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  Sync Active
                </p>
                <p className="text-xs text-slate-600">Updating inventory</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Last synced 2m ago</span>
            </div>
          </div>
        </nav>

        {/* Footer Actions */}
        <div className="border-t border-slate-200 px-4 py-4 space-y-1">
          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 transition">
            <HelpCircle size={18} />
            <span>Help & Support</span>
          </button>
          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 transition">
            <LifeBuoy size={18} />
            <span>Documentation</span>
          </button>
          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 transition hover:text-red-600">
            <LogOut size={18} />
            <span>Sign out</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

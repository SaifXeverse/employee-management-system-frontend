"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  UserPlus,
  LogOut,
  BriefcaseBusiness,
  ChevronRight,
  X,
  User,
  ClipboardClock
} from "lucide-react";
import useAuth from "@/hooks/admin/useAuth";

const menu = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Employees",
    href: "/admin/employees",
    icon: Users,
  },
  {
    title: "Add Employee",
    href: "/admin/employees/add",
    icon: UserPlus,
  },
  {
    title: "Pending Approvals",
    href: "/admin/permission",
    icon: ClipboardClock,
  },
  {
    title: "Profile",
    href: "/admin/profile",
    icon: User,
  },
];

type SidebarProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const { handleLogout } = useAuth();
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/admin/employees/add") {
      return pathname === "/admin/employees/add";
    }

    if (href === "/employees") {
      return (
        pathname === "/admin/employees" ||
        /^\/employees\/\d+$/.test(pathname) ||
        /^\/employees\/\d+\/edit$/.test(pathname)
      );
    }

    return pathname === href;
  };

  return (
    <>
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity lg:hidden ${
          isOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      />

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-72 flex-col border-r border-slate-800 bg-[#0F172A] transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="border-b border-slate-800 px-6 py-6">
          <div className="flex items-center justify-between lg:justify-start">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-violet-600 to-blue-600 shadow-lg">
                <BriefcaseBusiness className="text-white" size={28} />
              </div>

              <div>
                <h1 className="text-2xl font-bold text-white">Employee</h1>

                <p className="text-sm text-slate-400">Management System</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-xl p-2 text-white hover:bg-slate-800 lg:hidden"
            >
              <X size={22} />
            </button>
          </div>
        </div>
        <nav className="mt-8 flex-1 px-5">
          <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-widest text-slate-500">
            Main Menu
          </p>

          {menu.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                replace
                onClick={() => setIsOpen(false)}
                className={`group mb-2 flex items-center justify-between rounded-2xl px-5 py-4 transition-all duration-300 ${
                  active
                    ? "bg-linear-to-r from-violet-600 to-blue-600 text-white shadow-lg"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-4">
                  <Icon size={21} />

                  <span className="text-[15px] font-medium">{item.title}</span>
                </div>

                <ChevronRight
                  size={18}
                  className={`transition-all duration-300 ${
                    active
                      ? "translate-x-1 opacity-100"
                      : "opacity-0 group-hover:translate-x-1 group-hover:opacity-100"
                  }`}
                />
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-slate-800 p-5">
          <button
            onClick={handleLogout}
            className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-2xl border border-red-500 py-4 font-semibold text-red-400 transition-all hover:bg-red-500 hover:text-white"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
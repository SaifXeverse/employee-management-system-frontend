"use client";

import useAuthEmployee from "@/hooks/employee/useAuthEmployee";
import useEmployeeDashboard from "@/hooks/employee/useEmployeeDashboard";
import {
  User,
  CalendarCheck,
  ClipboardList,
  ShieldCheck,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const { handleLogout } = useAuthEmployee();
  const { employee } = useEmployeeDashboard();
  const router = useRouter();
  console.log(employee);
  



  const cards = [
    {
      title: "My Profile",
      desc: "View & update your profile",
      href: "/profile",
      icon: User,
      color: "from-[#FF4B2B] to-[#FF416C]",
    },
    {
      title: "Attendance",
      desc: "Check your attendance history",
      href: "/dashboard",
      icon: CalendarCheck,
      color: "from-sky-500 to-cyan-500",
    },
    {
      title: "Leave Requests",
      desc: "View your leave requests",
      href: "/dashboard",
      icon: ClipboardList,
      color: "from-emerald-500 to-green-500",
    },
    {
      title: "Permissions",
      desc: "View your account permissions",
      href: "/dashboard",
      icon: ShieldCheck,
      color: "from-violet-500 to-fuchsia-500",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="bg-linear-to-r from-[#FF4B2B] to-[#FF416C] shadow-xl">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-5 px-6 py-8 md:flex-row md:items-center">
          <div>
            <h1 className="text-4xl font-bold text-white">Welcome Back 👋</h1>

            <p className="mt-2 text-white/90">Employee Dashboard</p>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-full border border-white px-6 py-3 font-semibold text-white transition hover:bg-white hover:text-[#FF416C]"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="rounded-3xl bg-white p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-slate-800">
            Hello {employee.name} 👋
          </h2>

          <p className="mt-3 text-slate-500">
            Welcome to your employee portal. From here you can manage your
            profile, view attendance, check leave requests and review your
            permissions.
          </p>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {cards.map((card) => {
            const Icon = card.icon;

            return (
              <button
                key={card.title}
                onClick={() => router.replace(card.href!)}
                className="group rounded-3xl bg-white p-6 cursor-pointer text-left shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-r ${card.color}`}
                >
                  <Icon size={30} className="text-white" />
                </div>

                <h3 className="mt-6 text-xl font-bold text-slate-800">
                  {card.title}
                </h3>

                <p className="mt-2 text-sm text-slate-500">{card.desc}</p>

                <div className="mt-6 flex items-center gap-2 font-semibold text-[#FF416C]">
                  Open
                  <ChevronRight
                    size={18}
                    className="transition group-hover:translate-x-1"
                  />
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-10 rounded-3xl bg-white p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-slate-800">Recent Activity</h2>

          {/* <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
              <span>✅ Logged in successfully</span>
              <span className="text-sm text-slate-500">Today</span>
            </div>

            <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
              <span>📄 Profile updated</span>
              <span className="text-sm text-slate-500">Yesterday</span>
            </div>

            <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
              <span>📝 Leave request submitted</span>
              <span className="text-sm text-slate-500">2 days ago</span>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

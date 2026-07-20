"use client";

import {
  User,
  LogOut,
  ChevronRight,
  FileUserIcon,
  Eye,
  File,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logoutEmployee } from "@/store/slices/employeeAuthSlice";
import { getEmployeeProfile } from "@/store/slices/employeeDashboardSlice";
import { useEffect } from "react";
import { getSocket } from "@/libs/socket";
import { AddResumeModal } from "./modal/AddResumeModal";
import Link from "next/link";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { employee } = useAppSelector((state) => state.employeeDashboard);
  const router = useRouter();

  useEffect(() => {
    dispatch(getEmployeeProfile());
    const socket = getSocket();

    socket.on("employeeProfileUpdated", () => {
      dispatch(getEmployeeProfile());
    });
    socket.on("employeeResumeUploaded", () => {
      dispatch(getEmployeeProfile());
    });

    return () => {
      socket.off("employeeProfileUpdated");
      socket.off("employeeResumeUploaded");
    };
  }, [dispatch]);

  const handleLogout = async () => {
    await dispatch(logoutEmployee());
    router.replace("/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="bg-linear-to-r from-slate-900 via-slate-800 to-blue-900 shadow-lg">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-5 px-6 py-8 md:flex-row md:items-center">
          <div>
            <h1 className="text-4xl font-bold text-white">Welcome Back</h1>
            <p className="mt-2 text-slate-300">Employee Dashboard</p>
          </div>

          <button
            onClick={handleLogout}
            className="flex cursor-pointer items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur transition hover:bg-white hover:text-slate-900"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-3 py-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-slate-800">
            Hello, {employee?.name} 👋
          </h2>

          <p className="mt-3 leading-7 text-slate-500">
            Welcome to your employee portal. Manage your profile and upload
            resume.
          </p>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          <button
            onClick={() => router.replace("/profile")}
            className="cursor-pointer rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-md transition-all duration-300 hover:-translate-y-2 hover:border-blue-500 hover:shadow-xl"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#1b388a] transition">
              <User size={30} className="text-white" />
            </div>
            <h3 className="mt-6 text-xl font-semibold text-slate-800">
              My Profile
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              View & update your profile
            </p>
            <div className="mt-6 flex items-center gap-2 font-semibold text-[#1b388a]">
              Open
              <ChevronRight size={18} />
            </div>
          </button>
          <AddResumeModal />
          {employee?.resume && (
            <Link
              prefetch={false}
              target="_blank"
              href={employee?.resume!}
              className="cursor-pointer rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-md transition-all duration-300 hover:-translate-y-2 hover:border-blue-500 hover:shadow-xl"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#1b388a] transition">
                <File size={30} className="text-white" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-slate-800">
                View Resume
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                View your PDF or download your DOC/DOCX file anytime.
              </p>
              <div className="mt-6 flex items-center gap-2 font-semibold text-[#1b388a]">
                View
                <ChevronRight size={18} />
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

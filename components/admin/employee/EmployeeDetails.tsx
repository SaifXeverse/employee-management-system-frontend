"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Building2,
  DollarSign,
  Mail,
  Pencil,
  User,
  BadgeCheck,
  File,
  ShieldCheck,
  Eye,
  Trash2,
  Download,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  getEmployee,
  deleteEmployeeResumeByAdmin,
} from "@/store/slices/employeeSlice";
import Image from "next/image";
import { getSocket } from "@/libs/socket";

const EmployeeDetails = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const { employee } = useAppSelector((state) => state.employee);

  useEffect(() => {
    if (params.id) {
      dispatch(getEmployee(Number(params.id)));
    }
    const socket = getSocket();

    socket.on("employeeResumeUploaded", () => {
      dispatch(getEmployee(Number(params.id)));
    });
    socket.on("employeeProfileUpdated", () => {
      dispatch(getEmployee(Number(params.id)));
    });
    socket.on("employeeResumeDeleted", () => {
      dispatch(getEmployee(Number(params.id)));
    });
    socket.on("employeeResumeDeletedByAdmin", () => {
      dispatch(getEmployee(Number(params.id)));
    });
    socket.on("employeeUpdated", () => {
      dispatch(getEmployee(Number(params.id)));
    });

    return () => {
      socket.off("employeeResumeUploaded");
      socket.off("employeeProfileUpdated");
      socket.off("employeeResumeDeleted");
      socket.off("employeeResumeDeletedByAdmin");
      socket.off("employeeUpdated");
    };
  }, [params.id, dispatch]);

  const getAttachmentUrl = (url: string) => {
    if (!url) return "";
    const uploadParts = url.split("/upload/");
    return `${uploadParts[0]}/upload/fl_attachment/${uploadParts[1]}`;
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-6">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Employee Details
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Complete employee profile and information.
          </p>
        </div>
        <Link
          href="/admin/employees"
          replace
          prefetch={false}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium shadow-sm transition hover:bg-slate-50"
        >
          <ArrowLeft size={18} />
          Back
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
        <div className="bg-[#1b388a] px-6 py-8">
          <div className="flex flex-col items-center text-center">
            <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-full border-4 border-violet-200 bg-slate-100 shadow-md">
              {employee?.img ? (
                <Image
                  src={employee.img}
                  alt={employee.name}
                  width={200}
                  height={200}
                  loading="eager"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-[#1b388a]">
                  <User size={28} className="text-white" />
                </div>
              )}
            </div>
            <h2 className="mt-4 text-2xl font-bold text-white">
              {employee?.name?.toUpperCase()}
            </h2>
            <p className="mt-1 break-all text-sm text-white/80">
              {employee?.email}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 p-6 md:grid-cols-2">
          <div className="flex flex-col items-center rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100">
              <User size={20} className="text-blue-600" />
            </div>
            <p className="text-sm text-slate-500">Name</p>
            <h3 className="mt-2 break-all text-base font-semibold text-slate-900">
              {employee?.name}
            </h3>
          </div>

          <div className="flex flex-col items-center rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100">
              <Mail size={20} className="text-blue-600" />
            </div>
            <p className="text-sm text-slate-500">Email Address</p>
            <h3 className="mt-2 break-all text-base font-semibold text-slate-900">
              {employee?.email}
            </h3>
          </div>

          <div className="flex flex-col items-center rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-violet-100">
              <Building2 size={20} className="text-violet-600" />
            </div>
            <p className="text-sm text-slate-500">Department</p>
            <span className="mt-3 inline-flex rounded-full bg-violet-100 px-4 py-2 text-sm font-semibold text-violet-700">
              {employee?.department}
            </span>
          </div>

          <div className="flex flex-col items-center rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-green-100">
              <DollarSign size={20} className="text-green-600" />
            </div>
            <p className="text-sm text-slate-500">Salary</p>
            <h3 className="mt-2 text-2xl font-bold text-green-600">
              ${employee?.salary}
            </h3>
          </div>

          <div className="flex flex-col items-center rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-green-100">
              <ShieldCheck size={20} className="text-green-600" />
            </div>
            <p className="text-sm text-slate-500">Status</p>
            <h3 className="mt-2 text-2xl font-bold text-green-600">
              {employee?.status}
            </h3>
          </div>

          <div className="flex flex-col items-center rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-orange-100">
              <User size={20} className="text-orange-600" />
            </div>
            <p className="text-sm text-slate-500">Employee ID</p>
            <h3 className="mt-2 text-xl font-bold text-slate-900">
              #{params.id}
            </h3>
          </div>
          <div className="hidden md:block"></div>
          {employee?.resume ? (
            <div className="md:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm ">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100">
                  <File size={24} className="text-blue-600" />
                </div>
                <p className="text-sm text-slate-500">Resume</p>
                <h3 className="mt-2 text-xl font-semibold text-slate-900">
                  Resume Available
                </h3>
                <p className="mt-3 max-w-lg text-sm text-slate-500">
                  Click the button below to view or download the employee
                  resume.
                </p>
                <div className="mt-6 flex items-center justify-center gap-3">
                  <Link
                    href={employee.resume}
                    target="_blank"
                    prefetch={false}
                    className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-blue-700 hover:-translate-y-0.5 hover:shadow-lg"
                      >
                        <Eye size={18} />
                        View
                  </Link>
                   <Link
                        href={getAttachmentUrl(employee?.resume || "")}
                        prefetch={false}
                        className="inline-flex items-center gap-2 rounded-xl border border-blue-600 bg-white px-5 py-3 text-sm font-medium text-blue-600 transition-all duration-300 hover:bg-blue-50 hover:-translate-y-0.5 hover:shadow-lg"
                      >
                        <Download size={18} />
                        Download
                      </Link>
                  <button
                    onClick={() =>
                      dispatch(deleteEmployeeResumeByAdmin(employee.id!))
                    }
                    className="inline-flex items-center gap-2 rounded-xl bg-red-500 px-5 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-red-600 hover:-translate-y-0.5 hover:shadow-lg"
                      >
                        <Trash2 size={18} />
                        Delete
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="md:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100">
                  <File size={24} className="text-orange-600" />
                </div>
                <p className="text-sm text-slate-500">Resume</p>
                <h3 className="mt-2 text-xl font-semibold text-slate-900">
                  Resume Not Uploaded
                </h3>
                <p className="mt-3 max-w-lg text-sm text-slate-500">
                  This employee has not uploaded a resume yet.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4 border-t border-slate-200 bg-slate-50 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-green-600">
            <BadgeCheck size={20} />
            <span className="text-sm font-medium">
              Employee record is active
            </span>
          </div>

          <Link
            href={`/admin/employees/${params.id}/edit`}
            replace
            prefetch={false}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#1b388a] px-6 py-2.5 text-sm font-semibold text-white transition duration-300 hover:shadow-lg"
          >
            <Pencil size={18} />
            Edit Employee
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;

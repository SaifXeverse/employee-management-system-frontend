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
} from "lucide-react";

import useEmployee from "@/hooks/useEmployee";
import Image from "next/image";

const EmployeeDetails = () => {
  const params = useParams();

  const { inputs, getEmployee } = useEmployee();

  useEffect(() => {
    if (params.id) {
      getEmployee(Number(params.id));
    }
  }, [params.id]);

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
          prefetch={false}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium shadow-sm transition hover:bg-slate-50"
        >
          <ArrowLeft size={18} />
          Back
        </Link>
      </div>
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
        <div className="bg-linear-to-r from-violet-600 via-indigo-600 to-blue-600 px-6 py-8">
          <div className="flex flex-col items-center text-center">
            <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-full border-4 border-violet-200 bg-slate-100 shadow-md">
              {inputs.img ? (
                <Image
                  src={inputs.img}
                  alt={inputs.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-linear-to-r from-violet-600 to-blue-600">
                  <User size={28} className="text-white" />
                </div>
              )}
            </div>

            <h2 className="mt-4 text-2xl font-bold text-white">
              {inputs.name.toUpperCase()}
            </h2>

            <p className="mt-1 break-all text-sm text-white/80">
              {inputs.email}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 p-6 md:grid-cols-2">
          <div className="rounded-2xl border flex flex-col items-center border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100">
              <Mail size={20} className="text-blue-600" />
            </div>

            <p className="text-sm text-slate-500">Email Address</p>

            <h3 className="mt-2 break-all text-base font-semibold text-slate-900">
              {inputs.email}
            </h3>
          </div>

          <div className="rounded-2xl border flex flex-col items-center border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-violet-100">
              <Building2 size={20} className="text-violet-600" />
            </div>

            <p className="text-sm text-slate-500">Department</p>

            <span className="mt-3 inline-flex rounded-full bg-violet-100 px-4 py-2 text-sm font-semibold text-violet-700">
              {inputs.department}
            </span>
          </div>

          <div className="rounded-2xl border flex flex-col items-center border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-green-100">
              <DollarSign size={20} className="text-green-600" />
            </div>

            <p className="text-sm text-slate-500">Salary</p>

            <h3 className="mt-2 text-2xl font-bold text-green-600">
              ${inputs.salary}
            </h3>
          </div>

          <div className="rounded-2xl border flex flex-col items-center border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-orange-100">
              <User size={20} className="text-orange-600" />
            </div>

            <p className="text-sm text-slate-500">Employee ID</p>

            <h3 className="mt-2 text-xl font-bold text-slate-900">
              #{params.id}
            </h3>
          </div>
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
            prefetch={false}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-violet-600 to-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition duration-300 hover:shadow-lg"
          >
            <Pencil size={18} />
            Edit Employee
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EmployeeDetails;
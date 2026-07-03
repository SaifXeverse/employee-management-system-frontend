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

export default function EmployeeDetails() {
  const params = useParams();

  const { inputs, getEmployee } = useEmployee();

  useEffect(() => {
    if (params.id) {
      getEmployee(Number(params.id));
    }
  }, [params.id]);

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-4xl font-bold text-slate-900">
            Employee Details
          </h1>

          <p className="mt-2 text-slate-500">
            Complete employee profile and information.
          </p>
        </div>

        <Link
          href="/employees"
          prefetch={false}
          className="flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 shadow-sm transition hover:bg-slate-50"
        >
          <ArrowLeft size={18} />
          Back
        </Link>
      </div>

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="bg-linear-to-r from-violet-600 via-indigo-600 to-blue-600 px-10 py-12">
          <div className="flex flex-col items-center">
            <div className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-white bg-white text-5xl font-bold text-violet-700 shadow-lg">
              {inputs.name?.charAt(0).toUpperCase() || "E"}
            </div>

            <h2 className="mt-5 text-3xl font-bold text-white">
              {inputs.name}
            </h2>

            <div className="mt-3 rounded-full bg-white/20 px-5 py-2 text-sm text-white backdrop-blur">
              {inputs.department}
            </div>
          </div>
        </div>

        <div className="grid gap-6 p-8 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 p-6">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100">
              <Mail className="text-blue-600" />
            </div>

            <p className="text-sm text-slate-500">Email Address</p>

            <h3 className="mt-2 text-lg font-semibold text-slate-900">
              {inputs.email}
            </h3>
          </div>

          <div className="rounded-2xl border border-slate-200 p-6">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100">
              <Building2 className="text-violet-600" />
            </div>
            <p className="text-sm text-slate-500">Department</p>
            <span className="mt-3 inline-block rounded-full bg-violet-100 px-4 py-2 font-semibold text-violet-700">
              {inputs.department}
            </span>
          </div>

          <div className="rounded-2xl border border-slate-200 p-6">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100">
              <DollarSign className="text-green-600" />
            </div>
            <p className="text-sm text-slate-500">Salary</p>
            <h3 className="mt-2 text-3xl font-bold text-green-600">
              ${inputs.salary}
            </h3>
          </div>

          <div className="rounded-2xl border border-slate-200 p-6">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100">
              <User className="text-orange-600" />
            </div>
            <p className="text-sm text-slate-500">Employee ID</p>
            <h3 className="mt-2 text-lg font-semibold">#{params.id}</h3>
          </div>
        </div>

        <div className="border-t border-slate-200 bg-slate-50 p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3 text-green-600">
              <BadgeCheck />
              <span className="font-medium">Employee record is active</span>
            </div>

            <Link
              href={`/employees/${params.id}/edit`}
              prefetch={false}
              className="flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-violet-600 to-blue-600 px-8 py-3 font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <Pencil size={18} />
              Edit Employee
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import {
  Building2,
  DollarSign,
  Mail,
  User,
  Save,
  ArrowLeft,
} from "lucide-react";
import { ChangeEvent, FormEvent } from "react";

export type EmployeeInputs = {
  name: string;
  email: string;
  department: string;
  salary: number | string;
};

type Props = {
  type: "add" | "edit";
  inputs: EmployeeInputs;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
};

export default function EmployeeForm({
  type,
  inputs,
  handleChange,
  handleSubmit,
}: Props) {
  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-slate-900">
            {type === "add" ? "Add Employee" : "Edit Employee"}
          </h1>

          <p className="mt-2 text-slate-500">
            {type === "add"
              ? "Create a new employee for your organization."
              : "Update employee information."}
          </p>
        </div>
        <Link
          prefetch={false}
          href="/employees"
          className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-slate-700 shadow-sm transition hover:bg-slate-50"
        >
          <ArrowLeft size={18} />
          Back
        </Link>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm"
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block font-semibold text-slate-700">
              Employee Name
            </label>

            <div className="flex h-14 items-center rounded-xl border border-slate-200 bg-slate-50 px-4 transition focus-within:border-violet-600 focus-within:bg-white">
              <User className="text-violet-600" size={20} />

              <input
                type="text"
                name="name"
                value={inputs.name}
                onChange={handleChange}
                placeholder="Ali Khan"
                className="ml-3 w-full bg-transparent outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block font-semibold text-slate-700">
              Email Address
            </label>

            <div className="flex h-14 items-center rounded-xl border border-slate-200 bg-slate-50 px-4 transition focus-within:border-violet-600 focus-within:bg-white">
              <Mail className="text-blue-600" size={20} />
              <input
                type="email"
                name="email"
                value={inputs.email}
                onChange={handleChange}
                placeholder="employee@gmail.com"
                className="ml-3 w-full bg-transparent outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block font-semibold text-slate-700">
              Department
            </label>

            <div className="flex h-14 items-center rounded-xl border border-slate-200 bg-slate-50 px-4 transition focus-within:border-violet-600 focus-within:bg-white">
              <Building2 className="text-green-600" size={20} />

              <select
                name="department"
                value={inputs.department}
                onChange={handleChange}
                className="ml-3 w-full bg-transparent outline-none"
                required
              >
                <option value="">Select Department</option>

                <option value="IT">IT</option>

                <option value="HR">HR</option>

                <option value="Finance">Finance</option>

                <option value="Marketing">Marketing</option>

                <option value="Sales">Sales</option>
              </select>
            </div>
          </div>

          <div>
            <label className="mb-2 block font-semibold text-slate-700">
              Salary
            </label>

            <div className="flex h-14 items-center rounded-xl border border-slate-200 bg-slate-50 px-4 transition focus-within:border-violet-600 focus-within:bg-white">
              <DollarSign className="text-orange-600" size={20} />

              <input
                type="number"
                name="salary"
                value={inputs.salary}
                onChange={handleChange}
                placeholder="5000"
                className="ml-3 w-full bg-transparent outline-none"
                required
              />
            </div>
          </div>
        </div>

        <div className="mt-10 flex justify-center gap-4">
          <Link
            prefetch={false}
            href="/employees"
            className="rounded-xl border border-slate-300 px-6 py-3 font-medium text-slate-700 transition hover:bg-slate-100"
          >
            Cancel
          </Link>

          <button
            type="submit"
            className="flex items-center gap-2 rounded-xl bg-linear-to-r from-violet-600 to-blue-600 px-8 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <Save size={18} />

            {type === "add" ? "Save Employee" : "Update Employee"}
          </button>
        </div>
      </form>
    </div>
  );
}

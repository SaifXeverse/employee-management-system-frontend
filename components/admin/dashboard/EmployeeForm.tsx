"use client";

import Link from "next/link";
import {
  Building2,
  DollarSign,
  Mail,
  User,
  Save,
  ArrowLeft,
  Camera,
  Lock,
  Shield,
  File,
} from "lucide-react";
import { ChangeEvent, FormEvent } from "react";
import { Employee } from "@/types/employeeType";

type Props = {
  type: "add" | "edit";
  inputs: Employee;
  handleUpload: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  handleDelete: () => Promise<void>;
  imageUrl: string;
  loading: boolean;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
};

const EmployeeForm = ({
  type,
  inputs,
  handleUpload,
  handleDelete,
  imageUrl,
  loading,
  handleChange,
  handleSubmit,
}: Props) => {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-0">
      <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            {type === "add" ? "Add Employee" : "Edit Employee"}
          </h1>

          <p className="mt-2 text-sm text-slate-500 sm:text-base">
            {type === "add"
              ? "Create a new employee for your organization."
              : "Update employee information."}
          </p>
        </div>

        <Link
          onClick={handleDelete}
          href="/admin/employees"
          replace
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-slate-700 shadow-sm transition hover:bg-slate-50 sm:w-auto"
        >
          <ArrowLeft size={18} />
          Back
        </Link>
      </div>
      <form
        onSubmit={handleSubmit}
        className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8 lg:p-10"
      >
        <div className="mb-8 flex flex-col items-center">
          <div className="relative">
            <div className="relative h-28 w-28 overflow-hidden rounded-full border-4 border-violet-200 bg-slate-100 shadow-lg">
              {inputs.img || imageUrl ? (
                <img
                  src={inputs.img || imageUrl}
                  alt="Employee"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-slate-100">
                  <User size={48} className="text-slate-400" />
                </div>
              )}

              {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                  <div className="h-10 w-10 animate-spin rounded-full border-4 border-white border-t-transparent"></div>
                </div>
              )}
            </div>

            <label
              htmlFor="profile"
              className={`absolute bottom-0 right-0 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-violet-600 text-white shadow-lg transition hover:bg-violet-700 ${
                loading ? "pointer-events-none opacity-60" : ""
              }`}
            >
              <Camera size={18} />
            </label>

            <input
              id="profile"
              type="file"
              accept="image/*"
              onChange={handleUpload}
              disabled={loading}
              className="hidden"
            />
          </div>

          <p className="mt-3 text-sm text-slate-500">
            {loading ? "Uploading image..." : "Upload Employee Profile"}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block font-semibold text-slate-700">
              Employee Name
            </label>
            <div className="flex h-12 items-center rounded-xl border border-slate-200 bg-slate-50 px-4 transition focus-within:border-violet-600 focus-within:bg-white sm:h-14">
              <User className="text-violet-600" size={20} />
              <input
                type="text"
                name="name"
                value={inputs.name}
                onChange={handleChange}
                placeholder="Saif Khan"
                className="ml-3 w-full min-w-0 bg-transparent text-sm outline-none sm:text-base"
                required
              />
            </div>
          </div>
          <div>
            <label className="mb-2 block font-semibold text-slate-700">
              Email Address
            </label>

            <div className="flex h-12 items-center rounded-xl border border-slate-200 bg-slate-50 px-4 transition focus-within:border-violet-600 focus-within:bg-white sm:h-14">
              <Mail className="text-blue-600" size={20} />

              <input
                type="email"
                name="email"
                value={inputs.email}
                onChange={handleChange}
                placeholder="employee@gmail.com"
                className="ml-3 w-full min-w-0 bg-transparent text-sm outline-none sm:text-base"
                required
              />
            </div>
          </div>
          <div>
            <label className="mb-2 block font-semibold text-slate-700">
              Password
            </label>

            <div className="flex h-12 items-center rounded-xl border border-slate-200 bg-slate-50 px-4 transition focus-within:border-violet-600 focus-within:bg-white sm:h-14">
              <Lock className="text-rose-600" size={20} />

              <input
                type="password"
                name="password"
                value={inputs.password}
                onChange={handleChange}
                placeholder={
                  type === "add"
                    ? "Enter password"
                    : "Leave blank to keep current password"
                }
                className="ml-3 w-full min-w-0 bg-transparent text-sm outline-none sm:text-base"
                required={type === "add"}
              />
            </div>
          </div>
          <div>
            <label className="mb-2 block font-semibold text-slate-700">
              Department
            </label>

            <div className="flex h-12 items-center rounded-xl border border-slate-200 bg-slate-50 px-4 transition focus-within:border-violet-600 focus-within:bg-white sm:h-14">
              <Building2 className="text-green-600" size={20} />

              <select
                name="department"
                value={inputs.department}
                onChange={handleChange}
                className="ml-3 w-full min-w-0 bg-transparent text-sm outline-none sm:text-base"
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
              Status
            </label>

            <div className="flex h-12 items-center rounded-xl border border-slate-200 bg-slate-50 px-4 transition focus-within:border-violet-600 focus-within:bg-white sm:h-14">
              <Shield className="text-emerald-600" size={20} />

              <select
                name="status"
                value={inputs.status}
                onChange={handleChange}
                className="ml-3 w-full min-w-0 bg-transparent text-sm outline-none sm:text-base"
                required
              >
                <option value="">Select Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
          <div>
            <label className="mb-2 block font-semibold text-slate-700">
              Salary
            </label>

            <div className="flex h-12 items-center rounded-xl border border-slate-200 bg-slate-50 px-4 transition focus-within:border-violet-600 focus-within:bg-white sm:h-14">
              <DollarSign className="text-orange-600" size={20} />

              <input
                type="number"
                name="salary"
                value={inputs.salary}
                onChange={handleChange}
                placeholder="5000"
                className="ml-3 w-full min-w-0 bg-transparent text-sm outline-none sm:text-base"
                required
              />
            </div>
          </div>
          {/* <div className="hidden md:block"></div>
          {type === "edit" && (
            inputs.resume ? (
            <div
              className="md:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100">
                  <File size={24} className="text-blue-600" />
                </div>
                <p className="text-sm text-slate-500">Resume</p>
                <h3 className="mt-2 text-xl font-semibold text-slate-900">
                  Resume Available
                </h3>
                <p className="mt-3 max-w-lg text-sm text-slate-500">
                  Click the button below to view or download the employee's
                  resume.
                </p>
                <div className="flex gap-4">
                <button className="mt-5 inline-flex rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">
                  View Resume
                </button>
                <button onClick={() => handleResumeDelete(inputs.id)} className="mt-5 inline-flex rounded-xl bg-red-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-600">
                  Delete Resume
                </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="md:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
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
          )
          )} */}
        </div>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link
            prefetch={false}
            href="/admin/employees"
            onClick={handleDelete}
            replace
            className="w-full rounded-xl border border-slate-300 px-6 py-3 text-center font-medium text-slate-700 transition hover:bg-slate-100 sm:w-auto"
          >
            Cancel
          </Link>

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#1b388a] px-8 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl sm:w-auto sm:hover:scale-105"
          >
            <Save size={18} />
            {type === "add" ? "Save Employee" : "Update Employee"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;

"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowUpDown,
  Eye,
  Pencil,
  Trash2,
  Search,
  UserPlus,
  Users,
} from "lucide-react";

import useEmployee from "@/hooks/useEmployee";

export default function EmployeeTable() {
  const { employees, handleDelete } = useEmployee();

  const [search, setSearch] = useState("");
  const [sortAsc, setSortAsc] = useState(true);

  const filteredEmployees = useMemo(() => {
    return [...employees]
      .filter((employee) =>
        employee.name.toLowerCase().includes(search.toLowerCase()),
      )
      .sort((a, b) =>
        sortAsc
          ? Number(a.salary) - Number(b.salary)
          : Number(b.salary) - Number(a.salary),
      );
  }, [employees, search, sortAsc]);

  return (
    <div className="rounded-3xl pb-3.5 border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-col gap-6 border-b border-slate-200 p-8 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-r from-violet-600 to-blue-600">
              <Users className="text-white" size={24} />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900">Employees</h2>

              <p className="text-slate-500">
                {employees.length} Employees Available
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 md:flex-row">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search employee..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 outline-none transition focus:border-violet-600 md:w-72"
            />
          </div>

          <button
            onClick={() => setSortAsc(!sortAsc)}
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 font-medium transition hover:bg-slate-100"
          >
            <ArrowUpDown size={18} />
            Salary
          </button>

          <Link
            prefetch={false}
            href="/employees/add"
            className="flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-violet-600 to-blue-600 px-6 py-3 font-semibold text-white transition hover:scale-105 hover:shadow-lg"
          >
            <UserPlus size={18} />
            Add Employee
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-slate-50">
              <th className="px-8 py-4 text-left text-sm font-semibold text-slate-600">
                Employee
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                Email
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                Department
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                Salary
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold text-slate-600">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="rounded-b-3xl rounded-bl-3xl">
            {filteredEmployees.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-20 text-center">
                  <Users size={55} className="mx-auto text-slate-300" />

                  <h3 className="mt-4 text-xl font-semibold text-slate-700">
                    No Employees Found
                  </h3>

                  <p className="mt-2 text-slate-500">
                    Try another search or add a new employee.
                  </p>
                </td>
              </tr>
            ) : (
              filteredEmployees.map((employee) => (
                <tr
                  key={employee.id}
                  className="border-t border-gray-200 transition hover:bg-slate-50"
                >
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-r from-violet-600 to-blue-600 text-lg font-bold text-white">
                        {employee.name.charAt(0).toUpperCase()}
                      </div>

                      <div>
                        <h4 className="font-semibold text-slate-900">
                          {employee.name}
                        </h4>

                        <p className="text-sm text-slate-500">Employee</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 text-slate-600">{employee.email}</td>

                  <td className="px-6">
                    <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
                      {employee.department}
                    </span>
                  </td>

                  <td className="px-6">
                    <span className="rounded-full bg-green-100 px-4 py-2 font-semibold text-green-700">
                      ${employee.salary}
                    </span>
                  </td>

                  <td>
                    <div className="flex justify-center gap-3">
                      <Link
                        prefetch={false}
                        href={`/employees/${employee.id}`}
                        className="rounded-xl bg-blue-100 p-2.5 text-blue-600 transition hover:bg-blue-200"
                      >
                        <Eye size={18} />
                      </Link>

                      <Link
                        prefetch={false}
                        href={`/employees/${employee.id}/edit`}
                        className="rounded-xl bg-emerald-100 p-2.5 text-emerald-600 transition hover:bg-emerald-200"
                      >
                        <Pencil size={18} />
                      </Link>

                      <button
                        onClick={() =>
                          handleDelete(employee.id!, employee.name)
                        }
                        className="rounded-xl bg-red-100 p-2.5 text-red-600 transition hover:bg-red-200"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

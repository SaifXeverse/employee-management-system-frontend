"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpDown,
  Eye,
  Pencil,
  Trash2,
  Search,
  UserPlus,
  Users,
  User,
  Trash2Icon,
} from "lucide-react";
import { useMemo, useState, useEffect } from "react";
import useUpload from "@/hooks/useUpload";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getEmployees, deleteEmployee } from "@/store/slices/employeeSlice";
import { getSocket } from "@/libs/socket";

const EmployeeTable = () => {
  const dispatch = useAppDispatch();
  const { employees } = useAppSelector((state) => state.employee);
  const [search, setSearch] = useState("");
  const [sortAsc, setSortAsc] = useState(true);

  useEffect(() => {
    dispatch(getEmployees());
    const socket = getSocket();

    socket.on("employeeCreated", () => {
      dispatch(getEmployees());
    });

    socket.on("employeeUpdated", () => {
      dispatch(getEmployees());
    });

    socket.on("employeeDeleted", () => {
      dispatch(getEmployees());
    });

    socket.on("employeeStatusChanged", () => {
      dispatch(getEmployees());
    });

    return () => {
      socket.off("employeeCreated");
      socket.off("employeeUpdated");
      socket.off("employeeDeleted");
      socket.off("employeeStatusChanged");
    };
  }, [dispatch]);

  const { handleDelete } = useUpload(() => {});

  const filteredEmployees = useMemo(() => {
    return employees
      .filter((employee) => {
        const employeeName = employee.name || "";
        return employeeName.toLowerCase().includes(search.toLowerCase());
      })
      .sort((a, b) =>
        sortAsc
          ? Number(a.salary) - Number(b.salary)
          : Number(b.salary) - Number(a.salary),
      );
  }, [employees, search, sortAsc]);

  const handleDeleted = async (imgId: string, id: number) => {
    if (imgId) {
      handleDelete(imgId);
    }
    await dispatch(deleteEmployee(id));
  };

  return (
    <div className="mx-auto w-full max-w-7xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-col gap-5 border-b border-slate-200 p-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1b388a]">
            <Users className="text-white" size={22} />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900">Employees</h2>

            <p className="text-sm text-slate-500">
              {employees.length} Employees Available
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="relative md:w-full">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search employee..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none transition focus:border-violet-600"
            />
          </div>

          <button
            onClick={() => setSortAsc(!sortAsc)}
            className="flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-sm font-medium transition hover:bg-slate-100"
          >
            <ArrowUpDown size={17} />
            Salary
          </button>

          <Link
            href="/admin/employees/add"
            replace
            prefetch={false}
            className="flex h-11 lg:w-3/5 items-center justify-center gap-2 rounded-xl bg-[#1b388a] px-4 text-sm font-semibold text-white transition hover:shadow-lg"
          >
            <UserPlus size={18} />
            Add Employee
          </Link>
        </div>
      </div>
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="px-5 text-left py-4 text-sm font-semibold text-slate-600">
                Employee
              </th>
              <th className="px-5 py-4 text-center text-sm font-semibold text-slate-600">
                Email
              </th>
              <th className="px-5 py-4 text-center text-sm font-semibold text-slate-600">
                Department
              </th>
              <th className="px-5 py-4 text-center text-sm font-semibold text-slate-600">
                Status
              </th>
              <th className="px-5 py-4 text-center text-sm font-semibold text-slate-600">
                Salary
              </th>
              <th className="px-5 py-4 text-center text-sm font-semibold text-slate-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-20 text-center">
                  <Users size={50} className="mx-auto text-slate-300" />
                  <h3 className="mt-4 text-lg font-semibold text-slate-700">
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
                  key={employee.id || 1}
                  className="border-b border-slate-100 transition hover:bg-violet-50"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-4">
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border-4 border-violet-200 bg-slate-100 shadow-md">
                        {employee.img ? (
                          <Image
                            src={employee.img}
                            alt={employee.name}
                            loading="eager"
                            width={200}
                            height={200}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-[#1b388a]">
                            <User size={28} className="text-white" />
                          </div>
                        )}
                      </div>

                      <div>
                        <h4 className="font-semibold text-slate-900">
                          {employee.name}
                        </h4>

                        <p className="text-sm text-slate-500">Employee</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 text-center text-sm text-slate-600">
                    {employee.email}
                  </td>

                  <td className="px-5 text-center">
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                      {employee.department || "Unassigned"}
                    </span>
                  </td>

                  <td className="px-5 text-center">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        employee.status === "active"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {employee.status === "active" ? "Active" : "Inactive"}
                    </span>
                  </td>

                  <td className="px-5 text-center">
                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                      ${employee.salary || "0.00"}
                    </span>
                  </td>

                  <td className="px-5">
                    <div className="flex justify-center gap-2">
                      <Link
                        href={`/admin/employees/${employee.id}`}
                        replace
                        prefetch={false}
                        className="rounded-lg bg-blue-100 p-2 text-blue-600 transition hover:bg-blue-200"
                      >
                        <Eye size={17} />
                      </Link>

                      <Link
                        href={`/admin/employees/${employee.id}/edit`}
                        replace
                        prefetch={false}
                        className="rounded-lg bg-emerald-100 p-2 text-emerald-600 transition hover:bg-emerald-200"
                      >
                        <Pencil size={17} />
                      </Link>

                      <button
                        onClick={() =>
                          handleDeleted(employee?.imgId!, employee?.id!)
                        }
                        className="rounded-lg bg-red-100 p-2 text-red-600 transition hover:bg-red-200"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="space-y-4 p-4 md:hidden">
        {filteredEmployees.length === 0 ? (
          <div className="py-16 text-center">
            <Users size={50} className="mx-auto text-slate-300" />

            <h3 className="mt-4 text-lg font-semibold text-slate-700">
              No Employees Found
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Try another search or add a new employee.
            </p>
          </div>
        ) : (
          filteredEmployees.map((employee) => (
            <div
              key={employee.id || 1}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-center gap-4">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border-2 border-violet-200 bg-slate-100 shadow">
                  {employee.img ? (
                    <Image
                      src={employee.img}
                      alt={employee.name}
                      loading="eager"
                      width={200}
                      height={200}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-linear-to-r from-violet-600 to-blue-600">
                      <User size={22} className="text-white" />
                    </div>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="truncate font-semibold text-slate-900">
                    {employee.name}
                  </h3>

                  <p className="truncate text-sm text-slate-500">
                    {employee.email}
                  </p>
                </div>
              </div>
              <div className="mt-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">Department</span>

                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                    {employee.department || "Unassigned"}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">Status</span>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      employee.status === "active"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {employee.status === "active" ? "Active" : "Inactive"}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">Salary</span>

                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                    ${employee.salary || "0.00"}
                  </span>
                </div>
              </div>
              <div className="mt-5 flex justify-center gap-4 border-t border-slate-100 pt-4">
                <Link
                  href={`/admin/employees/${employee.id}`}
                  replace
                  prefetch={false}
                  className="rounded-lg bg-blue-100 p-2 text-blue-600 transition hover:bg-blue-200"
                >
                  <Eye size={17} />
                </Link>

                <Link
                  href={`/admin/employees/${employee.id}/edit`}
                  replace
                  prefetch={false}
                  className="rounded-lg bg-emerald-100 p-2 text-emerald-600 transition hover:bg-emerald-200"
                >
                  <Pencil size={17} />
                </Link>

                <button
                  onClick={() => handleDeleted(employee?.imgId!, employee?.id!)}
                  className="rounded-lg bg-red-100 p-2 text-red-600 transition hover:bg-red-200"
                >
                  <Trash2 size={17} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default EmployeeTable;

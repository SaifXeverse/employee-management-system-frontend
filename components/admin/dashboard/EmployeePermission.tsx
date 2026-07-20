"use client";

import Image from "next/image";
import { Search, ShieldCheck, User } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  getInactiveEmployees,
  updateEmployeeStatus,
  deleteEmployee,
} from "@/store/slices/employeeSlice";
import { getSocket } from "@/libs/socket";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import useUpload from "@/hooks/useUpload";

const EmployeePermission = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { employeesInactive } = useAppSelector((state) => state.employee);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getInactiveEmployees());
    const socket = getSocket();

    socket.on("employeeStatusChanged", () => {
      dispatch(getInactiveEmployees());
    });
    socket.on("employeeDeleted", () => {
      dispatch(getInactiveEmployees());
    });

    return () => {
      socket.off("employeeStatusChanged");
      socket.off("employeeDeleted");
    };
  }, [dispatch]);

  const { handleDelete } = useUpload(() => {});

  const filteredEmployeesInactive = useMemo(() => {
    return employeesInactive.filter((employee) =>
      employee.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [employeesInactive, search]);

  const handleStatus = async (id: number) => {
    await dispatch(updateEmployeeStatus(id));
    dispatch(getInactiveEmployees());
    toast.success("employee Activated");
    if (employeesInactive.length === 1) {
      router.replace("/admin/employees");
    }
  };

  const handleDeleted = async (imgId: string, id: number) => {
    if (imgId) {
      handleDelete(imgId);
    }
    await dispatch(deleteEmployee(id));
    toast.success("employee Deleted");
  };

  return (
    <div className="mx-auto w-full max-w-7xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-col gap-5 border-b border-slate-200 p-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1b388a]">
            <ShieldCheck className="text-white" size={22} />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Pending Approvals
            </h2>

            <p className="text-sm text-slate-500">
              {filteredEmployeesInactive.length} Employees Available
            </p>
          </div>
        </div>

        <div className="relative w-full lg:w-80">
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
      </div>

      <div className="hidden overflow-x-auto md:block">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                Employee
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold text-slate-600">
                Email
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold text-slate-600">
                Permission
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredEmployeesInactive.length === 0 ? (
              <tr>
                <td colSpan={3} className="py-20 text-center text-slate-500">
                  No Employees Found
                </td>
              </tr>
            ) : (
              filteredEmployeesInactive.map((employee) => (
                <tr key={employee.id} className="border-b border-slate-100">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="relative h-14 w-14 overflow-hidden rounded-full border-4 border-violet-200 bg-slate-100">
                        {employee.img ? (
                          <Image
                            src={employee.img}
                            alt={employee.name}
                            loading="eager"
                            width={144}
                            height={144}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-[#1b388a]">
                            <User className="text-white" size={24} />
                          </div>
                        )}
                      </div>

                      <div>
                        <h3 className="font-semibold text-slate-900">
                          {employee.name}
                        </h3>

                        <p className="text-sm text-slate-500">Employee</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 text-sm text-center text-slate-600">
                    {employee.email}
                  </td>

                  <td className="px-6">
                    <div className="flex justify-center">
                      <div className="flex gap-2 items-center">
                        <button
                          className="bg-[#2b4eaf] rounded-md transition cursor-pointer hover:bg-[#204097] text-white px-4 py-2"
                          onClick={() => handleStatus(employee.id!)}
                        >
                          Active
                        </button>
                        <button
                          className="bg-red-500 rounded-md transition cursor-pointer hover:bg-red-600 text-white px-4 py-2"
                          onClick={() =>
                            handleDeleted(employee.imgId, employee.id!)
                          }
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="space-y-4 p-4 md:hidden">
        {filteredEmployeesInactive.map((employee) => (
          <div
            key={employee.id}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-violet-200 bg-slate-100">
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
                    <User className="text-white" size={22} />
                  </div>
                )}
              </div>

              <div className="flex-1">
                <h3 className="font-semibold text-slate-900">
                  {employee.name}
                </h3>

                <p className="text-sm text-slate-500">{employee.email}</p>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
              <span className="font-medium text-slate-700">Action</span>

              <div className="flex gap-1 items-center">
                <button
                  className="bg-[#2b4eaf] rounded-md transition cursor-pointer hover:bg-[#204097] text-white px-3 py-2"
                  onClick={() => handleStatus(employee.id!)}
                >
                  Active
                </button>
                <button
                  className="bg-red-500 rounded-md transition cursor-pointer hover:bg-red-600 text-white px-3 py-2"
                  onClick={() => handleDeleted(employee.imgId, employee.id!)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeePermission;

"use client";

import { Dispatch, SetStateAction } from "react";
import {
  Camera,
  Mail,
  User,
  Building2,
  DollarSign,
  ShieldCheck,
  Save,
  X,
} from "lucide-react";
import useEmployeeDashboard from "@/hooks/employee/useEmployeeDashboard";

type Employee = {
  img: string;
  name: string;
  email: string;
  department: string;
  status: string;
  salary: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  employee: Employee;
};

const EditProfileModal = ({ open, onClose, employee }: Props) => {
  if (!open) return null;
  const { handleChange, handleSave } = useEmployeeDashboard();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl animate-in zoom-in-95 duration-300">
        
        <div className="bg-linear-to-r from-[#FF4B2B] to-[#FF416C] p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold text-white">Edit Profile</h2>

            <button
              onClick={onClose}
              className="rounded-full bg-white/20 p-2 text-white transition hover:bg-white hover:text-[#FF416C]"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="max-h-[75vh] overflow-y-auto p-8">
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border-4 border-[#FF416C] bg-slate-200 text-5xl font-bold text-slate-500">
                {employee.img ? (
                  <img
                    src={employee.img}
                    alt="profile"
                    className="h-full w-full rounded-full object-cover"
                  />
                ) : (
                  employee.name.charAt(0)
                )}
              </div>

              <>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                //   onChange={handleImageChange}
                />

                <button
                  type="button"
                //   onClick={handleChooseImage}
                  className="absolute bottom-1 right-1 rounded-full bg-linear-to-r from-[#FF4B2B] to-[#FF416C] p-3 text-white shadow-lg transition hover:scale-110"
                >
                  <Camera size={18} />
                </button>
              </>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Full Name
              </label>

              <div className="flex h-14 items-center rounded-xl border bg-slate-50 px-4 focus-within:border-[#FF416C]">
                <User size={18} className="text-slate-400" />

                <input
                  name="name"
                  value={employee.name}
                  onChange={handleChange}
                  className="ml-3 w-full bg-transparent outline-none"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">Email</label>

              <div className="flex h-14 items-center rounded-xl border bg-slate-50 px-4">
                <Mail size={18} className="text-slate-400" />

                <input
                  name="email"
                  value={employee.email}
                  onChange={handleChange}
                  className="ml-3 w-full bg-transparent outline-none"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Department
              </label>

              <div className="flex h-14 items-center rounded-xl border bg-slate-50 px-4">
                <Building2 size={18} className="text-slate-400" />

                <input
                  name="department"
                  value={employee.department}
                  onChange={handleChange}
                  className="ml-3 w-full bg-transparent outline-none"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">Salary</label>

              <div className="flex h-14 items-center rounded-xl border bg-slate-50 px-4">
                <DollarSign size={18} className="text-slate-400" />

                <input
                  name="salary"
                  value={employee.salary}
                  onChange={handleChange}
                  className="ml-3 w-full bg-transparent outline-none"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold">Status</label>

              <div className="flex h-14 items-center rounded-xl border bg-slate-50 px-4">
                <ShieldCheck size={18} className="text-slate-400" />

                <select
                  name="status"
                  value={employee.status}
                  onChange={handleChange}
                  className="ml-3 w-full bg-transparent outline-none"
                >
                  <option>Active</option>
                  <option>Inactive</option>
                  <option>On Leave</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border px-6 py-3 font-semibold transition hover:bg-slate-100"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSave}
              className="flex items-center gap-2 rounded-xl bg-linear-to-r from-[#FF4B2B] to-[#FF416C] px-6 py-3 font-semibold text-white"
            >
              <Save size={18} />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;

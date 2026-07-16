"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Camera, Mail, User, Save } from "lucide-react";
import { ChangeEvent } from "react";

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
  handleUpload: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  imageUrl: string;
  loading: boolean;
  employeeInput: Employee;
  handleSave: () => Promise<void>;
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement, Element>,
  ) => void;
};

const EditProfileModal = ({
  open,
  onClose,
  handleUpload,
  imageUrl,
  loading,
  employeeInput,
  handleChange,
  handleSave,
}: Props) => {
  if (!open) return null;

  return (
    <Dialog open={open} onOpenChange={(value) => !value && onClose()}>
      <DialogContent
        showCloseButton={false}
        className="min-w-lg overflow-hidden rounded-3xl border-0 p-0 shadow-2xl"
      >
        <DialogHeader className="items-center bg-linear-to-r from-slate-900 via-slate-800 to-blue-900 p-6">
          <DialogTitle className="text-3xl font-bold text-white">
            Edit Profile
          </DialogTitle>
        </DialogHeader>
        <div className="max-h-[75vh] overflow-y-auto p-8">
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="relative h-28 w-28 overflow-hidden rounded-full border-4 border-[#1b388a] bg-slate-200 shadow-xl">
                {employeeInput.img || imageUrl ? (
                  <img
                    src={employeeInput.img || imageUrl}
                    alt="Employee"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-slate-100">
                    <User size={48} className="text-slate-400" />
                  </div>
                )}

                {loading && (
                  <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-sm">
                    <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
                  </div>
                )}
              </div>

              <label
                htmlFor="profile"
                className={`absolute bottom-0 right-0 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#1c3059] text-white shadow-lg transition-all duration-300 hover:scale-110 hover:bg-[#16284b] ${
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
          </div>

          <div className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Full Name
              </label>

              <div className="flex h-14 items-center rounded-xl border border-slate-300 bg-white px-4 transition-all duration-200 focus-within:border-blue-600 focus-within:ring-4 focus-within:ring-blue-100">
                <User size={18} className="text-slate-400" />

                <input
                  name="name"
                  value={employeeInput.name}
                  onChange={handleChange}
                  className="ml-3 w-full bg-transparent text-slate-700 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Email Address
              </label>

              <div className="flex h-14 items-center rounded-xl border border-slate-300 bg-white px-4 transition-all duration-200 focus-within:border-blue-600 focus-within:ring-4 focus-within:ring-blue-100">
                <Mail size={18} className="text-slate-400" />

                <input
                  name="email"
                  value={employeeInput.email}
                  onChange={handleChange}
                  className="ml-3 w-full bg-transparent text-slate-700 outline-none"
                />
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-center gap-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl cursor-pointer border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSave}
              className="flex cursor-pointer items-center gap-2 rounded-xl bg-[#1c3059] px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:bg-[#16284b]"
            >
              <Save size={18} />
              Save Changes
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileModal;

"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Camera,
  Mail,
  User,
  Building2,
  DollarSign,
  Save,
  X,
} from "lucide-react";

import { ChangeEvent } from "react";

type Employee = {
  img: string;
  name: string;
  email: string;
  department: string;
  status: string;
  salary: string;
}

type Props = {
  open: boolean;
  onClose: () => void;
  handleUpload: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  imageUrl: string;
  loading: boolean;
  employeeInput: Employee;
  handleSave: () => Promise<void>;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement, Element>) => void
};

const EditProfileModal = ({ open, onClose, handleUpload, imageUrl, loading, employeeInput, handleChange, handleSave }: Props) => {
  if (!open) return null;

  return (
  <Dialog open={open}  onOpenChange={(value) => !value && onClose()}>
    <DialogContent showCloseButton={false} className="min-w-lg p-0 rounded-3xl overflow-hidden border-0">
      <DialogHeader className="bg-linear-to-r items-center from-[#FF4B2B] to-[#FF416C] p-6">
        <div className="">
          <DialogTitle className="text-3xl font-bold text-white">
            Edit Profile
          </DialogTitle>
        </div>
      </DialogHeader>

      <div className="max-h-[75vh] overflow-y-auto p-8">
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="relative h-28 w-28 overflow-hidden rounded-full bg-slate-200 shadow-lg">
              {employeeInput.img || imageUrl ? (
                <img
                  src={employeeInput.img || imageUrl}
                  alt="Employee"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center rounded-full justify-center bg-slate-100">
                  <User size={48} className="text-slate-400" />
                </div>
              )}

              {loading && (
                <div className="absolute inset-0 flex items-center rounded-full justify-center bg-black/40 backdrop-blur-sm">
                  <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#FF416C] border-t-transparent" />
                </div>
              )}
            </div>

            <label
              htmlFor="profile"
              className={`absolute bottom-0 right-0 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-linear-to-r from-[#FF4B2B] to-[#FF416C] text-white shadow-lg transition hover:scale-110 ${
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

        <div className="grid gap-5 md:grid-cols-1">
          <div>
            <label className="mb-2 block text-sm font-semibold">
              Full Name
            </label>

            <div className="flex h-14 items-center rounded-xl border bg-slate-50 px-4 focus-within:border-[#FF416C]">
              <User size={18} className="text-slate-400" />

              <input
                name="name"
                value={employeeInput.name}
                onChange={handleChange}
                className="ml-3 w-full bg-transparent outline-none"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">
              Email
            </label>

            <div className="flex h-14 items-center rounded-xl border bg-slate-50 px-4">
              <Mail size={18} className="text-slate-400" />

              <input
                name="email"
                value={employeeInput.email}
                onChange={handleChange}
                className="ml-3 w-full bg-transparent outline-none"
              />
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center gap-3">
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
    </DialogContent>
  </Dialog>
);
};

export default EditProfileModal;

"use client";

import Image from "next/image";
import { Pencil, Mail, Building2, DollarSign, ShieldCheck, ArrowLeftIcon } from "lucide-react";
import EditProfileModal from "./EditProfileModal";
import useEmployeeDashboard from "@/hooks/employee/useEmployeeDashboard";
import useUpload from "@/hooks/useUpload";
import InfoCard from "./InfoCard";
import { useEffect } from "react";
import { useRouter } from "next/navigation";


const Profile = () => {
  const { employee, employeeInput, setEmployeeInput, open, setOpen, handleChange, handleSave } =
    useEmployeeDashboard();
  const { handleUpload, imageUrl, loading } = useUpload((url) => {
    setEmployeeInput((prev) => ({ ...prev, img: url }));
  });
  useEffect(() => {
    if (open) {
      setEmployeeInput((prev) => ({ ...prev, img: employee?.img || "" }));
    } else {
      setEmployeeInput((prev) => ({ ...prev, img: "" }));
    }
  }, [open, employee?.img, setEmployeeInput]);

  const router = useRouter()

  return (
    <>
      <div className="min-h-screen bg-slate-100">
        <div className="bg-linear-to-r from-[#FF4B2B] to-[#FF416C] pb-24">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-8">
            <div>
              <h1 className="text-4xl font-bold text-white">My Profile</h1>

              <p className="mt-2 text-white/80">
                View and manage your profile.
              </p>
            </div>

            <div className="flex gap-4">
            <button
              onClick={() => setOpen(true)}
              className="flex items-center gap-2 rounded-full border border-white px-6 py-3 font-semibold text-white transition hover:bg-white hover:text-[#FF416C]"
            >
              <Pencil size={18} />
              Edit Profile
            </button>
            <button
              onClick={() => router.replace("/dashboard")}
              className="flex items-center gap-2 rounded-full border border-white hover:border-0 px-6 py-3 font-semibold text-white transition hover:bg-white hover:text-black"
            >
              <ArrowLeftIcon size={18} />
              Back
            </button>
            </div>
          </div>
        </div>

        <div className="mx-auto -mt-16 max-w-6xl px-6 pb-10">
          <div className="rounded-3xl bg-white p-8 shadow-xl">
            <div className="flex flex-col items-center border-b pb-8">
              <div className="h-36 w-36 overflow-hidden rounded-full border-4 border-[#FF416C] bg-slate-200">
                {
                  employee.img ? (
                    <Image
                      src={employee.img}
                      alt="Profile"
                      loading="eager"
                      width={144}
                      height={144}
                      className="h-full w-full object-cover"
                    />
                  )
                   : (
                    <div className="flex h-full items-center justify-center text-5xl font-bold text-slate-500">
                      {employee.name.charAt(0)}
                    </div>
                  )
                }
              </div>

              <h2 className="mt-5 text-3xl font-bold text-slate-800">
                {employee.name}
              </h2>

              <p className="mt-2 text-slate-500">{employee.department}</p>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <InfoCard
                icon={<Mail size={20} />}
                title="Email"
                value={employee.email}
              />

              <InfoCard
                icon={<Building2 size={20} />}
                title="Department"
                value={employee.department || "Unassigned - Contact Admin"}
              />

              <InfoCard
                icon={<ShieldCheck size={20} />}
                title="Status"
                value={employee.status}
              />

              <InfoCard
                icon={<DollarSign size={20} />}
                title="Salary"
                value={`$${employee.salary || "0.00 - Contact Admin"}`}
              />
            </div>
          </div>
        </div>
      </div>

      <EditProfileModal
        open={open}
        handleUpload={handleUpload}
        imageUrl={imageUrl}
        loading={loading}
        onClose={() => setOpen(false)}
        employeeInput={employeeInput}
        handleSave={handleSave}
        handleChange={handleChange}
      />
    </>
  );
};

export default Profile;




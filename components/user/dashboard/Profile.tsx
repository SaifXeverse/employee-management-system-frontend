"use client";

import Image from "next/image";
import {
  Pencil,
  Mail,
  Building2,
  DollarSign,
  ShieldCheck,
  ArrowLeftIcon,
} from "lucide-react";
import EditProfileModal from "./EditProfileModal";
import useUpload from "@/hooks/useUpload";
import InfoCard from "./InfoCard";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  getEmployeeProfile,
  updateEmployeeProfile,
} from "@/store/slices/employeeDashboardSlice";
import { getSocket } from "@/libs/socket";

const Profile = () => {
  const dispatch = useAppDispatch();
  const { employee } = useAppSelector((state) => state.employeeDashboard);
  const [open, setOpen] = useState(false);
  const [employeeInput, setEmployeeInput] = useState({
    img: "",
    imgId: "",
    name: "",
    email: "",
    department: "",
    status: "",
    salary: "",
  });

  useEffect(() => {
    dispatch(getEmployeeProfile());
    const socket = getSocket();

    socket.on("employeeProfileUpdated", () => {
      dispatch(getEmployeeProfile());
    });
    socket.on("employeeUpdated", () => {
      dispatch(getEmployeeProfile());
    });

    return () => {
      socket.off("employeeProfileUpdated");
      socket.off("employeeUpdated");
    };
  }, [dispatch]);

  useEffect(() => {
    if (employee) {
      setEmployeeInput({
        img: employee.img || "",
        imgId: employee.imgId || "",
        name: employee.name || "",
        email: employee.email || "",
        department: employee.department || "",
        status: employee.status || "",
        salary: employee.salary || "",
      });
    }
  }, [employee]);

  const { handleUpload, imageUrl, loading, handleDelete } = useUpload((url, publicId) => {
    setEmployeeInput((prev) => ({
      ...prev,
      img: url,
      imgId: publicId
    }));
  });

  useEffect(() => {
    if (open) {
      setEmployeeInput((prev) => ({ ...prev, img: employee?.img || "" }));
    } else {
      setEmployeeInput((prev) => ({ ...prev, img: "" }));
      handleDelete();
    }
  }, [open]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setEmployeeInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async () => {
    if (employeeInput.img !== employee?.img) {
      handleDelete(employee?.imgId)
    }
    await dispatch(updateEmployeeProfile(employeeInput));
    setOpen(false);
  };

  const router = useRouter();

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
                className="flex items-center gap-2 rounded-full border border-white px-6 py-3 font-semibold text-white transition hover:bg-white hover:text-black"
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
                {employee?.img && (
                  <Image
                    src={employee?.img}
                    alt="Profile"
                    loading="eager"
                    width={144}
                    height={144}
                    className="h-full w-full object-cover"
                  />
                )}
              </div>

              <h2 className="mt-5 text-3xl font-bold text-slate-800">
                {employee?.name}
              </h2>

              <p className="mt-2 text-slate-500">{employee?.department}</p>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <InfoCard
                icon={<Mail size={20} />}
                title="Email"
                value={employee?.email!}
              />

              <InfoCard
                icon={<Building2 size={20} />}
                title="Department"
                value={employee?.department || "Unassigned - Contact Admin"}
              />

              <InfoCard
                icon={<ShieldCheck size={20} />}
                title="Status"
                value={employee?.status!}
              />

              <InfoCard
                icon={<DollarSign size={20} />}
                title="Salary"
                value={`$${employee?.salary || "0.00 - Contact Admin"}`}
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

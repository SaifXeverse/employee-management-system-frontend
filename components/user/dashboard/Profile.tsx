"use client";

import Image from "next/image";
import {
  Pencil,
  Mail,
  Building2,
  DollarSign,
  ShieldCheck,
  ArrowLeftIcon,
  File,
  Trash2,
  Download,
  Eye,
} from "lucide-react";
import useUpload from "@/hooks/useUpload";
import InfoCard from "./InfoCard";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  getEmployeeProfile,
  updateEmployeeProfile,
  deleteEmployeeResume,
} from "@/store/slices/employeeDashboardSlice";
import { getSocket } from "@/libs/socket";
import EditProfileModal from "./modal/EditProfileModal";
import Link from "next/link";

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
    resume: "",
    resumeId: "",
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
    socket.on("employeeResumeDeleted", () => {
      dispatch(getEmployeeProfile());
    });
    socket.on("employeeResumeDeletedByAdmin", () => {
      dispatch(getEmployeeProfile());
    });

    return () => {
      socket.off("employeeProfileUpdated");
      socket.off("employeeUpdated");
      socket.off("employeeResumeDeleted");
      socket.off("employeeResumeDeletedByAdmin");
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
        resume: employee.resume || "",
        resumeId: employee.resumeId || "",
      });
    }
  }, [employee]);

  const { handleUpload, imageUrl, loading, handleDelete } = useUpload(
    (url, publicId) => {
      setEmployeeInput((prev) => ({
        ...prev,
        img: url,
        imgId: publicId,
      }));
    },
  );

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
      handleDelete(employee?.imgId);
    }
    await dispatch(updateEmployeeProfile(employeeInput));
    setOpen(false);
  };

  const deleteResume = async () => {
    handleDelete(employee?.resumeId);
    await dispatch(deleteEmployeeResume());
  };

  const getAttachmentUrl = (url: string) => {
    if (!url) return "";
    const uploadParts = url.split("/upload/");
    return `${uploadParts[0]}/upload/fl_attachment/${uploadParts[1]}`;
  };

  return (
    <div>
      <div className="min-h-screen bg-slate-100">
        <div className="bg-linear-to-r from-slate-900 via-slate-800 to-blue-900 pb-24">
          <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-5 px-6 py-8 md:flex-row md:items-center">
            <div>
              <h1 className="text-4xl font-bold text-white">My Profile</h1>

              <p className="mt-2 text-slate-300">
                View and manage your profile.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setOpen(true)}
                className="flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur transition-all duration-300 hover:bg-white hover:text-slate-900"
              >
                <Pencil size={18} />
                Edit Profile
              </button>

              <Link
                href="/dashboard"
                replace
                className="flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur transition-all duration-300 hover:bg-white hover:text-slate-900"
              >
                <ArrowLeftIcon size={18} />
                Back
              </Link>
            </div>
          </div>
        </div>
        <div className="mx-auto -mt-16 max-w-6xl px-6 pb-10">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
            <div className="flex flex-col items-center border-b border-slate-200 pb-8">
              <div className="h-36 w-36 overflow-hidden rounded-full border-4 border-[#1b388a] bg-slate-200 shadow-lg">
                {employee?.img ? (
                  <Image
                    src={employee.img}
                    alt="Profile"
                    loading="eager"
                    width={200}
                    height={200}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-slate-100">
                    <Building2 size={60} className="text-slate-400" />
                  </div>
                )}
              </div>

              <h2 className="mt-5 text-3xl font-bold text-slate-800">
                {employee?.name}
              </h2>

              <p className="mt-2 text-slate-500">
                {employee?.department || "Employee"}
              </p>
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

              <div className="hidden md:block"></div>
              {employee?.resume ? (
                <div className="md:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100">
                      <File size={24} className="text-blue-600" />
                    </div>
                    <p className="text-sm text-slate-500">Resume</p>
                    <h3 className="mt-2 text-xl font-semibold text-slate-900">
                      Resume Available
                    </h3>
                    <p className="mt-3 max-w-lg text-sm text-slate-500">
                      Click the button below to view or download the employee
                      resume.
                    </p>
                    <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                      <Link
                        href={employee.resume}
                        target="_blank"
                        prefetch={false}
                        className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-blue-700 hover:-translate-y-0.5 hover:shadow-lg"
                      >
                        <Eye size={18} />
                        View
                      </Link>

                      <Link
                        href={getAttachmentUrl(employee?.resume || "")}
                        prefetch={false}
                        className="inline-flex items-center gap-2 rounded-xl border border-blue-600 bg-white px-5 py-3 text-sm font-medium text-blue-600 transition-all duration-300 hover:bg-blue-50 hover:-translate-y-0.5 hover:shadow-lg"
                      >
                        <Download size={18} />
                        Download
                      </Link>

                      <button
                        onClick={deleteResume}
                        className="inline-flex items-center gap-2 rounded-xl bg-red-500 px-5 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-red-600 hover:-translate-y-0.5 hover:shadow-lg"
                      >
                        <Trash2 size={18} />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="md:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
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
              )}
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
    </div>
  );
};

export default Profile;

"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Mail, Pencil, User, Camera, Save, X } from "lucide-react";
import useUpload from "@/hooks/useUpload";
import useProfile from "@/hooks/admin/useProfile";

const Profile = () => {
  const {
    userInput,
    setUserInput,
    isEditing,
    setIsEditing,
    handleCancel,
    handleSave,
  } = useProfile();
  const { handleUpload, loading } = useUpload((url) => {
    setUserInput((prev) => ({ ...prev, img: url }));
  });

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">My Profile</h1>

          <p className="mt-2 text-slate-500">
            View and manage your account information.
          </p>
        </div>

        <Link
          href="/admin/employees"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50"
        >
          <ArrowLeft size={18} />
          Back
        </Link>
      </div>

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
        <div className="relative h-36 bg-linear-to-r from-violet-600 via-indigo-600 to-blue-600">
          <div className="absolute inset-0 bg-black/10" />
        </div>

        <div className="-mt-20 flex flex-col items-center px-6 pb-8">
          <div className="relative">
            <div className="relative h-40 w-40 overflow-hidden rounded-full border-4 border-violet-200 bg-slate-100 shadow-lg">
              {userInput.img ? (
                <Image
                  src={userInput.img}
                  alt={userInput.name}
                  loading="eager"
                  width={144}
                  height={144}
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-linear-to-r from-violet-600 to-blue-600">
                  <User size={60} className="text-white" />
                </div>
              )}

              {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                  <div className="h-10 w-10 animate-spin rounded-full border-4 border-white border-t-transparent"></div>
                </div>
              )}
            </div>
            {isEditing && (
              <>
                <label
                  htmlFor="profile"
                  className={`absolute bottom-0 right-2.5 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-violet-600 text-white shadow-lg transition hover:bg-violet-700 ${
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
              </>
            )}
          </div>

          {isEditing ? (
            <input
              value={userInput.name}
              onChange={(e) =>
                setUserInput((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
              className="mt-6 w-full max-w-sm rounded-xl border border-slate-300 px-4 py-3 text-center text-2xl font-bold outline-none focus:border-violet-600"
            />
          ) : (
            <h2 className="mt-6 text-3xl font-bold text-slate-900">
              {userInput.name}
            </h2>
          )}

          {isEditing ? (
            <input
              value={userInput.email}
              onChange={(e) =>
                setUserInput((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
              className="mt-3 w-full max-w-sm rounded-xl border border-slate-300 px-4 py-3 text-center outline-none focus:border-violet-600"
            />
          ) : (
            <p className="mt-2 text-slate-500">{userInput.email}</p>
          )}

          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="mt-6 cursor-pointer inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-violet-600 to-blue-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:scale-105"
            >
              <Pencil size={18} />
              Edit Profile
            </button>
          ) : (
            <div className="mt-6 flex gap-4">
              <button
                onClick={handleSave}
                className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-green-700"
              >
                <Save size={18} />
                Save
              </button>

              <button
                onClick={handleCancel}
                className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-slate-200 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-300"
              >
                <X size={18} />
                Cancel
              </button>
            </div>
          )}
        </div>

        <div className="grid gap-6 border-t border-slate-200 p-8 md:grid-cols-2">
          <div className="rounded-2xl border flex flex-col items-center border-slate-200 p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100">
              <User className="text-violet-600" />
            </div>

            <p className="text-sm text-slate-500">Full Name</p>

            <h3 className="mt-2 text-lg font-semibold text-slate-900">
              {userInput.name}
            </h3>
          </div>

          <div className="rounded-2xl border flex flex-col items-center border-slate-200 p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
              <Mail className="text-blue-600" />
            </div>

            <p className="text-sm text-slate-500">Email Address</p>

            <h3 className="mt-2 break-all text-lg font-semibold text-slate-900">
              {userInput.email}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

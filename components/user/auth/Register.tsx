"use client";

import Link from "next/link";
import { Lock, Mail, User } from "lucide-react";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { registerEmployee } from "@/store/slices/employeeAuthSlice";

const Register = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { loading } = useAppSelector((state) => state.employeeAuth);
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await dispatch(registerEmployee(inputs));
    if (registerEmployee.fulfilled.match(result)) {
      toast.success(
        "Employee Registered. Please wait for an admin to activate the account.",
      );
      router.replace("/login");
      router.refresh();
    } else {
      toast.error((result.payload as string) || "Registration failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f6f5f7] px-4 py-5">
      <div className="w-full max-w-6xl overflow-hidden rounded-3xl bg-white shadow-[0_14px_28px_rgba(0,0,0,0.25),0_10px_10px_rgba(0,0,0,0.22)]">
        <div className="grid min-h-140 md:grid-cols-2">
          <div className="order-1 flex items-center justify-center bg-linear-to-r from-[#FF4B2B] to-[#FF416C] p-10 text-center text-white">
            <div className="max-w-md">
              <h2 className="text-5xl font-extrabold">
                Welcome
                <br />
                Back!
              </h2>
              <p className="mt-6 text-lg leading-8 text-white/90">
                To stay connected with us please login with your personal
                information.
              </p>
              <Link href="/login" replace>
                <button className="mt-10 rounded-full border border-white px-12 py-3 text-sm font-bold uppercase tracking-[3px] text-white transition duration-300 hover:bg-white hover:text-[#FF416C]">
                  Sign In
                </button>
              </Link>
            </div>
          </div>
          <div className="order-2 flex items-center justify-center p-8 lg:p-12">
            <div className="w-full max-w-md">
              <h1 className="text-center text-4xl font-bold text-slate-800">
                Create Account
              </h1>
              <p className="mt-3 text-center text-sm text-slate-500">
                Create your employee account to get started
              </p>
              <form onSubmit={handleRegister} className="mt-10 space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Full Name
                  </label>
                  <div className="flex h-14 items-center rounded-xl border border-slate-200 bg-slate-50 px-4 transition focus-within:border-[#FF4B2B]">
                    <User size={18} className="text-slate-400" />
                    <input
                      type="text"
                      name="name"
                      onChange={handleChange}
                      placeholder="Saif khan"
                      className="ml-3 w-full bg-transparent outline-none placeholder:text-slate-400"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Email Address
                  </label>
                  <div className="flex h-14 items-center rounded-xl border border-slate-200 bg-slate-50 px-4 transition focus-within:border-[#FF4B2B]">
                    <Mail size={18} className="text-slate-400" />
                    <input
                      type="email"
                      name="email"
                      onChange={handleChange}
                      placeholder="employee@example.com"
                      className="ml-3 w-full bg-transparent outline-none placeholder:text-slate-400"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Password
                  </label>
                  <div className="flex h-14 items-center rounded-xl border border-slate-200 bg-slate-50 px-4 transition focus-within:border-[#FF4B2B]">
                    <Lock size={18} className="text-slate-400" />
                    <input
                      type="password"
                      name="password"
                      onChange={handleChange}
                      placeholder="********"
                      className="ml-3 w-full bg-transparent outline-none placeholder:text-slate-400"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="h-14 w-full cursor-pointer rounded-full bg-linear-to-r from-[#FF4B2B] to-[#FF416C] text-sm font-bold uppercase tracking-widest text-white shadow-lg transition duration-300 hover:scale-[1.02] disabled:opacity-50"
                >
                  {loading ? "Creating..." : "Create Account"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

"use client";

import Link from "next/link";
import { Lock, Mail } from "lucide-react";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loginEmployee } from "@/store/slices/employeeAuthSlice";

const Login = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { loading } = useAppSelector((state) => state.employeeAuth);

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await dispatch(loginEmployee(inputs));
    if (loginEmployee.fulfilled.match(result)) {
      toast.success("Login Successfully");
      router.replace("/dashboard");
      router.refresh();
    } else {
      toast.error((result.payload as string) || "Login failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">
      <div className="w-full max-w-6xl overflow-hidden rounded-3xl bg-white shadow-2xl">
        <div className="grid min-h-140 md:grid-cols-2">
          <div className="order-2 flex items-center justify-center p-8 lg:order-1 lg:p-16">
            <div className="w-full max-w-md">
              <h1 className="text-center text-4xl font-bold text-slate-800">
                Welcome Back
              </h1>

              <p className="mt-3 text-center text-sm text-slate-500">
                Sign in to access your employee dashboard.
              </p>

              <form onSubmit={handleLogin} className="mt-10 space-y-6">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Email Address
                  </label>

                  <div className="flex h-14 items-center rounded-xl border border-slate-300 bg-white px-4 transition-all duration-200 focus-within:border-blue-600 focus-within:ring-4 focus-within:ring-blue-100">
                    <Mail size={18} className="text-slate-400" />

                    <input
                      type="email"
                      name="email"
                      onChange={handleChange}
                      placeholder="employee@example.com"
                      className="ml-3 w-full bg-transparent text-slate-700 outline-none placeholder:text-slate-400"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Password
                  </label>

                  <div className="flex h-14 items-center rounded-xl border border-slate-300 bg-white px-4 transition-all duration-200 focus-within:border-blue-600 focus-within:ring-4 focus-within:ring-blue-100">
                    <Lock size={18} className="text-slate-400" />

                    <input
                      type="password"
                      name="password"
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="ml-3 w-full bg-transparent text-slate-700 outline-none placeholder:text-slate-400"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="h-14 w-full cursor-pointer rounded-xl bg-[#1c3059] text-sm font-semibold uppercase tracking-wider text-white shadow-lg transition-all duration-300 hover:bg-[#16284b] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Signing In..." : "Sign In"}
                </button>
              </form>
            </div>
          </div>
          <div className="order-1 flex items-center justify-center bg-linear-to-br from-slate-900 via-slate-800 to-blue-900 p-10 text-center text-white md:order-2">
            <div className="max-w-md">
              <h2 className="text-5xl font-bold">Welcome</h2>

              <p className="mt-6 text-lg leading-8 text-slate-300">
                Manage your account securely and access all employee services
                from one place.
              </p>

              <Link href="/register" replace>
                <button className="mt-10 rounded-xl border border-white px-10 py-3 text-sm font-semibold uppercase tracking-wider transition-all duration-300 hover:bg-white hover:text-slate-900">
                  Create Account
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

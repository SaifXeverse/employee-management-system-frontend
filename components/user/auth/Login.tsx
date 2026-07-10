"use client";

import Link from "next/link";
import { Lock, Mail } from "lucide-react";
import useAuthEmployee from "@/hooks/employee/useAuthEmployee";

const Login = () => {
  const { handleChange, handleLogin } = useAuthEmployee();

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f6f5f7] px-4 py-10">
      <div className="w-full max-w-6xl overflow-hidden rounded-3xl bg-white shadow-[0_14px_28px_rgba(0,0,0,0.25),0_10px_10px_rgba(0,0,0,0.22)]">
        <div className="grid min-h-140 lg:grid-cols-2">
          <div className="order-2 flex items-center justify-center p-8 lg:order-1 lg:p-16">
            <div className="w-full max-w-md">
              <h1 className="text-center text-4xl font-bold text-slate-800">
                Sign In
              </h1>

              <p className="mt-3 text-center text-sm text-slate-500">
                Use your employee account to continue
              </p>

              <form onSubmit={handleLogin} className="mt-10 space-y-5">
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

                {/* <div className="text-right">
                  <button
                    type="button"
                    className="text-sm text-slate-500 transition hover:text-[#FF4B2B]"
                  >
                    Forgot Password?
                  </button>
                </div> */}

                <button
                  type="submit"
                  className="h-14 w-full cursor-pointer rounded-full bg-linear-to-r from-[#FF4B2B] to-[#FF416C] text-sm font-bold uppercase tracking-widest text-white shadow-lg transition duration-300 hover:scale-[1.02]"
                >
                  Sign In
                </button>
              </form>
            </div>
          </div>
          <div className="order-1 flex items-center justify-center bg-linear-to-r from-[#FF4B2B] to-[#FF416C] p-10 text-center text-white lg:order-2">
            <div className="max-w-md">
              <h2 className="text-5xl font-extrabold">
                Hello, Friend!
              </h2>

              <p className="mt-6 text-lg leading-8 text-white/90">
                Enter your personal details and start your journey with us.
              </p>

              <Link href="/register" replace>
                <button className="mt-10 rounded-full border border-white px-12 py-3 text-sm font-bold uppercase tracking-[3px] text-white transition duration-300 hover:bg-white hover:text-[#FF416C]">
                  Sign Up
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

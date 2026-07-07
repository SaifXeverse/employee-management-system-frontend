"use client";

import Link from "next/link";
import { Mail, Lock } from "lucide-react";
import { FormEvent } from "react";
import useAuth from "@/hooks/admin/useAuth";
import SideContent from "./SideContent";

const Login = () => {
    const {handleChange, submitForm} = useAuth()

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        submitForm("login")
    }
    
  return (
    <main className="min-h-screen grid lg:grid-cols-2 bg-slate-100">
      <SideContent heading="Welcome 👋" heading2="Welcome Back." para="Login to access your dashboard and continue managing your projects with ease." />

      <section className="flex items-center justify-center px-6 py-10">

        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">

          <h1 className="text-3xl font-bold text-center text-slate-800">
            Login
          </h1>

          <form onSubmit={handleSubmit} className="mt-4 space-y-2">
            <div>
              <label className="text-sm pl-2 font-medium text-slate-700">
                Email
              </label>

              <div className="mt-1 flex items-center rounded-xl border bg-slate-50 px-4 h-14 focus-within:border-violet-600">

                <Mail size={18} className="text-slate-400" />
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  placeholder="name@example.com"
                  className="ml-3 w-full bg-transparent outline-none"
                />
              </div>
            </div>
            <div>
              <label className="text-sm pl-2 font-medium text-slate-700">
                Password
              </label>
              <div className="mt-1 flex items-center rounded-xl border bg-slate-50 px-4 h-14 focus-within:border-violet-600">

                <Lock size={18} className="text-slate-400" />
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  placeholder="********"
                  className="ml-3 w-full bg-transparent outline-none"
                />
              </div>
            </div>

            <button className="h-14 mt-3 w-full cursor-pointer rounded-xl bg-linear-to-r from-violet-600 to-blue-600 hover:to-blue-500 hover:from-violet-500 font-semibold text-white transition hover:shadow-lg">
              Login
            </button>

          </form>

          <p className="text-center mt-4 text-slate-500">
            Don't have an account? {" "}
            <Link  prefetch={false} href="/admin/register" className="font-semibold cursor-pointer text-violet-600 hover:text-violet-500">
              Register
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Login;

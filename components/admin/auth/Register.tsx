"use client"

import Link from "next/link";
import { User, Mail, Lock } from "lucide-react";
import { FormEvent } from "react";
import useAuth from "@/hooks/admin/useAuth";
import SideContent from "./SideContent";

const Register = () => {
    const {handleChange, submitForm} = useAuth()

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        submitForm("register")
    }

  return (
    <main className="min-h-screen grid lg:grid-cols-2 bg-slate-100">
      <SideContent heading="Create Your Account 🚀" heading2="Join Our Platform." para="Create your account today and start managing your projects with a modern, secure and powerful dashboard." />

      <section className="flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
          <h1 className="text-center text-3xl font-bold text-slate-800">
            Create Account
          </h1>
          <form onSubmit={handleSubmit} className="mt-4 space-y-2">
            <div>
              <label className="text-sm pl-2 font-medium text-slate-700">
                Full Name
              </label>
              <div className="mt-1 flex h-14 items-center rounded-xl border bg-slate-50 px-4 focus-within:border-violet-600">
                <User size={18} className="text-slate-400" />
                <input
                  type="text"
                  name="name"
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="ml-3 w-full bg-transparent outline-none"
                />
              </div>
            </div>
            <div>
              <label className="text-sm pl-2 font-medium text-slate-700">
                Email Address
              </label>
              <div className="mt-1 flex h-14 items-center rounded-xl border bg-slate-50 px-4 focus-within:border-violet-600">
                <Mail size={18} className="text-slate-400" />
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="ml-3 w-full bg-transparent outline-none"
                />
              </div>
            </div>
            <div>
              <label className="text-sm pl-2 font-medium text-slate-700">
                Password
              </label>
              <div className="mt-1 flex h-14 items-center rounded-xl border bg-slate-50 px-4 focus-within:border-violet-600">
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
            <button className="h-14 cursor-pointer mt-3 w-full rounded-xl bg-linear-to-r from-violet-600 to-blue-600 font-semibold hover:to-blue-500 hover:from-violet-500 text-white transition hover:shadow-lg">
              Create Account
            </button>
          </form>
          <p className="mt-4 text-center text-slate-500">
            Already have an account?{" "}
            <Link  prefetch={false} href="/admin/login" className="font-semibold cursor-pointer text-violet-600 hover:text-violet-500">
              Login
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Register;

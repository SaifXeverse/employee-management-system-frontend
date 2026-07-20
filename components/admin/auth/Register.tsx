"use client";

import Link from "next/link";
import { User, Mail, Lock } from "lucide-react";
import SideContent from "./SideContent";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { registerAdmin } from "@/store/slices/adminAuthSlice";

const Register = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { loading } = useAppSelector((state) => state.auth);

  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await dispatch(registerAdmin(inputs));

    if (registerAdmin.fulfilled.match(result)) {
      toast.success("User Registered");
      router.replace("/admin/login");
      router.refresh();
    } else {
      toast.error((result.payload as string) || "Registration failed");
    }
  };

  return (
    <main className="min-h-screen grid md:grid-cols-2 bg-slate-100">
      <SideContent
        heading="Create Your Account 🚀"
        heading2="Join Our Platform."
        para="Create your account today and start managing your projects with a modern, secure and powerful dashboard."
      />

      <section className="flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
          <h1 className="text-center text-3xl font-bold text-slate-800">
            Create Admin Account
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
                  required
                  onChange={handleChange}
                  placeholder="Saif"
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
                  required
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
                  required
                  placeholder="********"
                  className="ml-3 w-full bg-transparent outline-none"
                />
              </div>
            </div>
            <button
              disabled={loading}
              className="h-14 cursor-pointer mt-3 w-full rounded-xl bg-[#1b388a] font-semibold hover:to-blue-500 hover:from-violet-500 text-white transition hover:shadow-lg disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>
          <p className="mt-4 text-center text-slate-500">
            Already have an account?{" "}
            <Link
              prefetch={false}
              href="/admin/login"
              replace
              className="font-semibold cursor-pointer text-violet-600 hover:text-violet-500"
            >
              Login
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Register;

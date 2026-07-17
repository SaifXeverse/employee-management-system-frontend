"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/libs/axios";

export default function EmployeeAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const checkLogin = async () => {
      try {
        await api.get("/employee/verify");
        router.push("/dashboard");
        return;
      } catch {}

      try {
        await api.get("/auth/verify");
        router.push("/admin/dashboard");
      } catch {}
    };

    checkLogin();
  }, [router]);

  return <>{children}</>;
}
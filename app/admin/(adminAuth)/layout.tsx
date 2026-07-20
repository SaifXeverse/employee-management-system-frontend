"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/libs/axios";

export default function AdminAuthLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        await api.get("/auth/verify");
        router.push("/admin/dashboard");
        setLoading(false);
        return;
      } catch (error) {
        console.log(error);
      }

      try {
        await api.get("/employee/verify");
        router.push("/dashboard");
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    checkLogin();
  }, [router]);

  if (loading) return null;

  return <>{children}</>;
}

"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/libs/axios";

export default function AdminAuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const checkLogin = async () => {
      try {
        await api.get("/auth/verify");
        router.push("/admin/dashboard");
        return;
      } catch (error) {
        console.log(error);
        
      }

      try {
        await api.get("/employee/verify");
        router.push("/dashboard");
      } catch (error) {
        console.log(error);
      }
    };

    checkLogin();
  }, [router]);

  return <>{children}</>;
}
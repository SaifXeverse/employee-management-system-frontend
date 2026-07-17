"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/libs/axios";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        await api.get("/auth/verify");
        router.push("/admin/dashboard");
      } catch {}
    };

    checkAdmin();
  }, [router]);

  return <>{children}</>;
}
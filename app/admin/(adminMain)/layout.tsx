"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/libs/axios";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await api.get("/auth/verify");
      } catch {
        router.push("/admin/login");
      }
    };

    checkAuth();
  }, [router]);

  return <main>{children}</main>;
}
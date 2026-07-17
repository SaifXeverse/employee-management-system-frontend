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
    const checkUser = async () => {
      try {
        await api.get("/employee/verify");
        router.push("/dashboard");
      } catch {}
    };

    checkUser();
  }, [router]);

  return <>{children}</>;
}
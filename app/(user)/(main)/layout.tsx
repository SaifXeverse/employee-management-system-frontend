"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/libs/axios";

export default function MainLayoutEmployee({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await api.get("/employee/verify");
      } catch {
        router.push("/login");
      }
    };

    checkAuth();
  }, [router]);

  return <main>{children}</main>;
}
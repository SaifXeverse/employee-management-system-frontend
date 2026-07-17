"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/libs/axios";

export default function AdminMainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        await api.get("/auth/verify");
        try {
          await api.get("/employee/verify");
          router.push("/dashboard");
          return;
        } catch {}

        setLoading(false);
      } catch {
        router.push("/admin/login");
      }
    };

    checkAdmin();
  }, [router]);

  if (loading) return null;

  return <main>{children}</main>;
}
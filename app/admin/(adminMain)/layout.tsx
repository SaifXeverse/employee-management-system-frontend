"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/libs/axios";
import Loading from "@/components/loader/Loading";

export default function AdminMainLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        await api.get("/auth/verify");
        try {
          await api.get("/employee/verify");
          router.replace("/dashboard");
          return;
        } catch {}

        setLoading(false);
      } catch {
        router.push("/admin/login");
      }
    };

    checkAdmin();
  }, [router]);

  if (loading) return <Loading />;

  return <main>{children}</main>;
}

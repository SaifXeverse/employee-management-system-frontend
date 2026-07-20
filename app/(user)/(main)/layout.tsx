"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/libs/axios";
import Loading from "@/components/loader/Loading";

export default function EmployeeMainLayout({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkEmployee = async () => {
      try {
        await api.get("/employee/verify");
        try {
          await api.get("/auth/verify");
          router.replace("/admin/dashboard");
          return;
        } catch {}

        setLoading(false);
      } catch {
        router.push("/login");
      }
    };

    checkEmployee();
  }, [router]);

  if (loading) return <Loading />;

  return <main>{children}</main>;
}
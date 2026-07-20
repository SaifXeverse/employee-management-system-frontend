"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/libs/axios";
import Loading from "@/components/loader/Loading";

export default function EmployeeAuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        await api.get("/employee/verify");
        router.replace("/dashboard");
        return;
      } catch (error) {
        console.log(error);
      }

      try {
        await api.get("/auth/verify");
        router.replace("/admin/dashboard");
        return;
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };

    checkLogin();
  }, [router]);

  if (loading) {
    return <Loading />;
  }

  return <>{children}</>;
}

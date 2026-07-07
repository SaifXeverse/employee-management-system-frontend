"use client";

import { useEffect } from "react";

export default function DashboardLayoutEmployee({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const onPageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        window.location.reload();
      }
    };

    window.addEventListener("pageshow", onPageShow);

    return () => window.removeEventListener("pageshow", onPageShow);
  }, []);

  return <>{children}</>;
}
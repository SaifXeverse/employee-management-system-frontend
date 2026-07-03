import Sidebar from "@/componnents/dashboard/Sidebar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("AccessToken")?.value;

  if (!token) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-slate-100">

      <Sidebar />

      <main className="ml-72 min-h-screen p-8">
        {children}
      </main>

    </div>
  );
}

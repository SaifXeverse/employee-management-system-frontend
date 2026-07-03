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

  return <main>{children}</main>;
}

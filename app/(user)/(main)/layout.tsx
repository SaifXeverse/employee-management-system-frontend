import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function MainLayoutEmployee({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("AccessTokenEmployee")?.value;

  if (!token) {
    redirect("/login");
  }
  return <main>{children}</main>;
}

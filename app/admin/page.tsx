import { cookies } from "next/headers";
import { redirect,  } from "next/navigation";

export default async function Admin() {
  const cookieStore = await cookies();

  const token = cookieStore.get("AccessToken")?.value;

  if (token) {
    redirect("/admin/dashboard");
  } else {
    redirect("/admin/login");
  }
}

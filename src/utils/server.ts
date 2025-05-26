import { cookies } from "next/headers";

export async function getServerAuthStatus() {
  const cookieStore = await cookies();
  const token = cookieStore.get("Authorization");
  return !!token;
}

import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  cookieStore.delete("Authorization");
  return Response.json({ message: "Logout exitoso" }, { status: 200 });
}

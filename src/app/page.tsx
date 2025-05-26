import { getServerAuthStatus } from "@/utils/server";
import { redirect } from "next/navigation";

export default async function Home() {
  if (await getServerAuthStatus()) redirect("/dashboard");

  redirect("/home");
}

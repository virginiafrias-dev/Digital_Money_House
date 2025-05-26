import LandingPage from "@/components/home/LandingPage";
import { getServerAuthStatus } from "@/utils/server";
import { redirect } from "next/navigation";

export default async function Home() {
  if (await getServerAuthStatus()) redirect("/dashboard");

  return <LandingPage />;
}

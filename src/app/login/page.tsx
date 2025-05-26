import LoginPage from "@/components/LoginPage/LoginPage";
import { getServerAuthStatus } from "@/utils/server";
import { redirect } from "next/navigation";

const page = async () => {
  if (await getServerAuthStatus()) redirect("/dashboard");

  return <LoginPage />;
};

export default page;

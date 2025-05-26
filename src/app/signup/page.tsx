import SignupPage from "@/components/SignupPage/SignupPage";
import { getServerAuthStatus } from "@/utils/server";
import { redirect } from "next/navigation";

const page = async () => {
  if (await getServerAuthStatus()) redirect("/dashboard");

  return <SignupPage />;
};

export default page;

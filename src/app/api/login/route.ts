import { postLogin } from "@/app/actions/loginActions";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const response = await postLogin(body.email, body.password);

    const { token } = response;

    const cookieStore = await cookies();
    cookieStore.set("Authorization", token);

    return Response.json({ message: "Login exitoso" }, { status: 200 });
  } catch (error) {
    return Response.error();
  }
}

import { postSignup } from "@/app/actions/loginActions";

export async function POST(request: Request) {
  try {
    const { firstname, lastname, dni, email, password, phone } =
      await request.json();
    if (!firstname || !lastname || !dni || !email || !password || !phone) {
      return Response.json({ error: "Falta algún dato" }, { status: 400 });
    }
    const response = await postSignup({
      firstname,
      lastname,
      dni,
      email,
      password,
      phone,
    });
    return Response.json(response);
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    throw error;
  }
}

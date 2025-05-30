import { getUserData } from "@/app/actions/loginActions";

export async function GET() {
  try {
    const userData = await getUserData();
    return Response.json(userData, { status: 200 });
  } catch (error) {
    return Response.json(
      { message: "Hubo un error al obtener la información del usuario", error },
      { status: 500 }
    );
  }
}

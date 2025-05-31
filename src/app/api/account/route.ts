import { getAccountInfo } from "@/app/actions/loginActions";

export async function GET() {
  try {
    const accountInfo = await getAccountInfo();
    return Response.json(accountInfo);
  } catch (error) {
    return Response.json(
      {
        message: "Hubo un error al obtener la información de la cuenta",
        error,
      },
      { status: 500 }
    );
  }
}

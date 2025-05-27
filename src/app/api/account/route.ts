import { getAccountInfo } from "@/app/actions/loginActions";

export async function GET() {
  try {
    const accountInfo = await getAccountInfo();
    return Response.json({ data: accountInfo }, { status: 200 });
  } catch (error) {
    return Response.json(
      { error: "Hubo un error al obtener la información de la cuenta" },
      { status: 500 }
    );
  }
}

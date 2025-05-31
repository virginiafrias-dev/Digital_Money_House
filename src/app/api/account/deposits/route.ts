import { getAccountInfo } from "@/app/actions/loginActions";
import axios from "axios";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const accountInfo = await getAccountInfo();
    const body = await request.json();
    const response = await axios.post(
      process.env.BASE_URL + "/api/accounts/" + accountInfo.id + "/deposits",
      {
        amount: Number(body.amount),
        dated: new Date().toISOString(),
        destination: "Cuenta propia",
        origin: String(body.creditCard),
      },
      { headers: { Authorization: accountInfo.token } }
    );
    return Response.json(response.data);
  } catch (error) {
    return Response.json(
      { message: "Error al realizar el deposito", error },
      { status: 500 }
    );
  }
}

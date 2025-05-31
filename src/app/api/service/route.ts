import { getAccountInfo } from "@/app/actions/loginActions";
import axios from "axios";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const accountInfo = await getAccountInfo();
    const response = await axios.get(process.env.BASE_URL + "/service", {
      headers: {
        Authorization: accountInfo.token,
      },
    });

    return Response.json(response.data);
  } catch (error) {
    return Response.json(
      { message: "Error fetching services", error },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, dated, description } = body;

    const accountInfo = await getAccountInfo();
    const response = await axios.post(
      process.env.BASE_URL +
        "/api/accounts/" +
        accountInfo.id +
        "/transactions",
      {
        amount: amount * -1,
        dated,
        description,
      },
      {
        headers: {
          Authorization: accountInfo.token,
        },
      }
    );
    return Response.json(response.data);
  } catch (error) {
    return Response.json(
      { message: "Error paying service", error },
      { status: 500 }
    );
  }
}

import { getAccountInfo } from "@/app/actions/loginActions";
import axios from "axios";
import { NextRequest } from "next/server";

export async function GET() {
  try {
    const accountInfo = await getAccountInfo();
    const response = await axios.get(
      process.env.BASE_URL + "/api/accounts/" + accountInfo.id + "/cards",
      { headers: { Authorization: accountInfo.token } }
    );
    return Response.json(response.data);
  } catch (error) {
    return Response.json(
      { message: "Error fetching cards", error },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log(body);

    const accountInfo = await getAccountInfo();

    const { number, name, expiry, cvv } = body;

    if (!number || !name || !expiry || !cvv) {
      return Response.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const response = await axios.post(
      process.env.BASE_URL + "/api/accounts/" + accountInfo.id + "/cards",
      {
        first_last_name: name,
        number_id: Number(number),
        expiration_date: expiry,
        cod: Number(cvv),
      },
      { headers: { Authorization: accountInfo.token } }
    );
    console.log(response.data);

    return Response.json(response.data);
  } catch (error) {
    console.log(error);
    return Response.json(
      { message: "Error creating card", error },
      { status: 500 }
    );
  }
}

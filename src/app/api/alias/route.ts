import { getAccountInfo } from "@/app/actions/loginActions";
import axios from "axios";
import { NextRequest } from "next/server";

export async function PATCH(request: NextRequest) {
  try {
    const accountInfo = await getAccountInfo();
    const body = await request.json();
    const response = await axios.patch(
      process.env.BASE_URL + "/api/accounts/" + accountInfo.id,
      body,
      { headers: { Authorization: accountInfo.token } }
    );
    return Response.json(response.data);
  } catch (error) {
    return Response.json({ message: "Error updating alias", error });
  }
}

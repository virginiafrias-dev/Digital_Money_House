import { getAccountInfo } from "@/app/actions/loginActions";
import axios from "axios";
import { NextRequest } from "next/server";

export async function DELETE(request: NextRequest) {
  const params = await request.json();
  const { id } = params;
  console.log("ID", id);
  try {
    const accountInfo = await getAccountInfo();
    const response = await axios.delete(
      process.env.BASE_URL + "/api/accounts/" + accountInfo.id + "/cards/" + id,
      {
        headers: { Authorization: accountInfo.token },
      }
    );
    return Response.json(response.data);
  } catch (error) {
    return Response.json(
      { message: "Error deleting card", error },
      { status: 500 }
    );
  }
}

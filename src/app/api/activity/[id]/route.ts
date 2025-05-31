import { getAccountInfo } from "@/app/actions/loginActions";
import axios from "axios";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const accountInfo = await getAccountInfo();
    const { pathname } = await request.nextUrl;
    const id = pathname.split("/").pop();

    const response = await axios.get(
      process.env.BASE_URL +
        "/api/accounts/" +
        accountInfo.id +
        "/transactions/" +
        id,
      {
        headers: { Authorization: accountInfo.token },
      }
    );

    return Response.json(response.data);
  } catch (error) {
    return Response.json(
      { message: "Error getting activity info", error },
      { status: 500 }
    );
  }
}

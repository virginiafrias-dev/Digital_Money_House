import { getAccountInfo } from "@/app/actions/loginActions";
import axios from "axios";

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

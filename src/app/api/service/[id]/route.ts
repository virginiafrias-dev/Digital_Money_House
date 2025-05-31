import axios from "axios";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { pathname } = await request.nextUrl;
    const response = await axios.get(
      process.env.BASE_URL + "/service/" + pathname.split("/").pop()
    );
    return Response.json(response.data);
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Error fetching service data" },
      { status: 500 }
    );
  }
}

import { getUserData } from "@/app/actions/loginActions";
import axios from "axios";
import { NextRequest } from "next/server";

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { user_id, token } = await getUserData();
    const response = await axios.patch(
      process.env.BASE_URL + "/api/users/" + user_id,
      body,
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    return Response.json({
      message: "Profile updated successfully",
    });
  } catch (error) {
    return Response.json(
      {
        error: "Error updating profile",
        message: error,
      },
      {
        status: 500,
      }
    );
  }
}

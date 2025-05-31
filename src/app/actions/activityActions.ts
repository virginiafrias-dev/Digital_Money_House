import axios from "axios";
import { getAccountInfo } from "./loginActions";
import { Activity } from "@/components/Dashboard/ActivityCardDashboard";

export async function getActivity(): Promise<Activity[] | Error> {
  try {
    const accountInfo = await getAccountInfo();
    const response = await axios.get(
      `${process.env.BASE_URL}/api/accounts/${accountInfo.id}/activity`,
      {
        headers: {
          Authorization: `${accountInfo.token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

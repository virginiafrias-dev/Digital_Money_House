import axios from "axios";
import { getAccountInfo } from "./loginActions";
import { Service } from "@/types/types";

export async function getServices(): Promise<Service[]> {
  try {
    const accountInfo = await getAccountInfo();
    const response = await axios.get(process.env.BASE_URL + "/service", {
      headers: {
        Authorization: accountInfo.token,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

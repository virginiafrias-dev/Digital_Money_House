import axios from "axios";
import { getAccountInfo } from "./loginActions";

export async function getCards() {
  try {
    const accountInfo = await getAccountInfo();
    const response = await axios.get(
      process.env.BASE_URL + "/api/accounts/" + accountInfo.id + "/cards",
      { headers: { Authorization: accountInfo.token } }
    );
    return response.data;
  } catch (error) {
    console.error({ message: "Error fetching cards" });
    return;
  }
}

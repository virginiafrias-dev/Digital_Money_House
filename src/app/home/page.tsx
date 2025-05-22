"use client";
import { getToken } from "@/utils";
import axios from "axios";

export default function Home() {
  const handleGetAccountInfo = async () => {
    const token = getToken();

    try {
      const accountResponse = await axios.get(
        "https://digitalmoney.digitalhouse.com/api/account",
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      const userResponse = await axios.get(
        "https://digitalmoney.digitalhouse.com/api/users/" +
          accountResponse.data.user_id,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      console.log(userResponse.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>HOLA</h1>
      <button onClick={handleGetAccountInfo}>Get Account Info</button>
    </div>
  );
}

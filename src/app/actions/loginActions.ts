import axios from "axios";

export const getAccountInfo = async () => {
  try {
    const response = await axios.get(
      "https://digitalmoney.digitalhouse.com/api/account",
      {
        headers: {
          api_key: process.env.TOKEN,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al obtener la cuenta:", error);
    throw error;
  }
};

export const getLoginToken = async (email: string, password: string) => {
  try {
    const response = await axios.post(process.env.BASE_URL + "/api/login", {
      // email: process.env.EMAIL_TEST,
      // password: process.env.PASSWORD_TEST,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error al hacer login:", error);
    throw error;
  }
};

export const pingAPI = async () => {
  try {
    const response = await axios.get(process.env.BASE_URL + "/ping");

    return response.data;
  } catch (error) {
    console.error("Error al hacer ping:", error);

    throw error;
  }
};

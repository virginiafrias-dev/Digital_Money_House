import { getServerToken } from "@/utils/server";
import axios from "axios";
import { AccountInfo, UserData } from "@/types/types";

export const dynamic = "force-dynamic";

export const getAccountInfo = async (): Promise<AccountInfo> => {
  try {
    const token = await getServerToken();

    const response = await axios.get(process.env.BASE_URL + "/api/account", {
      headers: {
        Authorization: token,
      },
    });
    return { ...response.data, token };
  } catch (error) {
    console.error("Error al obtener la cuenta:", error);
    throw error;
  }
};

export const getUserData = async (): Promise<UserData> => {
  try {
    const accountInfo = await getAccountInfo();
    const response = await axios.get(
      process.env.BASE_URL + `/api/users/${accountInfo.user_id}`,
      {
        headers: {
          Authorization: accountInfo.token,
        },
      }
    );
    return { ...response.data, ...accountInfo };
  } catch (error) {
    console.error("Error al obtener la información del usuario:", error);
    throw error;
  }
};

export const postLogin = async (email: string, password: string) => {
  try {
    const response = await axios.post(process.env.BASE_URL + "/api/login", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error al hacer login:", error);
    throw error;
  }
};

interface SignupData {
  firstname: string;
  lastname: string;
  dni: number;
  email: string;
  password: string;
  phone: string;
}

export const postSignup = async (data: SignupData) => {
  try {
    const response = await axios.post(process.env.BASE_URL + "/api/users", {
      firstname: data.firstname,
      lastname: data.lastname,
      dni: data.dni,
      email: data.email,
      password: data.password,
      phone: data.phone,
    });
    return response.data;
  } catch (error) {
    console.error("Error al registrar usuario:", error);
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

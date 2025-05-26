import axios from "axios";
import { getAccountInfo, postLogin, postSignup, pingAPI } from "./loginActions";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("loginActions", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getAccountInfo", () => {
    it("debe retornar los datos de la cuenta en caso de éxito", async () => {
      const mockData = { id: 1, nombre: "Test" };
      mockedAxios.get.mockResolvedValueOnce({ data: mockData });

      const result = await getAccountInfo();
      expect(result).toEqual(mockData);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        `${process.env.BASE_URL}/api/account`,
        { headers: { api_key: process.env.TOKEN } }
      );
    });

    it("debe lanzar un error en caso de fallo", async () => {
      mockedAxios.get.mockRejectedValueOnce(new Error("Error de red"));
      await expect(getAccountInfo()).rejects.toThrow("Error de red");
    });
  });

  describe("postLogin", () => {
    it("debe retornar los datos de login en caso de éxito", async () => {
      const mockData = { token: "abc123" };
      mockedAxios.post.mockResolvedValueOnce({ data: mockData });

      const result = await postLogin("test@mail.com", "1234");
      expect(result).toEqual(mockData);
      expect(mockedAxios.post).toHaveBeenCalledWith(
        `${process.env.BASE_URL}/api/login`,
        { email: "test@mail.com", password: "1234" }
      );
    });

    it("debe lanzar un error en caso de fallo", async () => {
      mockedAxios.post.mockRejectedValueOnce(new Error("Error de login"));
      await expect(postLogin("test@mail.com", "1234")).rejects.toThrow(
        "Error de login"
      );
    });
  });

  describe("postSignup", () => {
    const signupData = {
      firstname: "Juan",
      lastname: "Pérez",
      dni: 12345678,
      email: "juan@mail.com",
      password: "pass",
      phone: "123456789",
    };

    it("debe retornar los datos de registro en caso de éxito", async () => {
      const mockData = { id: 2, ...signupData };
      mockedAxios.post.mockResolvedValueOnce({ data: mockData });

      const result = await postSignup(signupData);
      expect(result).toEqual(mockData);
      expect(mockedAxios.post).toHaveBeenCalledWith(
        process.env.BASE_URL + "/api/users",
        signupData
      );
    });

    it("debe lanzar un error en caso de fallo", async () => {
      mockedAxios.post.mockRejectedValueOnce(new Error("Error de registro"));
      await expect(postSignup(signupData)).rejects.toThrow("Error de registro");
    });
  });

  describe("pingAPI", () => {
    it("debe retornar la respuesta del ping en caso de éxito", async () => {
      const mockData = { pong: true };
      mockedAxios.get.mockResolvedValueOnce({ data: mockData });

      const result = await pingAPI();
      expect(result).toEqual(mockData);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        process.env.BASE_URL + "/ping"
      );
    });

    it("debe lanzar un error en caso de fallo", async () => {
      mockedAxios.get.mockRejectedValueOnce(new Error("Error de ping"));
      await expect(pingAPI()).rejects.toThrow("Error de ping");
    });
  });
});

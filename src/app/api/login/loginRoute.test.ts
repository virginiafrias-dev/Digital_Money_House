import { POST } from "./route";
import { postLogin } from "@/app/actions/loginActions";
import { cookies } from "next/headers";

global.Response = {
  json: (data: any, init?: any) => ({
    json: async () => data,
    status: init?.status,
  }),
  error: () => ({
    json: async () => ({ error: "Error interno" }),
    status: 500,
  }),
} as any;

jest.mock("@/app/actions/loginActions");
jest.mock("next/headers");

describe("POST /api/login", () => {
  const mockSet = jest.fn();
  const mockCookieStore = { set: mockSet };

  beforeEach(() => {
    jest.clearAllMocks();
    (cookies as jest.Mock).mockResolvedValue(mockCookieStore);
  });

  it("debería devolver 200 y setear la cookie en caso de éxito", async () => {
    const mockToken = "fake-token";
    (postLogin as jest.Mock).mockResolvedValue({ token: mockToken });

    const mockRequest = {
      json: jest
        .fn()
        .mockResolvedValue({ email: "test@mail.com", password: "1234" }),
    } as any;

    const response = await POST(mockRequest);

    expect(postLogin).toHaveBeenCalledWith("test@mail.com", "1234");
    expect(mockSet).toHaveBeenCalledWith("Authorization", mockToken);
    expect(response.status).toBe(200);
  });

  it("debería devolver un error si postLogin lanza una excepción", async () => {
    (postLogin as jest.Mock).mockRejectedValue(new Error("error"));

    const mockRequest = {
      json: jest
        .fn()
        .mockResolvedValue({ email: "test@mail.com", password: "1234" }),
    } as any;

    const response = await POST(mockRequest);

    expect(response.status).toBe(500);
  });
});

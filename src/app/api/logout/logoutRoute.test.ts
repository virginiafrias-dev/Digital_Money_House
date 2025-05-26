import { GET } from "./route";

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

jest.mock("next/headers", () => ({
  cookies: jest.fn(),
}));

describe("GET /api/logout", () => {
  const deleteMock = jest.fn();
  const cookiesMock = require("next/headers").cookies;

  beforeEach(() => {
    deleteMock.mockClear();
    cookiesMock.mockClear();
    cookiesMock.mockResolvedValue({
      delete: deleteMock,
    });
  });

  it("debe eliminar la cookie Authorization y devolver mensaje de éxito", async () => {
    const response = await GET();

    expect(cookiesMock).toHaveBeenCalled();
    expect(deleteMock).toHaveBeenCalledWith("Authorization");
    expect(response.status).toBe(200);

    const json = await response.json();
    expect(json).toEqual({ message: "Logout exitoso" });
  });
});

import { POST } from "./route";
import { postSignup } from "@/app/actions/loginActions";

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

describe("POST /api/signup", () => {
  const mockPostSignup = postSignup as jest.Mock;

  const validBody = {
    firstname: "Juan",
    lastname: "Pérez",
    dni: "12345678",
    email: "juan@example.com",
    password: "password123",
    phone: "1234567890",
  };

  function mockRequest(body: any) {
    return {
      json: jest.fn().mockResolvedValue(body),
    } as any as Request;
  }

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("debe devolver error si falta algún dato", async () => {
    const { firstname, ...incompleteBody } = validBody;
    const req = mockRequest(incompleteBody);

    const res: any = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(400);
    expect(data).toEqual({ error: "Falta algún dato" });
    expect(mockPostSignup).not.toHaveBeenCalled();
  });

  it("debe llamar a postSignup y devolver su respuesta si los datos son válidos", async () => {
    const req = mockRequest(validBody);
    const fakeResponse = { success: true, userId: 1 };
    mockPostSignup.mockResolvedValue(fakeResponse);

    const res: any = await POST(req);
    const data = await res.json();

    expect(mockPostSignup).toHaveBeenCalledWith(validBody);
    expect(data).toEqual(fakeResponse);
    expect(res.status).toBeUndefined();
  });

  it("debe manejar errores y lanzarlos", async () => {
    const req = mockRequest(validBody);
    const error = new Error("Algo salió mal");
    mockPostSignup.mockRejectedValue(error);

    await expect(POST(req)).rejects.toThrow("Algo salió mal");
  });
});

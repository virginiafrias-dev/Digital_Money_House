import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginPage from "./LoginPage";
import axios from "axios";

jest.mock("@/hooks/useAuth", () => ({
  useAuth: () => ({ isAuthenticated: false }),
}));

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

jest.mock("axios", () => ({
  post: jest.fn(),
}));

describe("LoginPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renderiza el formulario de email", () => {
    render(<LoginPage />);
    expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument();
    expect(screen.getByTestId("email-input")).toBeInTheDocument();
    expect(screen.getByTestId("continuar-button")).toBeInTheDocument();
  });

  it("muestra error si el email es inválido", async () => {
    render(<LoginPage />);
    fireEvent.change(screen.getByTestId("email-input"), {
      target: { value: "no-es-email" },
    });
    fireEvent.click(screen.getByTestId("continuar-button"));
    await waitFor(() => {
      expect(
        screen.getByText(/Introduce un email válido/i)
      ).toBeInTheDocument();
    });
  });

  it("pasa al formulario de contraseña si el email es válido", async () => {
    render(<LoginPage />);
    fireEvent.change(screen.getByTestId("email-input"), {
      target: { value: "test@email.com" },
    });
    fireEvent.click(screen.getByTestId("continuar-button"));
    await waitFor(() => {
      expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
      expect(screen.getByTestId("password-input")).toBeInTheDocument();
    });
  });

  it("muestra error si la contraseña está vacía", async () => {
    render(<LoginPage />);
    fireEvent.change(screen.getByTestId("email-input"), {
      target: { value: "test@email.com" },
    });
    fireEvent.click(screen.getByTestId("continuar-button"));
    await waitFor(() => {
      expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
    });
    fireEvent.click(screen.getByTestId("ingresar-button"));
    await waitFor(() => {
      expect(screen.getByText(/Campo obligatorio/i)).toBeInTheDocument();
    });
  });

  it("muestra error de credenciales incorrectas si el login falla", async () => {
    (axios.post as jest.Mock).mockRejectedValueOnce(
      new Error("Credenciales incorrectas")
    );

    render(<LoginPage />);
    // Paso 1: email válido
    fireEvent.change(screen.getByTestId("email-input"), {
      target: { value: "test@email.com" },
    });
    fireEvent.click(screen.getByTestId("continuar-button"));
    await waitFor(() => {
      expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
    });
    // Paso 2: contraseña
    fireEvent.change(screen.getByTestId("password-input"), {
      target: { value: "123456" },
    });
    fireEvent.click(screen.getByTestId("ingresar-button"));
    await waitFor(() => {
      expect(screen.getByText(/Credenciales incorrectas/i)).toBeInTheDocument();
    });
  });
});

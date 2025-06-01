import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SignupPage from "./SignupPage";
import axios from "axios";

jest.mock("next/navigation");

import * as nextNavigation from "next/navigation";

jest.mock("@/hooks/useAuth", () => ({
  useAuth: () => ({ isAuthenticated: false }),
}));

jest.mock("axios", () => ({
  post: jest.fn(),
}));

describe("SignupPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renderiza los campos principales", () => {
    render(<SignupPage />);
    expect(screen.getByTestId("firstname-input")).toBeInTheDocument();
    expect(screen.getByTestId("lastname-input")).toBeInTheDocument();
    expect(screen.getByTestId("dni-input")).toBeInTheDocument();
    expect(screen.getByTestId("email-input")).toBeInTheDocument();
    expect(screen.getByTestId("password-input")).toBeInTheDocument();
    expect(screen.getByTestId("confirm-password-input")).toBeInTheDocument();
    expect(screen.getByTestId("phone-input")).toBeInTheDocument();
    expect(screen.getByTestId("submit-button")).toBeInTheDocument();
  });

  it("muestra errores si los campos obligatorios están vacíos", async () => {
    render(<SignupPage />);
    fireEvent.click(screen.getByTestId("submit-button"));
    await waitFor(() => {
      expect(screen.getAllByText("Campo obligatorio").length).toBeGreaterThan(
        0
      );
    });
  });

  it("muestra error si el email es inválido", async () => {
    render(<SignupPage />);
    fireEvent.change(screen.getByTestId("email-input"), {
      target: { value: "no-es-email" },
    });
    fireEvent.click(screen.getByTestId("submit-button"));
    await waitFor(() => {
      expect(
        screen.getByText(/Introduce un email válido/i)
      ).toBeInTheDocument();
    });
  });

  it("muestra error si las contraseñas no coinciden", async () => {
    render(<SignupPage />);
    fireEvent.change(screen.getByTestId("password-input"), {
      target: { value: "Abcdef1!" },
    });
    fireEvent.change(screen.getByTestId("confirm-password-input"), {
      target: { value: "Diferente1!" },
    });
    fireEvent.click(screen.getByTestId("submit-button"));
    await waitFor(() => {
      expect(
        screen.getByText(/Las contraseñas no coinciden/i)
      ).toBeInTheDocument();
    });
  });

  it("envía el formulario correctamente si los datos son válidos", async () => {
    (axios.post as jest.Mock).mockResolvedValueOnce({ data: {} });

    render(<SignupPage />);
    fireEvent.change(screen.getByTestId("firstname-input"), {
      target: { value: "Juan" },
    });
    fireEvent.change(screen.getByTestId("lastname-input"), {
      target: { value: "Pérez" },
    });
    fireEvent.change(screen.getByTestId("dni-input"), {
      target: { value: "12345678" },
    });
    fireEvent.change(screen.getByTestId("email-input"), {
      target: { value: "juan@test.com" },
    });
    fireEvent.change(screen.getByTestId("password-input"), {
      target: { value: "Abcdef1!" },
    });
    fireEvent.change(screen.getByTestId("confirm-password-input"), {
      target: { value: "Abcdef1!" },
    });
    fireEvent.change(screen.getByTestId("phone-input"), {
      target: { value: "+541112345678" },
    });

    fireEvent.click(screen.getByTestId("submit-button"));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        "/api/signup",
        expect.any(Object)
      );
      expect(nextNavigation.useRouter().push).toHaveBeenCalledWith(
        "/signup/success"
      );
    });
  });
});

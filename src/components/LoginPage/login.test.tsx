import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import Page from "./LoginPage";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Login Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renderiza el formulario de email al inicio", () => {
    render(<Page />);
    expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument();
    expect(screen.getByTestId("email-input")).toBeInTheDocument();
    expect(screen.getByTestId("continuar-button")).toBeInTheDocument();
  });

  it("muestra error si el email es inválido", async () => {
    render(<Page />);
    fireEvent.change(screen.getByTestId("email-input"), {
      target: { value: "no-es-un-email" },
    });
    fireEvent.click(screen.getByTestId("continuar-button"));
    await waitFor(() => {
      expect(
        screen.getByText(/introduce un email válido/i)
      ).toBeInTheDocument();
    });
  });

  it("muestra el formulario de contraseña al enviar un email válido", async () => {
    render(<Page />);
    fireEvent.change(screen.getByTestId("email-input"), {
      target: { value: "test@email.com" },
    });
    fireEvent.click(screen.getByTestId("continuar-button"));
    await waitFor(() => {
      expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
      expect(screen.getByTestId("password-input")).toBeInTheDocument();
      expect(screen.getByTestId("ingresar-button")).toBeInTheDocument();
    });
  });

  it("muestra error si la contraseña está vacía", async () => {
    render(<Page />);
    fireEvent.change(screen.getByTestId("email-input"), {
      target: { value: "test@email.com" },
    });
    fireEvent.click(screen.getByTestId("continuar-button"));
    await waitFor(() => {
      expect(screen.getByTestId("password-input")).toBeInTheDocument();
    });
    fireEvent.click(screen.getByTestId("ingresar-button"));
    await waitFor(() => {
      expect(screen.getByText(/campo obligatorio/i)).toBeInTheDocument();
    });
  });

  it("hace la petición y redirige si las credenciales son correctas", async () => {
    delete (window as any).location;
    (window as any).location = { href: "" };

    mockedAxios.post.mockResolvedValueOnce({ data: { ok: true } });

    render(<Page />);
    fireEvent.change(screen.getByTestId("email-input"), {
      target: { value: "test@email.com" },
    });
    fireEvent.click(screen.getByTestId("continuar-button"));
    await waitFor(() => {
      expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
    });
    fireEvent.change(screen.getByTestId("password-input"), {
      target: { value: "123456" },
    });
    fireEvent.click(screen.getByTestId("ingresar-button"));
    await waitFor(() => {
      expect(window.location.href).toBe("/home");
    });
  });

  it("muestra error de credenciales incorrectas si la API falla", async () => {
    mockedAxios.post.mockRejectedValueOnce(
      new Error("Credenciales incorrectas")
    );

    render(<Page />);
    fireEvent.change(screen.getByTestId("email-input"), {
      target: { value: "test@email.com" },
    });
    fireEvent.click(screen.getByTestId("continuar-button"));
    await waitFor(() => {
      expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
    });
    fireEvent.change(screen.getByTestId("password-input"), {
      target: { value: "wrongpass" },
    });
    fireEvent.click(screen.getByTestId("ingresar-button"));
    await waitFor(() => {
      expect(screen.getByText(/credenciales incorrectas/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument();
    });
  });
});

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Page from "./page";

jest.mock("axios");
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));
const mockedAxios = axios as jest.Mocked<typeof axios>;
const pushMock = jest.fn();
(useRouter as jest.Mock).mockReturnValue({ push: pushMock });

describe("Signup Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renderiza el formulario y los campos requeridos", () => {
    render(<Page />);

    expect(screen.getByTestId("firstname-input")).toBeInTheDocument();
    expect(screen.getByTestId("lastname-input")).toBeInTheDocument();
    expect(screen.getByTestId("dni-input")).toBeInTheDocument();
    expect(screen.getByTestId("email-input")).toBeInTheDocument();
    expect(screen.getByTestId("password-input")).toBeInTheDocument();
    expect(screen.getByTestId("confirm-password-input")).toBeInTheDocument();
    expect(screen.getByTestId("phone-input")).toBeInTheDocument();
    expect(screen.getByTestId("submit-button")).toBeInTheDocument();
  });

  it("muestra errores de validación si los campos están vacíos", async () => {
    render(<Page />);
    fireEvent.click(screen.getByTestId("submit-button"));

    await waitFor(() => {
      expect(screen.getAllByText(/campo obligatorio/i).length).toBeGreaterThan(
        0
      );
    });
  });

  it("muestra error si el email es inválido", async () => {
    render(<Page />);
    fireEvent.change(screen.getByTestId("email-input"), {
      target: { value: "asd" },
    });
    fireEvent.click(screen.getByTestId("submit-button"));

    await waitFor(() => {
      expect(
        screen.getByText(/introduce un email válido/i)
      ).toBeInTheDocument();
    });
  });

  it("envía los datos y redirige si el registro es exitoso", async () => {
    mockedAxios.post.mockResolvedValueOnce({ data: {} });
    render(<Page />);

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
      target: { value: "juan@perez.com" },
    });
    fireEvent.change(screen.getByTestId("password-input"), {
      target: { value: "Abcdef1!" },
    });
    fireEvent.change(screen.getByTestId("confirm-password-input"), {
      target: { value: "Abcdef1!" },
    });
    fireEvent.change(screen.getByTestId("phone-input"), {
      target: { value: "1234567890" },
    });
    fireEvent.click(screen.getByTestId("submit-button"));

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledWith(
        "/api/signup",
        expect.any(Object)
      );
      expect(pushMock).toHaveBeenCalledWith("/signup/success");
    });
  });

  it("muestra error si la API falla", async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error("Error de API"));
    render(<Page />);

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
      target: { value: "juan@perez.com" },
    });
    fireEvent.change(screen.getByTestId("password-input"), {
      target: { value: "Abcdef1!" },
    });
    fireEvent.change(screen.getByTestId("confirm-password-input"), {
      target: { value: "Abcdef1!" },
    });
    fireEvent.change(screen.getByTestId("phone-input"), {
      target: { value: "1234567890" },
    });
    fireEvent.click(screen.getByTestId("submit-button"));

    await waitFor(() => {
      expect(pushMock).not.toHaveBeenCalled();
    });
  });
});

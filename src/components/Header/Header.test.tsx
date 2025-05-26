import React from "react";
import * as utils from "@/utils";
import { render, screen } from "@testing-library/react";
import Header from "./Header";
import { usePathname } from "next/navigation";

jest.mock("@/public/icons/logo-negro", () => () => (
  <div data-testid="logo-negro" />
));
jest.mock("@/public/icons/logo-verde", () => () => (
  <div data-testid="logo-verde" />
));

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

jest.spyOn(utils, "getToken");

describe("Header", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("muestra el Logo Negro y el botón 'Iniciar sesión' en /signup", async () => {
    (usePathname as jest.Mock).mockReturnValue("/signup");

    (utils.getToken as jest.Mock).mockResolvedValue(null);

    render(<Header />);
    expect(await screen.findByTestId("logo-negro")).toBeInTheDocument();
    expect(screen.queryByTestId("login-button-on-signup")).toBeInTheDocument();
  });

  it("muestra el Logo Negro y ningún botón en /login", async () => {
    (usePathname as jest.Mock).mockReturnValue("/login");

    (utils.getToken as jest.Mock).mockResolvedValue(null);

    render(<Header />);
    expect(await screen.findByTestId("logo-negro")).toBeInTheDocument();
    expect(
      screen.queryByTestId("login-button-on-signup")
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId("login-button-on-home")
    ).not.toBeInTheDocument();
    expect(screen.queryByTestId("logout-button")).not.toBeInTheDocument();
    expect(screen.queryByTestId("signup-button")).not.toBeInTheDocument();
  });

  it(`muestra el Logo Verde y botones de "Cerrar sesión" y "Crear cuenta" en /home cuando hay token`, async () => {
    (usePathname as jest.Mock).mockReturnValue("/home");

    (utils.getToken as jest.Mock).mockResolvedValue("token123");

    render(<Header />);
    expect(await screen.findByTestId("logo-verde")).toBeInTheDocument();
    expect(screen.getByTestId("logout-button")).toBeInTheDocument();
    expect(screen.getByTestId("signup-button")).toBeInTheDocument();
  });

  it(`muestra el Logo Verde y el botón "Ingresar" y "Crear cuenta" en /home cuando no hay token`, async () => {
    (usePathname as jest.Mock).mockReturnValue("/home");

    (utils.getToken as jest.Mock).mockResolvedValue(null);

    render(<Header />);
    expect(await screen.findByTestId("logo-verde")).toBeInTheDocument();
    expect(screen.getByTestId("login-button-on-home")).toBeInTheDocument();
    expect(screen.getByTestId("signup-button")).toBeInTheDocument();
  });
});

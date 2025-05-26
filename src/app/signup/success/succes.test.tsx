import React from "react";
import { render, screen } from "@testing-library/react";
import SignupSuccessPage from "./page";

jest.mock("@/public/icons/check-verde", () => (props: any) => (
  <svg data-testid="check-verde-icon" {...props} />
));

describe("SignupSuccessPage", () => {
  it('muestra el mensaje "Registro Exitoso"', () => {
    render(<SignupSuccessPage />);
    expect(screen.getByText(/registro exitoso/i)).toBeInTheDocument();
  });

  it("muestra el ícono de check", () => {
    render(<SignupSuccessPage />);
    expect(screen.getByTestId("check-verde-icon")).toBeInTheDocument();
  });

  it("muestra el mensaje de confirmación de email", () => {
    render(<SignupSuccessPage />);
    expect(
      screen.getByText(/hemos enviado un correo de confirmación/i)
    ).toBeInTheDocument();
  });

  it('muestra el botón/enlace "Continuar" que lleva a /login', () => {
    render(<SignupSuccessPage />);
    const link = screen.getByRole("link", { name: /continuar/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/login");
  });
});

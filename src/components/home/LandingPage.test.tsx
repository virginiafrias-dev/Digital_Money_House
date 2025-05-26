import { render, screen } from "@testing-library/react";
import LandingPage from "./LandingPage";

jest.mock("../Card/Card", () => ({ children, className }: any) => (
  <div data-testid="card" className={className}>
    {children}
  </div>
));

describe("LandingPage", () => {
  it("renderiza el título principal correctamente (mobile)", () => {
    render(<LandingPage />);
    expect(screen.getByTestId("title-mobile")).toBeInTheDocument();
  });

  it("renderiza el subtítulo correctamente (tablet and up)", () => {
    render(<LandingPage />);
    expect(screen.getByTestId("title-tablet-and-up")).toBeInTheDocument();
  });

  it("renderiza las tarjetas con sus títulos y descripciones", () => {
    render(<LandingPage />);
    expect(screen.getByText(/Transferí dinero/i)).toBeInTheDocument();
    expect(screen.getByText(/Pago de servicios/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        /Desde Digital Money House vas a poder transferir dinero/i
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Pagá mensualmente los servicios en 3 simples clicks/i)
    ).toBeInTheDocument();
  });

  it("renderiza la cantidad correcta de tarjetas", () => {
    render(<LandingPage />);
    expect(screen.getAllByTestId("card")).toHaveLength(2);
  });
});

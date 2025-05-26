import React from "react";
import { render, screen } from "@testing-library/react";
import Card from "./Card";

describe("Card", () => {
  it("renderiza el contenido de children", () => {
    render(<Card>Contenido de prueba</Card>);
    expect(screen.getByText("Contenido de prueba")).toBeInTheDocument();
  });

  it("aplica la clase para style='white' por defecto", () => {
    render(<Card>White</Card>);
    const card = screen.getByText("White");
    expect(card).toHaveClass("bg-brand-white");
    expect(card).toHaveClass("text-brand-black");
  });

  it("aplica la clase para style='black'", () => {
    render(<Card style="black">Black</Card>);
    const card = screen.getByText("Black");
    expect(card).toHaveClass("bg-brand-black");
    expect(card).toHaveClass("text-brand-white");
  });

  it("aplica la clase para style='green'", () => {
    render(<Card style="green">Green</Card>);
    const card = screen.getByText("Green");
    expect(card).toHaveClass("bg-brand-green");
    expect(card).toHaveClass("text-brand-black");
  });

  it("aplica className adicional si se pasa", () => {
    render(<Card className="mi-clase-extra">Con clase extra</Card>);
    const card = screen.getByText("Con clase extra");
    expect(card).toHaveClass("mi-clase-extra");
  });
});

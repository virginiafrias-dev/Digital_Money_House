import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { PersonalInfo } from "./PersonalInfo";
import axios from "axios";

jest.mock("axios", () => ({
  patch: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    refresh: jest.fn(),
  }),
}));

const toastErrorMock = jest.fn();
jest.mock("react-toastify", () => ({
  toast: { error: (...args: unknown[]) => toastErrorMock(...args) },
  ToastContainer: () => <div data-testid="toast-container" />,
}));

const userData = {
  firstname: "Juan",
  alias: "juan.perez.tester",
  lastname: "Pérez",
  email: "juan@test.com",
  dni: "12345678",
  phone: "+541112345678",
  password: "Abcdef1!",
};

describe("PersonalInfo", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renderiza los datos personales", () => {
    render(<PersonalInfo userData={userData} />);
    expect(screen.getByText("Tus datos")).toBeInTheDocument();
    expect(screen.getByText("Juan")).toBeInTheDocument();
    expect(screen.getByText("juan.perez.tester")).toBeInTheDocument();
    expect(screen.getByText("Pérez")).toBeInTheDocument();
    expect(screen.getByText("juan@test.com")).toBeInTheDocument();
    expect(screen.getByText("12345678")).toBeInTheDocument();
    expect(screen.getByText("+541112345678")).toBeInTheDocument();
    expect(screen.getByText("Abcdef1!")).toBeInTheDocument();
  });

  it("permite editar y guardar el alias correctamente", async () => {
    render(<PersonalInfo userData={userData} />);
    const editButtons = screen.getAllByRole("button");
    fireEvent.click(editButtons[0]);
    const input = screen.getByDisplayValue("juan.perez.tester");
    fireEvent.change(input, { target: { value: "nuevo.alias.tester" } });
    const confirmButtons = screen.getAllByRole("button");
    fireEvent.click(confirmButtons[0]);
    await waitFor(() => {
      expect(axios.patch).toHaveBeenCalledWith("/api/alias", {
        alias: "nuevo.alias.tester",
      });
    });
  });

  it("muestra error si el alias es inválido", async () => {
    render(<PersonalInfo userData={userData} />);
    const editButtons = screen.getAllByRole("button");
    fireEvent.click(editButtons[0]);
    const input = screen.getByDisplayValue("juan.perez.tester");
    fireEvent.change(input, { target: { value: "aliasinvalido" } });
    const confirmButtons = screen.getAllByRole("button");
    fireEvent.click(confirmButtons[0]);
    await waitFor(() => {
      expect(toastErrorMock).toHaveBeenCalledWith(
        "El alias debe contener tres palabras separadas por puntos"
      );
    });
  });

  it("al cancelar, el valor vuelve al original", async () => {
    render(<PersonalInfo userData={userData} />);
    const editButtons = screen.getAllByRole("button");
    fireEvent.click(editButtons[0]);
    const input = screen.getByDisplayValue("juan.perez.tester");
    fireEvent.change(input, { target: { value: "otro.alias.tester" } });
    const cancelButtons = screen.getAllByRole("button");
    fireEvent.click(cancelButtons[1]);
    expect(screen.getByText("juan.perez.tester")).toBeInTheDocument();
  });
});

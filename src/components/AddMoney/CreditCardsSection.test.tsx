import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CreditCardsSection from "./CreditCardsSection";

jest.mock("@/hooks/useCreditCards", () => () => ({
  creditCards: [{ number_id: "1234567890123456", name: "Visa" }],
  selectedCreditCard: { number_id: "1234567890123456", name: "Visa" },
  creditCardsLoading: false,
  setSelectedCreditCard: jest.fn(),
}));

jest.mock("@/utils/utils", () => ({
  getCreditCardIssuer: () => "Visa",
}));

jest.mock("axios", () => ({
  post: jest.fn(),
}));

const toastErrorMock = jest.fn();
jest.mock("react-toastify", () => ({
  toast: { error: (...args: any[]) => toastErrorMock(...args) },
  ToastContainer: () => <div data-testid="toast-container" />,
}));

describe("CreditCardsSection", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renderiza el paso 1 y permite avanzar al paso 2", () => {
    render(<CreditCardsSection />);
    expect(screen.getByText("Seleccionar tarjeta")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Continuar"));
    expect(
      screen.getByText((text) =>
        text.includes("¿Cuánto querés ingresar a la cuenta?")
      )
    ).toBeInTheDocument();
  });

  it("muestra error si el monto es inválido", async () => {
    render(<CreditCardsSection />);
    fireEvent.click(screen.getByText("Continuar"));
    fireEvent.change(screen.getByTestId("amount-input"), {
      target: { value: "0" },
    });
    fireEvent.click(screen.getByText("Continuar"));
    await waitFor(() => {
      expect(
        screen.getByText(/El monto debe ser mayor a 0/i)
      ).toBeInTheDocument();
    });
  });

  it("permite avanzar al paso 3 y transferir correctamente", async () => {
    const axios = require("axios");
    axios.post.mockResolvedValueOnce({
      data: { dated: "2024-06-01T12:00:00Z" },
    });

    render(<CreditCardsSection />);
    fireEvent.click(screen.getByText("Continuar"));
    fireEvent.change(screen.getByPlaceholderText("0"), {
      target: { value: "1000" },
    });
    fireEvent.click(screen.getByText("Continuar"));
    await waitFor(() => {
      expect(
        screen.getByText((text) => text.includes("Revisá que esté todo bien"))
      ).toBeInTheDocument();
    });
    fireEvent.click(screen.getByText((text) => text.includes("Transferir")));
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith("/api/account/deposits", {
        amount: 1000,
        creditCard: "1234567890123456",
      });
      expect(
        screen.getByText((text) => text.includes("Ya cargamos el dinero"))
      ).toBeInTheDocument();
    });
  });

  it("muestra error si la transferencia falla", async () => {
    const axios = require("axios");
    axios.post.mockRejectedValueOnce(new Error("Error al transferir"));

    render(<CreditCardsSection />);
    fireEvent.click(screen.getByText("Continuar"));
    fireEvent.change(screen.getByPlaceholderText("0"), {
      target: { value: "1000" },
    });
    fireEvent.click(screen.getByText("Continuar"));
    await waitFor(() => {
      expect(
        screen.getByText((text) => text.includes("Revisá que esté todo bien"))
      ).toBeInTheDocument();
    });
    fireEvent.click(screen.getByText((text) => text.includes("Transferir")));
    await waitFor(() => {
      expect(toastErrorMock).toHaveBeenCalledWith("Error al transferir");
    });
  });
});

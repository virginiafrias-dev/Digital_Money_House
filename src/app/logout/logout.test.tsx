import React from "react";
import { render, waitFor } from "@testing-library/react";
import axios from "axios";
import Logout from "./page";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Logout", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    delete (window as any).location;
    (window as any).location = { href: "" };
  });

  it("llama a /api/logout al renderizar", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: {} });
    render(<Logout />);
    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalledWith("/api/logout");
    });
  });

  it("redirige a la página principal después de logout", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: {} });
    render(<Logout />);
    await waitFor(() => {
      expect(window.location.href).toBe("/home");
    });
  });
});

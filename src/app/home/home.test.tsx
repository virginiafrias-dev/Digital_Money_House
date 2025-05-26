import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Home from "./page";
import * as utils from "@/utils";

jest.mock("@/components/home/HomePage", () => () => <div>HomePage</div>);
jest.mock("@/components/home/LandingPage", () => () => <div>LandingPage</div>);

describe("Home page", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("muestra el loader mientras se verifica el token", async () => {
    jest
      .spyOn(utils, "getToken")
      .mockImplementation(() => new Promise(() => {}));
    render(<Home />);
    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });

  it("muestra HomePage si hay token", async () => {
    jest.spyOn(utils, "getToken").mockResolvedValue("fake-token");
    render(<Home />);
    await waitFor(() => {
      expect(screen.getByText("HomePage")).toBeInTheDocument();
    });
  });

  it("muestra LandingPage si NO hay token", async () => {
    jest.spyOn(utils, "getToken").mockResolvedValue(undefined);
    render(<Home />);
    await waitFor(() => {
      expect(screen.getByText("LandingPage")).toBeInTheDocument();
    });
  });
});

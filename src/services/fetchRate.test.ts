import { describe, it, expect, vi } from "vitest";
import axios from "axios";
import { fetchRate, FetchRateResponseData } from "./fetchRate";

vi.mock("axios");
const mockedAxios = vi.mocked(axios, true);

describe("fetchRate", () => {
  it("should fetch the rate successfully", async () => {
    const mockedResponseData: FetchRateResponseData = {
      rate: 100000,
    };
    const symbol = "BTC";
    mockedAxios.get.mockResolvedValue({ data: mockedResponseData });
    const data = await fetchRate(symbol);
    expect(data).toEqual(mockedResponseData);
  });
  it("should throw a generic error message", async () => {
    const errorMessage = "An unexpected error occurred";
    const symbol = "BTC";
    mockedAxios.get.mockRejectedValue(errorMessage);
    await expect(fetchRate(symbol)).rejects.toThrow(errorMessage);
  });
});

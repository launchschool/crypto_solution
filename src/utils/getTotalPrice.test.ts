import { describe, it, expect, vi } from "vitest";
import { getTotalPrice } from "./getTotalPrice";
import { fetchRate } from "../services/fetchRate";

vi.mock("../services/fetchRate.ts");
const mockedFetchRate = vi.mocked(fetchRate, true);

describe("getTotalPrice", () => {
  it("should return the correct total amount", async () => {
    const mockedRate = 100000;
    const symbol = "BTC";
    const quantity = 2;
    const returnedValue = mockedRate * quantity;
    mockedFetchRate.mockResolvedValue({ rate: mockedRate });
    const result = await getTotalPrice(symbol, quantity);
    expect(result).toEqual(returnedValue);
  });
  it("should throw an error message when fetchRate throws an error", async () => {
    const symbol = "aaah";
    const quantity = 2;
    const mockedError = "Unknown error";
    const thrownErrorMessage = "An unknown error occurred";
    mockedFetchRate.mockRejectedValue(mockedError);
    await expect(getTotalPrice(symbol, quantity)).rejects.toThrow(
      thrownErrorMessage
    );
  });
});

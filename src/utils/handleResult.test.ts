import { describe, it, expect, vi } from "vitest";
import { isValidQuantity } from "./isValidQuantity";
import { getTotalPrice } from "./getTotalPrice";
import { handleResult } from "./handleResult";

vi.mock("./isValidQuantity.ts");
vi.mock("./getTotalPrice.ts");
const mockedIsValidQuantity = vi.mocked(isValidQuantity, true);
const mockedGetTotalPrice = vi.mocked(getTotalPrice, true);

describe("handleResult", () => {
  it("return a string with the correct amount", async () => {
    const resultString = "The total amount is $200000";
    const symbol = "BTC";
    const quantity = 2;
    mockedIsValidQuantity.mockReturnValue(true);
    // mockedGetTotalPrice.mockImplementation(() => Promise.resolve(200000));
    mockedGetTotalPrice.mockResolvedValue(200000);
    const result = await handleResult(symbol, quantity);

    expect(result).toEqual(resultString);
  });
  it("it returns correct string when quantity is invalid", async () => {
    const resultString = "The input for the amount is incorrect";
    const symbol = "BTC";
    const quantity = -1;
    mockedIsValidQuantity.mockReturnValue(false);
    const result = await handleResult(symbol, quantity);
    expect(result).toEqual(resultString);
  });
  it(" should return the error message if get total price throws", async () => {
    const errorMessage = "An error occurred while fetching the total price.";
    const symbol = "BTC";
    const quantity = 2;
    mockedIsValidQuantity.mockReturnValue(true);
    mockedGetTotalPrice.mockRejectedValue(new Error(errorMessage));
    const result = await handleResult(symbol, quantity);
    expect(result).toBe(errorMessage);
  });
});

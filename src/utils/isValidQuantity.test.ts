import { describe, it, expect } from "vitest";
import { isValidQuantity } from "./isValidQuantity";

describe("isValidQuantity", () => {
  it("should return true if the quantity is a valid string number", () => {
    expect(isValidQuantity("5")).toEqual(true);
  });
  it("should return false if the quantity is not a valid string number", () => {
    expect(isValidQuantity("aaa")).toEqual(false);
  });
});

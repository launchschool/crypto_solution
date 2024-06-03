import { fetchRate } from "../services/fetchRate";

export const getTotalPrice = async (
  symbol: string = "BTC",
  quantity: number = 1
): Promise<number> => {
  try {
    const data = await fetchRate(symbol);
    const totalPrice = +(data.rate * quantity).toFixed(2);
    return totalPrice;
  } catch (error) {
    if (error instanceof Error) {
      throw error.message;
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};

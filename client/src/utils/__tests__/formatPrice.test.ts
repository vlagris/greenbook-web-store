import { formatPrice } from "@/utils/formatPrice.ts";


describe('formatPrice', () => {
  it('should return a number rounded up', () => {
    const result = formatPrice(1.4444);
    expect(result).toBe(1);
  });

  it('should return a number rounded down', () => {
    const result = formatPrice(1.6666);
    expect(result).toBe(2);
  });
});
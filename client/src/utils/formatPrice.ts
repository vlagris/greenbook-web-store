export function formatPrice(price: number) {
  const formattedPrice = price.toFixed(0);
  return Number(formattedPrice);
}
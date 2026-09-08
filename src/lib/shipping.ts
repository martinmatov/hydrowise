export const FREE_SHIPPING_THRESHOLD_EUR = 130;
export const FLAT_SHIPPING_FEE_EUR = 5.99;

export function calculateShipping(subtotalEur: number): number {
  return subtotalEur >= FREE_SHIPPING_THRESHOLD_EUR ? 0 : FLAT_SHIPPING_FEE_EUR;
}

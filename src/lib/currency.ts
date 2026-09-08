const formatter = new Intl.NumberFormat("bg-BG", {
  style: "currency",
  currency: "EUR",
});

export function formatEur(amount: number | string): string {
  return formatter.format(Number(amount));
}

export function getQuoteChange(c, pc) {
  return c - pc;
}

export function getQuoteChangePerc(c, pc) {
  const change = c - pc;
  return change / pc;
}

export function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

export function formatPerc(value) {
  return new Intl.NumberFormat("en-US", {
    style: "percent",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function changeArrow(value) {
  return value > 0 ? "↑" : value < 0 ? "↓" : "";
}

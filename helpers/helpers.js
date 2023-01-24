export function currencyFormatter(price) {
  let currency = Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN",
  });

  return currency.format(price);
}

import { formatCurrency } from "react-native-format-currency";

export function formatPrice(price) {
  const [formattedPrice] = formatCurrency({
    amount: price.toFixed(2),
    code: "PLN",
  });

  return formattedPrice;
}

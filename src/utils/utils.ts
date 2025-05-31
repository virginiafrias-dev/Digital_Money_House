export const getCreditCardIssuer = (cardNumber: string | number) => {
  if (String(cardNumber).startsWith("4")) return "VISA";
  if (String(cardNumber).startsWith("5")) return "MASTERCARD";
  if (String(cardNumber).startsWith("6")) return "DISCOVER";
  if (String(cardNumber).startsWith("3")) return "AMEX";
  return null;
};

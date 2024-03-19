export const formatAmount = (value) => {
  // Convert the number to a string and split it into integer and decimal parts
  let [integerPart, decimalPart] = String(value).split(".");

  // Add commas to the integer part every three digits from the end
  integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // If there's a decimal part, add it back with a dot
  return decimalPart ? `${integerPart}.${decimalPart}` : integerPart;
};

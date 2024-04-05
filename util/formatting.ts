export const formatAmount = (value: number) => {
  // Check if the value is negative
  const isNegative: boolean = value < 0;

  // Convert the absolute value to a string and split it into integer and decimal parts
  let [integerPart, decimalPart]: string[] = Math.abs(value).toFixed(2).split('.');

  // Add commas to the integer part every three digits from the end
  integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  // If there's a decimal part, add it back with a dot
  const formattedValue: string = decimalPart ? `${integerPart}.${decimalPart}` : integerPart;

  // Return the formatted value with parentheses if it's negative, otherwise just return the value
  return isNegative ? `(${formattedValue})` : formattedValue;
}

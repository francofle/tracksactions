export const separateNumbersWithComma = (number) => {
  //string from redux:
  const currency = parseFloat(number).toFixed(2);
  let currencyParts = currency.toString().split('.');
  currencyParts[0] = currencyParts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return currencyParts.join('.');
};
export const thousandsSeparators = num => {
  var num_parts = num.toString().split('.');
  num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return num_parts.join('.');
};

export const numToMoneyString = (num, currency = true) => {
  const result = (+num).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  if (currency) {
    return '\u20A6' + result;
  }
  return result;
};

export const formatCurrencyInline = text => {
  if (text.includes('\u20A6')) {
    text = text.replace(text[0], '');
    // text = text.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  if (text === '') {
    return '';
  }
  return '\u20A6' + text;
};

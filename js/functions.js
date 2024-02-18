const checkStringLength = (string, length) => string.length <= length;

const checkPalindrome = (phrase) => {
  const symbols = phrase
    .toLowerCase()
    .split('')
    .filter((symbol) => symbol !== ' ');

  const string = symbols.join('');
  const invertedString = symbols.reverse().join('');

  return string === invertedString;
};

const getNumber = (string) => {
  const figures = string
    .toString()
    .split('')
    .filter((symbol) => !isNaN(parseInt(symbol, 10)));

  const number = parseInt(figures.join(''), 10);

  return number;
};

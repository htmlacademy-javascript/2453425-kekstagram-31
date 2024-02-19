const checkStringLength = (string, maxLength) => string.length <= maxLength;

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

checkStringLength('проверяемая строка', 20);
checkPalindrome('топот');
getNumber('2023 год');

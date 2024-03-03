const makeCounter = () => {
  let counter = 1;
  return () => counter++;
};

const getRandomIteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.floor((Math.random() * (upper - lower + 1)) + lower);
  return result;
};

const getRandomArrayElement = (array) => array[getRandomIteger(0, array.length - 1)];

export {makeCounter, getRandomIteger, getRandomArrayElement};

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

const shuffleArray = (array) => {
  const shuffled = [...array];

  for (let i = 0; i < shuffled.length; i++) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
};

const debounce = (callback, timeoutDelay) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const findArrayItemById = (array, id) => array.find((item) => item.id === id);

export {
  makeCounter,
  getRandomIteger,
  getRandomArrayElement,
  shuffleArray,
  debounce,
  findArrayItemById
};

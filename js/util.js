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
  shuffleArray,
  debounce,
  findArrayItemById
};

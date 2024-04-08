const shuffleArray = (data) => {
  const shuffledData = [...data];

  for (let i = 0; i < shuffledData.length; i++) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledData[i], shuffledData[j]] = [shuffledData[j], shuffledData[i]];
  }

  return shuffledData;
};

const debounce = (callback, timeoutDelay) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const findArrayItemById = (data, id) => data.find((item) => item.id === id);

export {
  shuffleArray,
  debounce,
  findArrayItemById
};

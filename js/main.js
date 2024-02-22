const makeCounter = () => {
  let counter = 1;
  return () => counter++;
};
const generatePhotoId = makeCounter();
const generateCommentId = makeCounter();

const getRandomIteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.floor((Math.random() * (upper - lower + 1)) + lower);
  return result;
};

const getRandomArrayElement = (array) => array[getRandomIteger(0, array.length - 1)];

const getCommentMessage = (sentenceCount = 1, messages = ['Всё отлично!']) => {
  sentenceCount = Math.min(sentenceCount, messages.length);
  const sentences = new Set();
  while (sentences.size < sentenceCount) {
    sentences.add(getRandomArrayElement(messages));
  }
  return [...sentences].join(' ');
};

const photoDescriptions = {
  1: 'Санаторий',
  2: 'GOTOTHEBEACH',
  3: 'Пляж',
  4: 'Жоньщина',
  5: 'Весёлый суп',
  6: 'Машина (черная)',
  7: 'Ужин на двоих',
  8: 'Киселик',
  9: 'Анапа',
  10: 'Тапки',
  11: 'Какой-то забор',
  12: 'Фото автомобиля',
  13: 'Нечто',
  14: 'Ролл с котом',
  15: 'Бархатные тяги',
  16: 'Самолет',
  17: 'ААААААААА!',
  18: 'Машина (красная)',
  19: 'Тапки дайсон',
  20: 'Деревья',
  21: '1 миска рис',
  22: 'Закат',
  23: 'Краб',
  24: 'Руки вверх',
  25: 'Бегемот орет'
};
const userNames = [
  'Артем',
  'Никита',
  'Даша',
  'Полина',
  'Аркадий',
  'Вика',
  'Аня',
  'Таня',
  'Саша',
  'Маша',
];
const commentMessages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const getComment = () => {
  const id = generateCommentId();
  const comment = {
    id: id,
    avatar: `img/avatar-${getRandomIteger(1, 6)}.svg`,
    message: getCommentMessage(getRandomIteger(1, 2), commentMessages),
    name: getRandomArrayElement(userNames)
  };
  return comment;
};

const getPhoto = () => {
  const id = generatePhotoId();
  const photo = {
    id: id,
    url: `photos/${id}.jpg`,
    description: photoDescriptions[id],
    likes: getRandomIteger(15, 200),
    comments: Array.from({length: getRandomIteger(0, 30)}, getComment)
  };
  return photo;
};

const photos = Array.from({length: 25}, getPhoto);
// eslint-disable-next-line no-console
console.log(photos);

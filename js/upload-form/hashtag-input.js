const HASHTAG_MAX_LENGTH = 20;
const HASHTAG_MAX_COUNT = 5;
const STARTS_WITH_SPACE = /^\s/;
const HASHTAG = /^#[a-zа-яё0-9]+$/i;

const hashtagInputElement = document.querySelector('.text__hashtags');

const splitAndNormalize = (value) => {
  const hashtags = value
    .toLowerCase()
    .split(' ')
    .filter((string) => string.length);

  return hashtags;
};

const getHashtagChecks = () => ({
  checkSharpFirst: {
    check: (value) => {
      const firstSharp = !value.match(STARTS_WITH_SPACE);
      const hashtags = splitAndNormalize(value);
      const nextSharp = hashtags.every((string) => string[0] === '#');
      return firstSharp && nextSharp;
    },
    error: 'Хэштег должен начинаться с символа # (решётка)'
  },

  checkOnlySharp: {
    check: (value) => {
      const hashtags = splitAndNormalize(value);
      const notOnlySharp = hashtags.every((string) => string[0] === '#' && string.length > 1);
      return notOnlySharp;
    },
    error: 'Хэштег не может состоять только из одной решётки'
  },

  validateHashTag: {
    check: (value) => {
      const hashtags = splitAndNormalize(value);
      const onlyLettersAndNumbers = hashtags.every((string) => HASHTAG.test(string));
      return onlyLettersAndNumbers;
    },
    error: 'Хэштег должен состоять из букв и/или чисел'
  },

  checkMaxLength: {
    check: (value) => {
      const hashtags = splitAndNormalize(value);
      const withinMaxLength = hashtags.every((string) => string.length <= HASHTAG_MAX_LENGTH);
      return withinMaxLength;
    },
    error: `Максимальная длина одного хэштега ${HASHTAG_MAX_LENGTH} символов, включая решётку`
  },

  checkDouble: {
    check: (value) => {
      const hashtags = splitAndNormalize(value);
      const uniqueHashtags = new Set(hashtags);
      return hashtags.length === uniqueHashtags.size;
    },
    error: 'Один и тот же хэштег не может быть использован дважды'
  },

  checkLength: {
    check: (value) => {
      const hashtags = splitAndNormalize(value);
      return hashtags.length <= HASHTAG_MAX_COUNT;
    },
    error: `Нельзя указать больше ${HASHTAG_MAX_COUNT} хэштегов`
  },
});

const clearHashtag = () => {
  hashtagInputElement.value = '';
};

export { getHashtagChecks, clearHashtag };

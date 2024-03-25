const HASHTAG_MAX_LENGTH = 20;
const HASHTAG_MAX_COUNT = 5;

const splitAndNormalize = (value) => {
  const hashtags = value
    .toLowerCase()
    .split(' ')
    .filter((string) => string.length);

  return hashtags;
};

const getHashtagChecks = () => ({
  checkSharpFirst: {
    fn: (value) => {
      const startsWithSpaceRegExp = /^\s/;
      const firstSharp = !value.match(startsWithSpaceRegExp);
      const hashtags = splitAndNormalize(value);
      const nextSharp = hashtags.every((string) => string[0] === '#');
      return firstSharp && nextSharp;
    },
    error: 'Хэштег должен начинаться с символа # (решётка)'
  },

  checkOnlySharp: {
    fn: (value) => {
      const hashtags = splitAndNormalize(value);
      const notOnlySharp = hashtags.every((string) => string[0] === '#' && string.length > 1);
      return notOnlySharp;
    },
    error: 'Хэштег не может состоять только из одной решётки'
  },

  validateHashTag: {
    fn: (value) => {
      const hashtagRegExp = /^#[a-zа-яё0-9]+$/i;
      const hashtags = splitAndNormalize(value);
      const onlyLettersAndNumbers = hashtags.every((string) => hashtagRegExp.test(string));
      return onlyLettersAndNumbers;
    },
    error: 'Хэштег должен состоять из букв и/или чисел'
  },

  checkMaxLength: {
    fn: (value) => {
      const hashtags = splitAndNormalize(value);
      const withinMaxLength = hashtags.every((string) => string.length <= HASHTAG_MAX_LENGTH);
      return withinMaxLength;
    },
    error: `Максимальная длина одного хэштега ${HASHTAG_MAX_LENGTH} символов, включая решётку`
  },

  checkDouble: {
    fn: (value) => {
      const hashtags = splitAndNormalize(value);
      const uniqueHashtags = new Set(hashtags);
      return hashtags.length === uniqueHashtags.size;
    },
    error: 'Один и тот же хэштег не может быть использован дважды'
  },

  checkLength: {
    fn: (value) => {
      const hashtags = splitAndNormalize(value);
      return hashtags.length <= HASHTAG_MAX_COUNT;
    },
    error: `Нельзя указать больше ${HASHTAG_MAX_COUNT} хэштегов`
  },

  checkSeparator: {
    fn: (value) => {
      const wrongHashtagSeparatorRegExp = / {2,}|[^\S ]/;
      return !value.match(wrongHashtagSeparatorRegExp);
    },
    error: 'Для разделения хэштегов используйте один пробел'
  }
});

export { getHashtagChecks };

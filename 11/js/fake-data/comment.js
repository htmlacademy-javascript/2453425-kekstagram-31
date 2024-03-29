import { MIN_AVATAR_INDEX, MAX_AVATAR_INDEX, MIN_SENTENCES_IN_COMMENT, MAX_SENTENCES_IN_COMMENT, USER_NAMES, COMMENT_MESSAGES } from './const.js';
import { makeCounter, getRandomIteger, getRandomArrayElement } from '../util.js';

const generateCommentId = makeCounter();

const createCommentMessage = (sentenceCount = 1, messages = ['Всё отлично!']) => {
  sentenceCount = Math.min(sentenceCount, messages.length);
  const sentences = new Set();
  while (sentences.size < sentenceCount) {
    const randomSentence = getRandomArrayElement(messages);
    sentences.add(randomSentence);
  }
  return [...sentences].join(' ');
};

const createComment = () => {
  const id = generateCommentId();
  const comment = {
    id: id,
    avatar: `img/avatar-${getRandomIteger(MIN_AVATAR_INDEX, MAX_AVATAR_INDEX)}.svg`,
    message: createCommentMessage(getRandomIteger(MIN_SENTENCES_IN_COMMENT, MAX_SENTENCES_IN_COMMENT), COMMENT_MESSAGES),
    name: getRandomArrayElement(USER_NAMES)
  };
  return comment;
};

export { createComment };

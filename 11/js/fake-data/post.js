import { MAX_COMMENTS_COUNT, MAX_LIKES_COUNT, MIN_COMMENTS_COUNT, MIN_LIKES_COUNT, PHOTO_DESCRIPTIONS } from './const.js';
import { makeCounter, getRandomIteger } from '../util.js';
import { createComment } from './comment.js';

const generatePostId = makeCounter();

const createPost = () => {
  const id = generatePostId();
  const post = {
    id: id,
    url: `photos/${id}.jpg`,
    description: PHOTO_DESCRIPTIONS[id],
    likes: getRandomIteger(MIN_LIKES_COUNT, MAX_LIKES_COUNT),
    comments: Array.from({length: getRandomIteger(MIN_COMMENTS_COUNT, MAX_COMMENTS_COUNT)}, createComment)
  };
  return post;
};

export {createPost};

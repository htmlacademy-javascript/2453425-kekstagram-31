import { createPost } from './fake-data/post';

const POSTS_COUNT = 25;
const posts = Array.from({length: POSTS_COUNT}, createPost);

// eslint-disable-next-line no-console
console.log(posts);

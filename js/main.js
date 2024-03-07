import { createPost } from './fake-data/post';
import { renderPostsMiniatures } from './posts.js';

const POSTS_COUNT = 25;
const posts = Array.from({length: POSTS_COUNT}, createPost);

renderPostsMiniatures(posts);

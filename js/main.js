import { createPost } from './fake-data/post.js';
import { renderPhotoGallery } from './photo-gallery.js';

const POSTS_COUNT = 25;
const posts = Array.from({length: POSTS_COUNT}, createPost);

renderPhotoGallery(posts);

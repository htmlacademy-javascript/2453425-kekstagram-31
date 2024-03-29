import { createPost } from './fake-data/post.js';
import { renderPhotoGallery } from './gallery/gallery.js';
import { init as initUploadForm } from './upload-form/upload-form.js';

const POSTS_COUNT = 25;
const posts = Array.from({length: POSTS_COUNT}, createPost);

renderPhotoGallery(posts);
initUploadForm();

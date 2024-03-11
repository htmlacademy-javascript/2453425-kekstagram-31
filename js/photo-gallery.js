import { createPostsMiniatures } from './photo-miniatures.js';
import { addClickHandler } from './big-photo.js';

const gallery = document.querySelector('.pictures');
const miniatures = document.createDocumentFragment();

export const renderPhotoGallery = (posts) => {
  posts.forEach((post) => {
    const miniature = createPostsMiniatures(post);
    addClickHandler(miniature, post);
    miniatures.append(miniature);
  });

  gallery.append(miniatures);
};

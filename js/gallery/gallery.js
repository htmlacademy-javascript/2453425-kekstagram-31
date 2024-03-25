import { createMiniature } from './miniature.js';
import { renderBigPhoto } from './photo.js';

const gallery = document.querySelector('.pictures');
const miniatures = document.createDocumentFragment();

export const renderPhotoGallery = (posts) => {
  posts.forEach((post) => {
    const miniature = createMiniature(post);
    miniatures.append(miniature);
  });

  gallery.append(miniatures);

  gallery.addEventListener('click', (event) => {
    const target = event.target;
    if (target.closest('.picture')) {
      event.preventDefault();
      const photo = posts.find((item) => item.id === +target.closest('.picture').dataset.photoId);
      renderBigPhoto(photo);
    }
  });
};

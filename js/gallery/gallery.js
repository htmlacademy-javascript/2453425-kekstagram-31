import { createMiniature } from './miniature.js';
import { renderBigPhoto } from './photo.js';
import { init as initFilter } from './filter.js';

const galleryElement = document.querySelector('.pictures');

let photos = [];
let renderedPhotos = [];

const removeMiniatures = () => {
  renderedPhotos.forEach((photo) => photo.remove());
  renderedPhotos = [];
};

const renderMiniatures = (posts) => {
  if (renderedPhotos) {
    removeMiniatures();
  }

  const miniaturesFragment = document.createDocumentFragment();

  posts.forEach((photo) => {
    const miniature = createMiniature(photo);
    miniaturesFragment.append(miniature);
    renderedPhotos.push(miniature);
  });

  galleryElement.append(miniaturesFragment);
};

export const renderPhotoGallery = (posts) => {
  photos = [...posts];

  renderMiniatures(photos);

  const filter = initFilter(photos);
  filter.addEventListener('filterChange', (event) => renderMiniatures(event.detail));

  galleryElement.addEventListener('click', (event) => {
    const target = event.target;
    if (target.closest('.picture')) {
      event.preventDefault();
      const photo = photos.find((item) => item.id === +target.closest('.picture').dataset.photoId);
      renderBigPhoto(photo);
    }
  });
};

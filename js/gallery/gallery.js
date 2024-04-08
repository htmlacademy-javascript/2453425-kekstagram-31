import { findArrayItemById } from '../util.js';
import { createMiniature } from './miniature.js';
import { renderBigPhoto } from './photo.js';
import { initFilter } from './filter.js';

const galleryElement = document.querySelector('.pictures');

let photos = [];
let renderedPhotos = [];

const removeMiniatures = () => {
  renderedPhotos.forEach((photo) => photo.remove());
  renderedPhotos = [];
};

const renderMiniatures = (posts) => {
  const miniaturesFragment = document.createDocumentFragment();

  if (renderedPhotos) {
    removeMiniatures();
  }

  posts.forEach((photo) => {
    const miniature = createMiniature(photo);
    miniaturesFragment.append(miniature);
    renderedPhotos.push(miniature);
  });

  galleryElement.append(miniaturesFragment);
};

const onFilterChange = (event) => renderMiniatures(event.detail);

const onMiniatureClick = (event) => {
  const target = event.target;
  const miniatureElement = target.closest('.picture');

  if (miniatureElement) {
    event.preventDefault();

    const photoId = +miniatureElement.dataset.photoId;
    const photo = findArrayItemById(photos, photoId);

    renderBigPhoto(photo);
  }
};

const renderPhotoGallery = (posts) => {
  photos = [...posts];
  const filter = initFilter(photos);

  renderMiniatures(photos);

  filter.addEventListener('filterChange', onFilterChange);
  galleryElement.addEventListener('click', onMiniatureClick);
};

export { renderPhotoGallery };

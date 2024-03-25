import { initComments, destroyComments } from './comments.js';

const bigPhotoElement = document.querySelector('.big-picture');
const bodyElment = document.querySelector('body');
const bigPictureCancelElement = document.querySelector('.big-picture__cancel');
const bigPhotoImageElement = bigPhotoElement.querySelector('img');
const bigPhotoDescriptionElement = bigPhotoElement.querySelector('.social__caption');
const bigPhotoLikesElement = bigPhotoElement.querySelector('.likes-count');

const onDocumentKeyDown = (event) => {
  if (event.key === 'Escape') {
    event.preventDefault();
    closeBigPhoto();
  }
};

function openBigPhoto() {
  bodyElment.classList.add('modal-open');
  bigPhotoElement.classList.remove('hidden');

  document.addEventListener('keydown', onDocumentKeyDown);
  bigPictureCancelElement.addEventListener('click', closeBigPhoto);
}

function closeBigPhoto () {
  bodyElment.classList.remove('modal-open');
  bigPhotoElement.classList.add('hidden');

  document.removeEventListener('keydown', onDocumentKeyDown);
  destroyComments();
}

const prepareBigPhoto = ({url, description, likes}) => {
  bigPhotoImageElement.src = url;
  bigPhotoDescriptionElement.textContent = description;
  bigPhotoLikesElement.textContent = likes;
};

export const renderBigPhoto = (post) => {
  prepareBigPhoto(post);
  openBigPhoto();
  initComments(post.comments);
};

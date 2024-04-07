import { initComments, destroyComments } from './comments.js';

const BIG_PHOTO_HIDE_CLASS = 'hidden';
const MODAL_OPEN_CLASS = 'modal-open';

const bodyElement = document.body;
const bigPhotoElement = document.querySelector('.big-picture');
const bigPictureCancelElement = bigPhotoElement.querySelector('.big-picture__cancel');
const bigPhotoImageElement = bigPhotoElement.querySelector('img');
const bigPhotoDescriptionElement = bigPhotoElement.querySelector('.social__caption');
const bigPhotoLikesElement = bigPhotoElement.querySelector('.likes-count');

const onDocumentKeyDown = (event) => {
  if (event.key === 'Escape') {
    event.preventDefault();
    closeBigPhoto();
  }
};
const onBigPictureCancelElementClick = () => closeBigPhoto();

function openBigPhoto() {
  bodyElement.classList.add(MODAL_OPEN_CLASS);
  bigPhotoElement.classList.remove(BIG_PHOTO_HIDE_CLASS);

  document.addEventListener('keydown', onDocumentKeyDown);
  bigPictureCancelElement.addEventListener('click', onBigPictureCancelElementClick);
}

function closeBigPhoto () {
  bodyElement.classList.remove(MODAL_OPEN_CLASS);
  bigPhotoElement.classList.add(BIG_PHOTO_HIDE_CLASS);

  document.removeEventListener('keydown', onDocumentKeyDown);
  bigPictureCancelElement.removeEventListener('click', onBigPictureCancelElementClick);
  destroyComments();
}

const prepareBigPhoto = ({url, description, likes}) => {
  bigPhotoImageElement.src = url;
  bigPhotoDescriptionElement.textContent = description;
  bigPhotoLikesElement.textContent = likes;
};

const renderBigPhoto = (post) => {
  prepareBigPhoto(post);
  openBigPhoto();
  initComments(post.comments);
};

export { renderBigPhoto };

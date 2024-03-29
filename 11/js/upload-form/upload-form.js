import { init as initScale, destroy as destroyScale } from './scale.js';
import { init as initEffects, destroy as destroyEffects } from './effects.js';
import { init as initValidator, destroy as destroyValidator, validate } from './form-validator.js';
import { clearUploadPhoto } from './upload-input.js';
import { clear as clearHashtagInput } from './hashtag-input.js';
import { clear as clearCommentInput } from './comment-input.js';

const bodyElement = document.body;
const uploadFormElement = document.querySelector('.img-upload__form');
const uploadInputElement = uploadFormElement.querySelector('#upload-file');
const uploadModalElement = uploadFormElement.querySelector('.img-upload__overlay');
const closeFormBtnElementElement = uploadFormElement.querySelector('.img-upload__cancel');
const commentInputElement = uploadFormElement.querySelector('.text__description');
const hashtagInputElement = uploadFormElement.querySelector('.text__hashtags');

const onDocumentKeyDown = (event) => {
  if (event.target === hashtagInputElement || event.target === commentInputElement) {
    return;
  }

  if (event.key === 'Escape') {
    event.preventDefault();
    closeForm();
  }
};

const onSubmit = (event) => {
  event.preventDefault();
  const valid = validate();
  if (valid) {
    uploadFormElement.submit();
  }
};

function closeForm() {
  uploadModalElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeyDown);
  closeFormBtnElementElement.removeEventListener('click', closeForm);

  destroyScale();
  destroyEffects();
  destroyValidator();
  clearUploadPhoto();
  clearHashtagInput();
  clearCommentInput();
}

function openForm(event) {
  const target = event.target;
  if (!target.files.length) {
    return;
  }

  bodyElement.classList.add('modal-open');
  uploadModalElement.classList.remove('hidden');

  initScale();
  initEffects();
  initValidator();

  uploadFormElement.addEventListener('submit', onSubmit);
  document.addEventListener('keydown', onDocumentKeyDown);
  closeFormBtnElementElement.addEventListener('click', closeForm);
}

const init = () => {
  uploadInputElement.addEventListener('input', openForm);
};

export { init };

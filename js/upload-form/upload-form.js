import { initScale, destroyScale } from './scale.js';
import { initEffects, destroyEffects } from './effects.js';
import { initValidator, destroyValidator, validate } from './form-validator.js';
import { clearUploadPhoto, renderUploadPhoto } from './upload-input.js';
import { clearHashtag } from './hashtag-input.js';
import { clearComment } from './comment-input.js';
import { sendData } from '../loading-module.js';
import { SubmitButtonText, disableButton, enableButton } from './submit-button.js';
import { appendNotification } from './notification.js';

const bodyElement = document.body;
const uploadFormElement = document.querySelector('.img-upload__form');
const uploadInputElement = uploadFormElement.querySelector('#upload-file');
const uploadModalElement = uploadFormElement.querySelector('.img-upload__overlay');
const closeFormBtnElementElement = uploadFormElement.querySelector('.img-upload__cancel');
const commentInputElement = uploadFormElement.querySelector('.text__description');
const hashtagInputElement = uploadFormElement.querySelector('.text__hashtags');
const templateSuccess = document.querySelector('#success').content;
const templateError = document.querySelector('#error').content;

const onDocumentKeyDown = (event) => {
  if ([hashtagInputElement, commentInputElement].includes(document.activeElement)) {
    return;
  }

  if (event.key === 'Escape') {
    event.preventDefault();
    closeUploadForm();
  }
};

const sendFormData = async (formElement) => {
  const isValid = validate();
  if (isValid) {
    disableButton(SubmitButtonText.SENDING);
    try {
      await sendData(new FormData(formElement));
      appendNotification(templateSuccess, () => closeUploadForm());
    } catch (error) {
      appendNotification(templateError);
    } finally {
      enableButton(SubmitButtonText.IDLE);
    }
  }
};

const onSubmit = (event) => {
  event.preventDefault();
  sendFormData(event.target);
};

function closeUploadForm() {
  uploadModalElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeyDown);
  closeFormBtnElementElement.removeEventListener('click', closeUploadForm);

  destroyScale();
  destroyEffects();
  destroyValidator();
  clearUploadPhoto();
  clearHashtag();
  clearComment();
}

function openUploadForm(event) {
  const target = event.target;
  if (!target.files.length) {
    return;
  }

  bodyElement.classList.add('modal-open');
  uploadModalElement.classList.remove('hidden');

  initScale();
  initEffects();
  initValidator();
  renderUploadPhoto();

  uploadFormElement.addEventListener('submit', onSubmit);
  document.addEventListener('keydown', onDocumentKeyDown);
  closeFormBtnElementElement.addEventListener('click', closeUploadForm);
}

const initUploadForm = () => {
  uploadInputElement.addEventListener('input', openUploadForm);
};

export { initUploadForm };

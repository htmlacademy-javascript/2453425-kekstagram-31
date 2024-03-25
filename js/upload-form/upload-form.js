import { getHashtagChecks } from './hashtag-input.js';
import { getCommentChecks } from './comment-input.js';

const bodyElment = document.body;
const uploadFormElement = document.querySelector('.img-upload__form');
const uploadInputElement = uploadFormElement.querySelector('#upload-file');
const uploadModalElement = uploadFormElement.querySelector('.img-upload__overlay');
const closeFormBtnElementElement = uploadFormElement.querySelector('.img-upload__cancel');
const commentInputElement = uploadFormElement.querySelector('.text__description');
const hashtagInputElement = uploadFormElement.querySelector('.text__hashtags');

const pristine = new Pristine(uploadFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

const HashtagChecks = getHashtagChecks();
const CommentChecks = getCommentChecks();

const addValidators = (element, checks) => {
  Object.values(checks).forEach((check) => {
    const {fn, error} = check;
    pristine.addValidator(element, fn, error, 1, true);
  });
};

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
  const valid = pristine.validate();
  if (valid) {
    uploadFormElement.submit();
  }
};

function closeForm() {
  uploadModalElement.classList.add('hidden');
  bodyElment.classList.remove('modal-open');
  uploadInputElement.value = '';
  hashtagInputElement.value = '';
  commentInputElement.value = '';
  document.removeEventListener('keydown', onDocumentKeyDown);
  closeFormBtnElementElement.removeEventListener('click', closeForm);
}

function openForm(event) {
  const target = event.target;
  if (!target.files.length) {
    return;
  }

  pristine.validate();
  bodyElment.classList.add('modal-open');
  uploadModalElement.classList.remove('hidden');

  // подставляю выбранную картинку
  // const uploadImageElement = uploadFormElement.querySelector('.img-upload__preview img');
  // const fileReader = new FileReader();
  // fileReader.onload = function() {
  //   uploadImageElement.src = fileReader.result;
  // };
  // fileReader.readAsDataURL(target.files[0]);

  document.addEventListener('keydown', onDocumentKeyDown);
  closeFormBtnElementElement.addEventListener('click', closeForm);
}

addValidators(hashtagInputElement, HashtagChecks);
addValidators(commentInputElement, CommentChecks);

uploadInputElement.addEventListener('input', openForm);
uploadFormElement.addEventListener('submit', onSubmit);

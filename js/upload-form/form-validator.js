import { getHashtagChecks } from './hashtag-input.js';
import { getCommentChecks } from './comment-input.js';

const PRISTINE_SETTINGS = {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
};

const uploadFormElement = document.querySelector('.img-upload__form');
const commentInputElement = uploadFormElement.querySelector('.text__description');
const hashtagInputElement = uploadFormElement.querySelector('.text__hashtags');

const HashtagChecks = getHashtagChecks();
const CommentChecks = getCommentChecks();

let pristine = null;

const addValidators = (element, validators) => {
  Object.values(validators).forEach((validator) => {
    const {check, error} = validator;
    pristine.addValidator(element, check, error, 1, true);
  });
};

const initValidator = () => {
  pristine = new Pristine(uploadFormElement, PRISTINE_SETTINGS);

  addValidators(hashtagInputElement, HashtagChecks);
  addValidators(commentInputElement, CommentChecks);
};

const validate = () => pristine?.validate();

const destroyValidator = () => {
  pristine?.destroy();
  pristine = null;
};

export { initValidator, validate, destroyValidator };

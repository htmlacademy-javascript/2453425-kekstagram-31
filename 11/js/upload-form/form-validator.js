import { getHashtagChecks } from './hashtag-input.js';
import { getCommentChecks } from './comment-input.js';

const uploadFormElement = document.querySelector('.img-upload__form');
const commentInputElement = uploadFormElement.querySelector('.text__description');
const hashtagInputElement = uploadFormElement.querySelector('.text__hashtags');

const HashtagChecks = getHashtagChecks();
const CommentChecks = getCommentChecks();

let pristine = null;

const addValidators = (element, checks) => {
  Object.values(checks).forEach((check) => {
    const {fn, error} = check;
    pristine.addValidator(element, fn, error, 1, true);
  });
};

const init = () => {
  pristine = new Pristine(uploadFormElement, {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextClass: 'img-upload__field-wrapper--error'
  });

  addValidators(hashtagInputElement, HashtagChecks);
  addValidators(commentInputElement, CommentChecks);
};

const validate = () => pristine?.validate();

const destroy = () => {
  pristine?.destroy();
  pristine = null;
};

export { init, validate, destroy };

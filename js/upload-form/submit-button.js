const formSubmitButtonElement = document.querySelector('.img-upload__submit');

const SubmitButtonText = {
  IDLE: 'Сохранить',
  SENDING: 'Сохраняю...',
};

const disableButton = (text) => {
  formSubmitButtonElement.disabled = true;
  formSubmitButtonElement.textContent = text;
};
const enableButton = (text) => {
  formSubmitButtonElement.disabled = false;
  formSubmitButtonElement.textContent = text;
};

export { SubmitButtonText, disableButton, enableButton };

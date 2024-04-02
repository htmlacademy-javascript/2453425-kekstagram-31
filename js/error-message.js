const REMOVE_MESSAGE_TIMEOUT = 5000;

const errorLoadDataTemplate = document.querySelector('#data-error').content;
const bodyElement = document.body;

const showErrorMessage = (message) => {
  const errorDataElement = errorLoadDataTemplate.cloneNode(true);

  if (message) {
    errorDataElement.querySelector('.data-error__title').textContent = message;
  }

  bodyElement.append(errorDataElement);

  const errorLoadDataArea = bodyElement.querySelector('.data-error');

  setTimeout(() => {
    errorLoadDataArea.remove();
  }, REMOVE_MESSAGE_TIMEOUT);
};

export { showErrorMessage };

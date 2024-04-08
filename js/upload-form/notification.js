const bodyElement = document.body;

const getExistElement = () => document.querySelector('.success') || document.querySelector('.error');

const onNotificationOrCloseButtonClick = (event) => {
  event.stopPropagation();
  const ExistElement = getExistElement();
  const closeButton = ExistElement.querySelector('button');

  if (event.target === ExistElement || event.target === closeButton) {
    closeNotification(ExistElement);
  }
};
const onBodyKeyDown = (event) => {
  event.stopPropagation();
  const ExistElement = getExistElement();

  if (event.key === 'Escape') {
    closeNotification(ExistElement);
  }
};

function closeNotification(notificationElement) {
  notificationElement.remove();
  bodyElement.removeEventListener('click', onNotificationOrCloseButtonClick);
  bodyElement.removeEventListener('keydown', onBodyKeyDown);
}

const appendNotification = (template, trigger) => {
  trigger?.();

  const notificationElement = template.cloneNode(true);
  bodyElement.append(notificationElement);

  bodyElement.addEventListener('click', onNotificationOrCloseButtonClick);
  bodyElement.addEventListener('keydown', onBodyKeyDown);
};

export { appendNotification };

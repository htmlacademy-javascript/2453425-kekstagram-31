const bodyElement = document.body;

const closeNotification = (event) => {
  event.stopPropagation();
  const ExistElement = document.querySelector('.success') || document.querySelector('.error');
  const closeButton = ExistElement.querySelector('button');

  if (event.target === ExistElement || event.target === closeButton || event.key === 'Escape') {
    ExistElement.remove();
    bodyElement.removeEventListener('click', closeNotification);
    bodyElement.removeEventListener('keydown', closeNotification);
  }
};

const appendNotification = (template, trigger) => {
  trigger?.();

  const notificationElement = template.cloneNode(true);
  bodyElement.append(notificationElement);

  bodyElement.addEventListener('click', closeNotification);
  bodyElement.addEventListener('keydown', closeNotification);
};

export { appendNotification }

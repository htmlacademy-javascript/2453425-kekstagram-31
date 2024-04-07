const MIN_SCALE_VALUE = 25;
const MAX_SCALE_VALUE = 100;
const ZOOM_STEP = 25;
const START_SCALE_VALUE = 100;
const uploadedImageElement = document.querySelector('.img-upload__preview > img');
const zoomContainerElement = document.querySelector('.img-upload__scale');
const scaleValueElement = zoomContainerElement.querySelector('.scale__control--value');
const zoomOutBtnElement = zoomContainerElement.querySelector('.scale__control--smaller');
const zoomInBtnElement = zoomContainerElement.querySelector('.scale__control--bigger');

let currentScale = null;

const getScaleCoefficient = () => currentScale / 100;

const scaleImage = () => {
  const scaleCoefficient = getScaleCoefficient();
  uploadedImageElement.style.transform = `scale(${scaleCoefficient})`;
};

const updateInputValue = () => {
  scaleValueElement.value = `${currentScale}%`;
};

const zoomOut = () => {
  currentScale -= ZOOM_STEP;
  scaleImage();
  updateInputValue();
};
const zoomIn = () => {
  currentScale += ZOOM_STEP;
  scaleImage();
  updateInputValue();
};

const onZoom = (event) => {
  const target = event.target;
  if (target === zoomOutBtnElement && currentScale > MIN_SCALE_VALUE) {
    zoomOut();
  }
  if (target === zoomInBtnElement && currentScale < MAX_SCALE_VALUE) {
    zoomIn();
  }
};

const initScale = () => {
  currentScale = START_SCALE_VALUE;
  scaleImage();
  updateInputValue();
  zoomContainerElement.addEventListener('click', onZoom);
};

const destroyScale = () => {
  currentScale = START_SCALE_VALUE;
  scaleImage();
  updateInputValue();
  zoomContainerElement.removeEventListener('click', onZoom);
};

export { initScale, destroyScale };

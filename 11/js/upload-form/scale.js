const MIN_SCALE_VALUE = 25;
const MAX_SCALE_VALUE = 100;
const ZOOM_STEP = 25;
const START_SCALE_VALUE = 100;
const zoomContainerElement = document.querySelector('.img-upload__scale');
const scaleValueElement = zoomContainerElement.querySelector('.scale__control--value');
const zoomOutBtnElement = zoomContainerElement.querySelector('.scale__control--smaller');
const zoomInBtnElement = zoomContainerElement.querySelector('.scale__control--bigger');
const uploadImageElement = document.querySelector('.img-upload__preview > img');

let currentScale = null;

const getScaleCoefficient = () => currentScale / 100;

const scaleImage = () => {
  const scaleCoefficient = getScaleCoefficient();
  uploadImageElement.style.transform = `scale(${scaleCoefficient})`;
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


const init = () => {
  currentScale = START_SCALE_VALUE;
  scaleImage();
  updateInputValue();
  zoomContainerElement.addEventListener('click', onZoom);
};

const destroy = () => {
  currentScale = START_SCALE_VALUE;
  scaleImage();
  updateInputValue();
  zoomContainerElement.removeEventListener('click', onZoom);
};

export { init, destroy };

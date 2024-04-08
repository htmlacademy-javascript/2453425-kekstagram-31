const HIDE_CLASS = 'hidden';
const SLIDER_CONNECT_BAR = 'lower';
const SLIDER_FORMAT = {
  to: function (value) {
    if (Number.isInteger(value)) {
      return value.toFixed(0);
    }
    return value.toFixed(1);
  },
  from: function (value) {
    return parseFloat(value);
  },
};
const SLIDER_DEFAULT_OPTIONS = {
  connect: SLIDER_CONNECT_BAR,
  format: SLIDER_FORMAT,
};

const uploadImageElement = document.querySelector('.img-upload__preview > img');
const sliderContainerElement = document.querySelector('.img-upload__effect-level');
const sliderElement = sliderContainerElement.querySelector('.effect-level__slider');
const effectLevelValueElement = sliderContainerElement.querySelector('.effect-level__value');

let slider = null;
let effectUnits = '';
let effectProperty = '';

const hideSlider = () => sliderContainerElement.classList.add(HIDE_CLASS);
const showSlider = () => sliderContainerElement.classList.remove(HIDE_CLASS);
const createNoUiSlider = (element, options) => noUiSlider.create(element, options);

const setImageFilterStyle = (filterDepth) => {
  const filterValue = filterDepth + effectUnits;
  const styleFilter = `${effectProperty}(${filterValue})`;
  uploadImageElement.style.filter = styleFilter;
};

const onSliderUpdate = () => {
  const sliderValue = slider.get();
  setImageFilterStyle(sliderValue);
  effectLevelValueElement.value = sliderValue;
};

const initSlider = ({property, range, step, units}) => {
  const start = range.max;
  effectUnits = units;
  effectProperty = property;

  slider = createNoUiSlider(sliderElement, {range, step, start, ...SLIDER_DEFAULT_OPTIONS});

  slider.on('update', onSliderUpdate);

  showSlider();
};

const updateSlider = ({property, range, step, units}) => {
  const start = range.max;
  effectUnits = units;
  effectProperty = property;

  slider.updateOptions({range, step, start});
  setImageFilterStyle(start);
};

const destroySlider = () => {
  slider?.destroy();
  slider = null;
  uploadImageElement.style.filter = 'none';
  hideSlider();
};

const changeSlider = (filter) => {
  if (filter.property === 'none') {
    destroySlider();
    return;
  }

  if (!slider) {
    initSlider(filter);
    return;
  }

  updateSlider(filter);
};

export { destroySlider, changeSlider };

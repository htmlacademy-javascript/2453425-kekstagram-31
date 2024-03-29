const sliderContainerElement = document.querySelector('.img-upload__effect-level');
const sliderElement = document.querySelector('.effect-level__slider');
const uploadImageElement = document.querySelector('.img-upload__preview > img');
const effectLevelValueElement = document.querySelector('.effect-level__value');

let slider = null;
let effectUnits = '';
let effectProperty = '';

const hide = () => {
  sliderContainerElement.classList.add('hidden');
};
const show = () => {
  sliderContainerElement.classList.remove('hidden');
};

const init = ({property, range, step, units}) => {
  const start = range.max;
  effectUnits = units;
  effectProperty = property;

  slider = noUiSlider.create(sliderElement, {
    range,
    step,
    start,
    connect: 'lower',
    format: {
      to: function (value) {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      }
    }
  });

  slider.on('update', () => {
    const sliderValue = slider.get();
    const value = sliderValue + effectUnits;
    const str = `${effectProperty}(${value})`;
    uploadImageElement.style.filter = str;
    effectLevelValueElement.value = sliderValue;
  });

  show();
};

const update = ({property, range, step, units}) => {
  const start = range.max;

  slider.updateOptions({
    range,
    step,
    start,
  });

  effectUnits = units;
  effectProperty = property;

  const value = start + effectUnits;
  const str = `${effectProperty}(${value})`;
  uploadImageElement.style.filter = str;
};

const destroy = () => {
  slider?.destroy();
  slider = null;
  uploadImageElement.style.filter = 'none';
  hide();
};

const change = (filter) => {
  if (filter.property === 'none') {
    destroy();
    return;
  }

  if (!slider) {
    init(filter);
    return;
  }

  update(filter);
};

export { destroy, change };

import { shuffleArray, debounce } from '../util.js';

const HIDE_CLASS = 'img-filters--inactive';
const FILTER_ITEM_ACTIVE_CLASS = 'img-filters__button--active';
const DEBOUNCE_DELAY = 500;
const RANDOM_PHOTO_COUNT = 10;

const filterContainerElement = document.querySelector('.img-filters');
const filterItemElements = [...filterContainerElement.querySelectorAll('.img-filters__button')];

let photos = [];

const compareCommentsCount = (firstPhoto, secondPhoto) =>
  secondPhoto.comments.length - firstPhoto.comments.length;

const FilterMap = {
  getDefault: (data) => data,
  getRandom: (data) => shuffleArray(data).slice(0, RANDOM_PHOTO_COUNT),
  getDiscussed: (data) => data.sort(compareCommentsCount),
};

const filter = (filterName, data) => {
  const filteringFunctionName = `get${filterName[0].toUpperCase()}${filterName.slice(1)}`;
  const filteredPhotos = FilterMap[filteringFunctionName](data);
  return filteredPhotos;
};

const showFilter = () => {
  filterContainerElement.classList.remove(HIDE_CLASS);
};

const changeActiveFilterElement = (filterElement) => {
  const activeFilterItem = filterItemElements
    .find((item) =>
      item.classList.contains(FILTER_ITEM_ACTIVE_CLASS));

  activeFilterItem.classList.remove(FILTER_ITEM_ACTIVE_CLASS);
  filterElement.classList.add(FILTER_ITEM_ACTIVE_CLASS);
};

const changeFilter = (filterName) => {
  const filteredPhotos = filter(filterName, [...photos]);
  const filterChangeEvent = new CustomEvent('filterChange', {detail: filteredPhotos});
  filterContainerElement.dispatchEvent(filterChangeEvent);
};
const debouncedChangeFilter = debounce(changeFilter, DEBOUNCE_DELAY);

const onFilterItemClick = (event) => {
  const target = event.target;
  const targetIsFilterItemElement = filterItemElements.includes(target);
  const targetIsActive = target.classList.contains(FILTER_ITEM_ACTIVE_CLASS);

  if (targetIsFilterItemElement && !targetIsActive) {
    const filterName = target.id.split('-')[1];

    changeActiveFilterElement(target);
    debouncedChangeFilter(filterName);
  }
};

const initFilter = (data) => {
  showFilter();

  photos = data;

  filterContainerElement.addEventListener('click', onFilterItemClick);
  return filterContainerElement;
};

export { initFilter };

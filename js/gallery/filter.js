import { shuffleArray, debounce } from '../util.js';

const filterContainerElement = document.querySelector('.img-filters');
const filterItemElements = [...filterContainerElement.querySelectorAll('.img-filters__button')];

const HIDE_CLASS = 'img-filters--inactive';
const FILTER_ITEM_ACTIVE_CLASS = 'img-filters__button--active';
const DEBOUNCE_DELAY = 500;
const RANDOM_PHOTO_COUNT = 10;

let photos = [];

const FilterMap = {
  default: () => photos.slice(),
  random: () => shuffleArray(photos).slice(0, RANDOM_PHOTO_COUNT),
  discussed: () => photos.slice().sort((a, b) => b.likes - a.likes),
};

const filter = (filterName) => FilterMap[filterName]();

const show = () => {
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
  const filteredPhotos = filter(filterName);
  filterContainerElement
    .dispatchEvent(new CustomEvent('filterChange', {detail: filteredPhotos}));
};
const debouncedChangeFilter = debounce(changeFilter, DEBOUNCE_DELAY);

const onFilterChange = (event) => {
  const target = event.target;
  if (filterItemElements.includes(target) && !target.classList.contains(FILTER_ITEM_ACTIVE_CLASS)) {
    changeActiveFilterElement(target);
    debouncedChangeFilter(target.id.split('-')[1]);
  }
};

const init = (data) => {
  show();

  photos = data;

  filterContainerElement.addEventListener('click', onFilterChange);
  return filterContainerElement;
};

export { init };

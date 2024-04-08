const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const uploadFormElement = document.querySelector('.img-upload__form');
const previewsElements = [...document.querySelectorAll('.effects__preview')];
const uploadInputElement = uploadFormElement.querySelector('#upload-file');
const uploadImageElement = uploadFormElement.querySelector('.img-upload__preview img');

const renderUploadPhoto = async () => {
  const file = uploadInputElement.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    const url = URL.createObjectURL(file);
    uploadImageElement.src = url;
    previewsElements.forEach((previewsElement) => {
      previewsElement.style.backgroundImage = `url(${url})`;
    });
  }
};

const clearUploadPhoto = () => {
  uploadInputElement.value = '';
  uploadImageElement.src = '';
  previewsElements.forEach((previewsElement) => {
    previewsElement.style.backgroundImage = 'none';
  });
};

export { clearUploadPhoto, renderUploadPhoto };

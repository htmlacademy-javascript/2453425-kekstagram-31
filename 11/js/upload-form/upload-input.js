const uploadFormElement = document.querySelector('.img-upload__form');
const uploadInputElement = uploadFormElement.querySelector('#upload-file');

// const uploadImageElement = uploadFormElement.querySelector('.img-upload__preview img');
// const previewsElements = [...document.querySelectorAll('.effects__preview')];

// const loadFile = (file) => new Promise((resolve) => {
//   const reader = new FileReader();

//   reader.onload = (event) => {
//     const data = event.target.result;
//     resolve(data);
//   };
//   reader.readAsDataURL(file);
// });

// const getFile = async () => {
//   const file = uploadInputElement.files[0];

//   const data = await loadFile(file);

//   return data;
// };

// const renderUploadPhoto = async () => {
//   const fileUrl = await getFile();
//   uploadImageElement.src = fileUrl;
//   const url = `url(${fileUrl})`;
//   previewsElements.forEach((el) => {
//     el.style.backgroundImage = url;
//   });
// };

const clearUploadPhoto = () => {
  uploadInputElement.value = '';
  // uploadImageElement.src = '';
  // previewsElements.forEach((el) => {
  //   el.style.backgroundImage = 'none';
  // });
};

export { clearUploadPhoto };

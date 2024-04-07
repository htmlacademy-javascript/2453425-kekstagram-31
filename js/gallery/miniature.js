const miniatureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const createMiniature = ({id, url, description, comments, likes}) => {
  const miniatureElement = miniatureTemplate.cloneNode(true);
  const miniatureImg = miniatureElement.querySelector('.picture__img');
  const miniatureComments = miniatureElement.querySelector('.picture__comments');
  const miniatureLikes = miniatureElement.querySelector('.picture__likes');

  miniatureElement.dataset.photoId = id;
  miniatureImg.src = url;
  miniatureImg.alt = description;
  miniatureComments.textContent = comments.length;
  miniatureLikes.textContent = likes;

  return miniatureElement;
};

export { createMiniature };

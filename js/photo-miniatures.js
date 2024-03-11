const miniatureTemplate = document.querySelector('#picture').content.querySelector('.picture');

export const createPostsMiniatures = ({url, description, comments, likes}) => {
  const miniatureElement = miniatureTemplate.cloneNode(true);

  const miniatureImg = miniatureElement.querySelector('.picture__img');
  miniatureImg.src = url;
  miniatureImg.alt = description;

  const miniatureComments = miniatureElement.querySelector('.picture__comments');
  miniatureComments.textContent = comments.length;

  const miniatureLikes = miniatureElement.querySelector('.picture__likes');
  miniatureLikes.textContent = likes;

  return miniatureElement;
};

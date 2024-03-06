const miniaturesContainer = document.querySelector('.pictures');
const miniatureTemplate = document.querySelector('#picture').content;

const renderPostsMiniatures = (posts) => {
  const miniaturesFragment = document.createDocumentFragment();

  posts.map((post) => {
    const miniatureElement = miniatureTemplate.cloneNode(true);

    const miniatureImg = miniatureElement.querySelector('.picture__img');
    miniatureImg.src = post.url;
    miniatureImg.alt = post.description;

    const miniatureComments = miniatureElement.querySelector('.picture__comments');
    miniatureComments.textContent = post.comments.length;

    const miniatureLikes = miniatureElement.querySelector('.picture__likes');
    miniatureLikes.textContent = post.likes;

    miniaturesFragment.append(miniatureElement);
  });

  miniaturesContainer.append(miniaturesFragment);
};

export { renderPostsMiniatures };

const RENDER_COMMENTS_PER_STEP = 5;
const bigPhotoElement = document.querySelector('.big-picture');
const bodyElment = document.querySelector('body');
const bigPictureCancelElement = document.querySelector('.big-picture__cancel');
const loadMoreBtnElement = document.querySelector('.social__comments-loader');
const bigPhotoImageElement = bigPhotoElement.querySelector('img');
const bigPhotoDescriptionElement = bigPhotoElement.querySelector('.social__caption');
const bigPhotoLikesElement = bigPhotoElement.querySelector('.likes-count');
const bigPhotoShownCommentsElement = bigPhotoElement.querySelector('.social__comment-shown-count');
const bigPhotoTotalCommentsElement = bigPhotoElement.querySelector('.social__comment-total-count');
const commentsListElement = bigPhotoElement.querySelector('.social__comments');


const createCommentTemplate = ({avatar, name, message}) => {
  const comment = document.createElement('li');

  comment.innerHTML = (
    `<li class="social__comment">
      <img
        class="social__picture"
        src="${avatar}"
        alt="${name}"
        width="35" height="35">
      <p class="social__text">${message}</p>
    </li>`
  );

  return comment;
};

const createCommentsFragment = (comments, from, to) => {
  const liTemplate = document.createDocumentFragment();

  comments
    .slice(from, to)
    .forEach((comment) => liTemplate.append(createCommentTemplate(comment)));

  return liTemplate;
};

const openBigPhoto = () => {
  bodyElment.classList.add('modal-open');
  bigPhotoElement.classList.remove('hidden');
};

const prepareBigPhoto = (post) => {
  bigPhotoImageElement.src = post.url;
  bigPhotoDescriptionElement.textContent = post.description;
  bigPhotoLikesElement.textContent = post.likes;
  bigPhotoShownCommentsElement.textContent = '0';
  bigPhotoTotalCommentsElement.textContent = post.comments.length;
  commentsListElement.innerHTML = '';


  const onDocumentKeyDown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closeBigPhoto();
    }
  };

  function closeBigPhoto() {
    bodyElment.classList.remove('modal-open');
    bigPhotoElement.classList.add('hidden');

    document.removeEventListener('keydown', onDocumentKeyDown);
    loadMoreBtnElement.removeEventListener('click', renderCommentsPart);
  }

  bigPictureCancelElement.addEventListener('click', () => {
    closeBigPhoto();
  });

  document.addEventListener('keydown', onDocumentKeyDown);


  let renderedCommentsCount = 0;
  function renderCommentsPart() {
    const noRenderComments = post.comments.length - renderedCommentsCount;
    const comentsToRender = Math.min(RENDER_COMMENTS_PER_STEP, noRenderComments);
    const newCommentsPart = createCommentsFragment(post.comments, renderedCommentsCount, renderedCommentsCount + comentsToRender);
    commentsListElement.append(newCommentsPart);
    renderedCommentsCount += comentsToRender;

    if (renderedCommentsCount === post.comments.length) {
      loadMoreBtnElement.classList.add('hidden');
      loadMoreBtnElement.removeEventListener('click', renderCommentsPart);
    } else {
      loadMoreBtnElement.classList.remove('hidden');
      loadMoreBtnElement.addEventListener('click', renderCommentsPart);
    }

    bigPhotoShownCommentsElement.textContent = renderedCommentsCount;
  }

  renderCommentsPart();
};

export const addClickHandler = (miniatureElement, post) => {
  miniatureElement.addEventListener('click', (e) => {
    e.preventDefault();
    prepareBigPhoto(post);
    openBigPhoto();
  });
};


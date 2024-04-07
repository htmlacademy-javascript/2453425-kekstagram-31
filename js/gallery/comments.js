const RENDER_COMMENTS_PER_STEP = 5;
const LOAD_MORE_BUTTON_HIDE_CLASS = 'hidden';

const socialElement = document.querySelector('.big-picture__social');
const shownCommentsCountElement = socialElement.querySelector('.social__comment-shown-count');
const totalCommentsCountElement = socialElement.querySelector('.social__comment-total-count');
const commentsListElement = socialElement.querySelector('.social__comments');
const commentElement = socialElement.querySelector('.social__comment');
const loadMoreButtonElement = socialElement.querySelector('.social__comments-loader');

let comments = [];
let renderedCommentsCount = 0;

const createCommentTemplate = ({avatar, name, message}) => {
  const commentTemplate = commentElement.cloneNode(true);
  const commentPictureElement = commentTemplate.querySelector('.social__picture');

  commentPictureElement.src = avatar;
  commentPictureElement.alt = name;

  const commentTextElement = commentTemplate.querySelector('.social__text');
  commentTextElement.textContent = message;

  return commentTemplate;
};

const createCommentsFragment = (commentsPart) => {
  const commentsFragment = document.createDocumentFragment();

  commentsPart.forEach((comment) => {
    const commentTemplate = createCommentTemplate(comment);
    commentsFragment.append(commentTemplate);
  });

  return commentsFragment;
};

const renderCommentsPart = () => {
  const commentsPart = comments.slice(renderedCommentsCount, RENDER_COMMENTS_PER_STEP + renderedCommentsCount);
  const commentsFragment = createCommentsFragment(commentsPart);
  const isloadMoreButtonElementHidden = loadMoreButtonElement.classList.contains(LOAD_MORE_BUTTON_HIDE_CLASS);

  commentsListElement.append(commentsFragment);
  renderedCommentsCount += commentsPart.length;
  shownCommentsCountElement.textContent = renderedCommentsCount;

  if (renderedCommentsCount < comments.length && isloadMoreButtonElementHidden) {
    loadMoreButtonElement.classList.remove(LOAD_MORE_BUTTON_HIDE_CLASS);
  }

  if (renderedCommentsCount >= comments.length && !isloadMoreButtonElementHidden) {
    loadMoreButtonElement.classList.add(LOAD_MORE_BUTTON_HIDE_CLASS);
  }
};

const onLoadMoreButtonClick = () => renderCommentsPart();

const initComments = (postComments) => {
  comments = postComments;
  commentsListElement.innerHTML = '';
  totalCommentsCountElement.textContent = comments.length;

  renderCommentsPart();
  loadMoreButtonElement.addEventListener('click', onLoadMoreButtonClick);
};

const destroyComments = () => {
  comments = [];
  renderedCommentsCount = 0;

  loadMoreButtonElement.removeEventListener('click', onLoadMoreButtonClick);
};

export { initComments, destroyComments };

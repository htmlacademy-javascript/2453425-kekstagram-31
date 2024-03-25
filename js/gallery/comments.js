const RENDER_COMMENTS_PER_STEP = 5;
const socialElement = document.querySelector('.big-picture__social');
const shownCommentsElement = socialElement.querySelector('.social__comment-shown-count');
const totalCommentsElement = socialElement.querySelector('.social__comment-total-count');
const commentsListElement = socialElement.querySelector('.social__comments');
const commentElement = socialElement.querySelector('.social__comment');
const loadMoreBtnElement = socialElement.querySelector('.social__comments-loader');

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

function renderCommentsPart() {
  const commentsPart = comments.slice(renderedCommentsCount, RENDER_COMMENTS_PER_STEP + renderedCommentsCount);
  const commentsFragment = createCommentsFragment(commentsPart);

  commentsListElement.append(commentsFragment);
  renderedCommentsCount += commentsPart.length;
  shownCommentsElement.textContent = renderedCommentsCount;

  if (renderedCommentsCount === comments.length) {
    loadMoreBtnElement.classList.add('hidden');
    loadMoreBtnElement.removeEventListener('click', renderCommentsPart);
  } else {
    loadMoreBtnElement.classList.remove('hidden');
    loadMoreBtnElement.addEventListener('click', renderCommentsPart);
  }
}

export const initComments = (postComments) => {
  comments = postComments;
  commentsListElement.innerHTML = '';

  totalCommentsElement.textContent = comments.length;
  renderCommentsPart();
};

export const destroyComments = () => {
  comments = [];
  renderedCommentsCount = 0;

  commentsListElement.innerHTML = '';
  loadMoreBtnElement.removeEventListener('click', renderCommentsPart);
};

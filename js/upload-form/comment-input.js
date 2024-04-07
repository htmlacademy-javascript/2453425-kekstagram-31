const COMMENT_MAX_LENGTH = 140;

const commentInputElement = document.querySelector('.text__description');

const getCommentChecks = () => ({
  checkCommentMaxLength: {
    check: (value) => value.length <= COMMENT_MAX_LENGTH,
    error: 'Длина комментария не может составлять больше 140 символов'
  }
});

const clearComment = () => {
  commentInputElement.value = '';
};

export { getCommentChecks, clearComment };

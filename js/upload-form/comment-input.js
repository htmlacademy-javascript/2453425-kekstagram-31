const COMMENT_MAX_LENGTH = 140;

const commentInputElement = document.querySelector('.text__description');

const getCommentChecks = () => ({
  checkCommentMaxLength: {
    fn: (value) => value.length <= COMMENT_MAX_LENGTH,
    error: 'Длина комментария не может составлять больше 140 символов'
  }
});

const clear = () => {
  commentInputElement.value = '';
};

export { getCommentChecks, clear };

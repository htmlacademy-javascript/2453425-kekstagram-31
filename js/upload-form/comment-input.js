const COMMENT_MAX_LENGTH = 140;

const getCommentChecks = () => ({
  checkCommentMaxLength: {
    fn: (value) => value.length <= COMMENT_MAX_LENGTH,
    error: 'Длина комментария не может составлять больше 140 символов'
  }
});

export { getCommentChecks };

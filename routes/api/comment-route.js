const router = require('express').Router();
const {
    addComment,
    removeComment,
    addReply,
    removeReply
  } = require('../../controllers/comment-controllers');

// /api/comments/<pizzaId>
router.route(':cardId').post(addComment);

// /api/comments/<pizzaId>/<commentId>
router
  .route('/:cardId/:commentId')
  .put(addReply)
  .delete(removeComment)

  router.route('/:cardId/:commentId/:replyId').delete(removeReply);

module.exports = router;
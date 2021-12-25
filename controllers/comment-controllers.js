const { Comment, Cards } = require('../models');

const commentController = {
  // add comment to yugi cards
  addComment({ params, body }, res) {
    console.log(body);
    Comment.create(body)
      .then(({ _id }) => {
        return Card.findOneAndUpdate(
          { _id: params.cardId },
          { $push: { comments: _id } },
          { new: true }
        );
      })
      .then(dbCardData => {
        if (!dbCardData) {
          res.status(404).json({ message: 'No cards found with this id!' });
          return;
        }
        res.json(dbCardData);
      })
      .catch(err => res.json(err));
  

  },

  // remove comment
  removeComment({ params }, res) {
    Comment.findOneAndDelete({ _id: params.commentId })
      .then(deletedComment => {
        if (!deletedComment) {
          return res.status(404).json({ message: 'No comment with this id!' });
        }
        return Pizza.findOneAndUpdate(
          { _id: params.cardId },
          { $pull: { comments: params.commentId } },
          { new: true }
        );
      })
      .then(dbCardData => {
        if (!dbCardData) {
          res.status(404).json({ message: 'No cards found with this id!' });
          return;
        }
        res.json(dbCardata);
      })
      .catch(err => res.json(err));
  },

  addReply({ params, body }, res) {
    Comment.findOneAndUpdate(
      { _id: params.commentId },
      { $push: { replies: body } },
      { new: true }
    )
      .then(dbCardData => {
        if (!dbCardData) {
          res.status(404).json({ message: 'No cards found with this id!' });
          return;
        }
        res.json(dbCardData);
      })
      .catch(err => res.json(err));
  },

  // remove reply
removeReply({ params }, res) {
  Comment.findOneAndUpdate(
    { _id: params.commentId },
    { $pull: { replies: { replyId: params.replyId } } },
    { new: true }
  )
    .then(dbCardData => res.json(dbCardData))
    .catch(err => res.json(err));
}
};

module.exports = commentController;
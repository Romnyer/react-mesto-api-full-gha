const cardRouter = require('express').Router();

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');
const {
  createCardValidation,
  checkCardId,
} = require('../middlewares/validation');

// Get all cards
cardRouter.get('/', getCards);

// Create card
cardRouter.post('/', createCardValidation, createCard);

// Delete card
cardRouter.delete('/:cardId', checkCardId, deleteCard);

// Like card
cardRouter.put('/:cardId/likes', checkCardId, likeCard);

// Dislike card
cardRouter.delete('/:cardId/likes', checkCardId, dislikeCard);

module.exports = cardRouter;

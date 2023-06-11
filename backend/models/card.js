const mongoose = require('mongoose');
const validator = require('validator');

const cardSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },

  link: {
    type: String,
    required: true,
    validate: {
      validator: (value) => validator.isURL(value, {
        require_protocol: true,
        require_valid_protocol: true,
        protocols: ['http', 'https'],
      }),
      message: 'Некорректная ссылка',
    },
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },

  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: null,
  }],

  createdAt: {
    type: Date,
    default: () => Date.now(),
  },

});

module.exports = mongoose.model('card', cardSchema);

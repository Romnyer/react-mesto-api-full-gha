const mongooseError = require('mongoose').Error;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const {
  OK_STATUS_CODE,
  CREATED_STATUS_CODE,
} = require('../constants/constants');

const NotFoundError = require('../errors/notFoundError');
const BadRequestError = require('../errors/badRequestError');
const AuthError = require('../errors/authError');
const ConflictError = require('../errors/conflictError');

// All users route
module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.status(OK_STATUS_CODE).send({ users });
    })
    .catch(next);
};

function getUser(id, res, next) {
  User.findById(id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь с таким id не найден');
      }
      res.status(OK_STATUS_CODE).send(user);
    })

    .catch((err) => {
      if (err instanceof mongooseError.CastError) {
        next(new BadRequestError('Переданы некорректные данные'));
        return;
      }

      next(err);
    });
}

// Get user by id
module.exports.getUserById = (req, res, next) => {
  getUser(req.params.userId, res, next);
};

// Get me
module.exports.getMe = (req, res, next) => {
  getUser(req.user._id, res, next);
};

// Login
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new AuthError('Неправильные почта или пароль');
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new AuthError('Неправильные почта или пароль');
          }

          const token = jwt.sign(
            { _id: user._id },
            '7e19ace2fda288c39b9003006412dedc',
            { expiresIn: '7d' },
          );

          res.send({ token });
        });
    })
    .catch(next);
};

// Create user
module.exports.createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    })
      .then((user) => {
        // Exclude password from sending
        const userWithoutPass = {
          name: user.name,
          about: user.about,
          avatar: user.avatar,
          email: user.email,
          id: user._id,
        };

        res.status(CREATED_STATUS_CODE).send(userWithoutPass);
      })
      .catch((err) => {
        if (err.code === 11000) {
          next(new ConflictError('Пользователь с таким email уже существует!'));
          return;
        }

        if (err instanceof mongooseError.ValidationError) {
          next(new BadRequestError('Переданы некорректные данные'));
          return;
        }

        next(err);
      }));
};

// Update profile
function updateUser(id, body, res, next) {
  User.findByIdAndUpdate(
    id,
    body,
    { new: true, runValidators: true },
  )
    .orFail()
    .then((user) => {
      res.status(OK_STATUS_CODE).send(user);
    })
    .catch((err) => {
      if (err instanceof mongooseError.DocumentNotFoundError) {
        next(new NotFoundError('Пользователь с таким id не найден'));
        return;
      }

      if (err instanceof mongooseError.ValidationError) {
        next(new BadRequestError('Переданы некорректные данные'));
        return;
      }

      next(err);
    });
}

module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body;

  updateUser(req.user._id, { name, about }, res, next);
};

// Update avatar
module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  updateUser(req.user._id, { avatar }, res, next);
};

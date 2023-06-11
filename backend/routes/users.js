const userRouter = require('express').Router();

const {
  getUsers,
  getUserById,
  getMe,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');
const {
  updateProfileValidation,
  updateAvatarValidation,
  checkUserId,
} = require('../middlewares/validation');

// All users route
userRouter.get('/', getUsers);

// Get me
userRouter.get('/me', getMe);

// User by id route
userRouter.get('/:userId', checkUserId, getUserById);

// Update profile
userRouter.patch('/me', updateProfileValidation, updateProfile);

// Update avatar
userRouter.patch('/me/avatar', updateAvatarValidation, updateAvatar);

module.exports = userRouter;

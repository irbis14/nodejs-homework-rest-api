const express = require('express');
const ctrl = require('../controllers/auth');
const { JoiSchemaUser } = require('../../models/user');
const {
  validationMiddleware,
  authenticateMiddleware,
  upload,
} = require('../../middlewares');

const router = express.Router();

router.post('/signup', validationMiddleware(JoiSchemaUser), ctrl.signup);

router.post('/login', validationMiddleware(JoiSchemaUser), ctrl.login);

router.get('/logout', authenticateMiddleware, ctrl.logout);

router.get('/current', authenticateMiddleware, ctrl.getCurrent);

router.patch(
  '/avatars',
  authenticateMiddleware,
  upload.single('image'),
  ctrl.updateAvatar,
);

router.get('/verify/:verificationToken', ctrl.verifyMail);

router.post('/verify/', ctrl.sendAgain);

module.exports = router;

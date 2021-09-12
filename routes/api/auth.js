const express = require('express');
const ctrl = require('../controllers/auth');
const { JoiSchemaUser } = require('../../models/user');
const {
  validationMiddleware,
  authenticateMiddleware,
} = require('../../middlewares');

const router = express.Router();

router.post('/signup', validationMiddleware(JoiSchemaUser), ctrl.signup);

router.post('/login', validationMiddleware(JoiSchemaUser), ctrl.login);

router.get('/logout', authenticateMiddleware, ctrl.logout);

router.get('/current', authenticateMiddleware, ctrl.getCurrent);

module.exports = router;
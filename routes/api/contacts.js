const express = require('express');
const ctrl = require('../controllers/contacts');
const {
  JoiSchemaAddContact,
  JoiSchemaUpdateContact,
} = require('../../models/contact');
const {
  validationMiddleware,
  authenticateMiddleware,
} = require('../../middlewares');
const router = express.Router();

router.get('/', authenticateMiddleware, ctrl.listContacts);

router.get('/:contactId', authenticateMiddleware, ctrl.getContactById);

router.post('/', authenticateMiddleware, validationMiddleware(JoiSchemaAddContact), ctrl.addContact);

router.delete('/:contactId', authenticateMiddleware, ctrl.removeContact);

router.put(
  '/:contactId',
  authenticateMiddleware,
  validationMiddleware(JoiSchemaUpdateContact),
  ctrl.updateContact,
);

router.patch(
  '/:contactId/favorite',
  authenticateMiddleware, ctrl.updateStatusContact,
);

module.exports = router;

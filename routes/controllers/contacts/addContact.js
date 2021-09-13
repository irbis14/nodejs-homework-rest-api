const { Contact } = require('../../../models');

const addContact = async (req, res, next) => {
  try {
    const contact = await Contact.create({ ...req.body, owner: req.user._id });
    return res
      .status(201)
      .json({ status: 'success', code: 201, data: contact });
  } catch (error) {
    next(error);
  }
};

module.exports = addContact;

const { Contact } = require('../../../models');

const listContacts = async (req, res, next) => {
  try {
    const allContacts = await Contact.find({ owner: req.user._id }).populate(
      'owner',
      '_id email',
    );
    return res.json({ status: 'success', code: 200, data: allContacts });
  } catch (error) {
    next(error);
  }
};

module.exports = listContacts;

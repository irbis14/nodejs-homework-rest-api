const { User } = require('../../../models');

const logout = async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, { token: null });
  res.status(200).json({
    status: 'success',
    code: 200,
    message: 'Success logout',
  });
};

module.exports = logout;

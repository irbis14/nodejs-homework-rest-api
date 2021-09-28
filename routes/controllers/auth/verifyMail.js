const { User } = require('../../../models');

const verifyMail = async (req, res, next) => {
  try {
    const { verificationToken: verifyToken } = req.params;
    const user = await User.findOne({ verifyToken });
    if (!user) {
      return res.status(404).json({
        status: 'error',
        code: 404,
        message: 'User not found',
      });
    }
    await User.findByIdAndUpdate(user._id, { verify: true, verifyToken: null });
    // return res.send('<h2>Verification successful</h2>');
    return res.status(200).json({
      status: 'OK',
      code: 200,
      message: 'Verification successful',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = verifyMail;

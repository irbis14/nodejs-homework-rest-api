const { User } = require('../../../models');
const { sendMail } = require('../../../utils');

const sendAgain = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!email) {
      return res.status(400).json({
        status: 'Bad Request',
        code: 400,
        message: 'Missing required field email',
      });
    }
    if (user.verify) {
      return res.status(400).json({
        status: 'Bad Request',
        code: 400,
        message: 'Verification has already been passed',
      });
    }
    await sendMail(email);
    return res.status(200).json({
      status: 'OK',
      code: 200,
      message: 'Verification email sent',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = sendAgain;

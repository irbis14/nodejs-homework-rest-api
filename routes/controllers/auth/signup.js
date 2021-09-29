const fs = require('fs/promises');
const path = require('path');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const { v4 } = require('uuid');
const { User } = require('../../../models');
const { sendMail } = require('../../../utils');

const avatarsDir = path.join(__dirname, '../../../', 'public/avatars');

const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({
        status: 'conflict',
        code: 409,
        message: 'Email in use',
      });
    }
    // Set avatar
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const avatar = gravatar.url(email, { protocol: 'http', s: '100' });
    // Verification
    const verifyToken = v4();
    const data = {
      to: email,
      subject: 'User verification',
      html: `<a href='http://localhost:3000/api/users/auth/verify/${verifyToken}'Please verify your email>`,
    };
    await sendMail(data);

    const result = await User.create({
      email,
      password: hashPassword,
      avatarUrl: avatar,
      verifyToken,
    });

    const dirPath = path.join(avatarsDir, result._id.toString());
    await fs.mkdir(dirPath);

    res.status(201).json({
      status: 'success',
      code: 201,
      message: 'Success signup',
      user: { email, subscription: result.subscription },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = signup;

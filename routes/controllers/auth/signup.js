const fs = require('fs/promises');
const path = require('path');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const { User } = require('../../../models');

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
    const result = await User.create({
      email,
      password: hashPassword,
      avatarUrl: avatar,
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

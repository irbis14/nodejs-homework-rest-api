const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../../../models');

const login = async (req, res, next) => {
  const unathorized = () => {
    return res.status(401).json({
      status: 'error',
      code: 401,
      message: 'Email or password is wrong',
    });
  };

  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      unathorized();
    }

    const hashPassword = user.password;
    const comparePassword = bcrypt.compareSync(password, hashPassword);

    if (!comparePassword) {
      unathorized();
    }

    const payload = {
      id: user._id,
    };
    const { SECRET_KEY } = process.env;
    const token = jwt.sign(payload, SECRET_KEY);
    await User.findByIdAndUpdate(user._id, { token });

    res.status(200).json({
      status: 'success',
      code: 200,
      message: 'Success login',
      token: token,
      user: { email, subscription: user.subscription },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = login;

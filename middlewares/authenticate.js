const jwt = require('jsonwebtoken');
const { User } = require('../models');

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const unathorized = () => {
    return res.status(401).json({
      status: 'error',
      code: 401,
      message: `Not authorized.`,
    });
  };

  try {
    const [bearer, token] = req.headers.authorization.split(' ');
    if (bearer !== 'Bearer') {
      unathorized();
    }

    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findOne({ token });
    if (!user) {
      unathorized();
    }
    req.user = user;
    next();
  } catch (error) {
    unathorized();
  }
};

module.exports = authenticate;

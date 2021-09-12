const getCurrent = (req, res, next) => {
  const user = req.user;
  res.status(200).json({
    status: 'success',
    code: 200,
    current_user: { email: user.email, subscription: user.subscription },
  });
};

module.exports = getCurrent;

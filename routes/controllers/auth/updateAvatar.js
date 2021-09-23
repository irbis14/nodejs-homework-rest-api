const fs = require('fs/promises');
const path = require('path');

const { User } = require('../../../models');

const avatarsDir = path.join(__dirname, '../../../', 'public/avatars');

const updateAvatar = async (req, res) => {
  const { id } = req.user;
  const { path: tempPath, originalname } = req.file;
  const uploadPath = path.join(avatarsDir, id, originalname);
  try {
    await fs.rename(tempPath, uploadPath);
    const avatarUrl = `/public/avatars/${id}/${originalname}`;
    await User.findByIdAndUpdate(id, { avatarUrl });
    res.status(200).json({
      status: 'success',
      code: 200,
      data: {
        avatarUrl: avatarUrl,
      },
    });
  } catch (error) {
    await fs.unlink(tempPath);
    res.status(401).json({
      status: 'error',
      code: 401,
      message: `Not authorized.`,
    });
    throw error;
  }
};

module.exports = updateAvatar;

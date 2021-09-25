const fs = require('fs/promises');
const Jimp = require('jimp');
const path = require('path');

const { User } = require('../../../models');

const avatarsDir = path.join(__dirname, '../../../', 'public/avatars');

const updateAvatar = async (req, res) => {
  const { id } = req.user;
  const { path: tempPath, originalname } = req.file;
  const uploadPath = path.join(avatarsDir, id, originalname);
  try {
    const file = await Jimp.read(tempPath);
    await file.resize(250, 250).write(tempPath);
    await fs.rename(tempPath, uploadPath);
    const avatarUrl = `/avatars/${id}/${originalname}`;
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

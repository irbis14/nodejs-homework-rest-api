const { Schema, model } = require('mongoose');
const Joi = require('joi');

const userSchema = Schema(
  {
    password: {
      type: String,
      minlength: 6,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    token: {
      type: String,
      default: null,
    },
    avatarUrl: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true },
);

const JoiSchemaUser = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: true },
    })
    .required(),
  subscription: Joi.string().optional(),
  token: Joi.string().optional(),
  avatarUrl: Joi.string().optional(),
});

const User = model('user', userSchema);

module.exports = {
  User,
  JoiSchemaUser,
};

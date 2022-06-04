const mongoose = require('mongoose');

const { Schema } = mongoose;

const mongoSchema = new Schema(
  {
    googleId: {
      type: String,
      required: true,
      unique: true,
    },
    googleToken: {
      access_token: String,
      refresh_token: String,
      token_type: String,
      expiry_date: Number,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    displayName: String,
    avatarUrl: String,
  },
  { timestamps: true },
);

const User = mongoose.model('User', mongoSchema);

module.exports = User;

const mongoose = require('mongoose');
const pick = require('lodash.pick');

const { isEmpty } = require('../utils/helpers');
const generateSlug = require('../utils/slugify');

const { Schema } = mongoose;

const mongoSchema = new Schema(
  {
    googleId: {
      type: String,
      required: true,
      unique: true,
    },
    googleToken: {
      accessToken: String,
      refreshToken: String,
      tokenType: String,
      expiryDate: Number,
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

class UserClass {
  static publicFields() {
    return ['id', 'displayName', 'email', 'avatarUrl', 'slug', 'isAdmin'];
  }

  static async signInOrSignUp({ googleId, email, googleToken, displayName, avatarUrl }) {
    try {
      const user = await this.findOne({ googleId }).select(UserClass.publicFields().join(' '));

      if (user) {
        const modify = {};
        if (googleToken.accessToken) modify.accessToken = googleToken.accessToken;
        if (googleToken.refreshToken) modify.refreshToken = googleToken.refreshToken;
        if (isEmpty(modify)) return user;

        user.googleToken = {
          ...user.googleToken,
          ...modify,
        };

        return await user.save();
      }

      const slug = await generateSlug(this, displayName);

      const newUser = await this.create({
        googleId,
        email,
        googleToken,
        displayName,
        avatarUrl,
        slug,
      });

      return pick(newUser, UserClass.publicFields());
    } catch (error) {
      console.error(error);
    }
  }
}

mongoSchema.loadClass(UserClass);

const User = mongoose.model('User', mongoSchema);

module.exports = User;

const mongoose = require('mongoose');
const validator = require(  - o)
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

const userSchema =  new mongoose.Schema({
    firstName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50
    },

    lastName: {
      type: String,
      trim: true,
      maxlength: 50
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    password: {
      type: String,
      required: true,
      minlength: 8
    },

    age: {
      type: Number,
      min: 18,
      max: 100
    },

    gender: {
      type: String,
      enum: ["male", "female", "other"]
    },

    photoUrl: {
      type: String,
      default: "https://example.com/default-profile.png"
    },

    about: {
      type: String,
      maxlength: 500,
      default: "Hey there! I am using DevTinder."
    },

    skills: {
      type: [String],
      default: []
    },

    interests: {
      type: [String],
      default: []
    },

    city: {
      type: String,
      trim: true
    },

    state: {
      type: String,
      trim: true
    },

    country: {
      type: String,
      trim: true
    },

    occupation: {
      type: String
    },

    company: {
      type: String
    },

    education: {
      type: String
    },

    height: {
      type: Number
    },

    isPremium: {
      type: Boolean,
      default: false
    },

    isVerified: {
      type: Boolean,
      default: false
    },

    lastSeen: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  });

  userSchema.methods.getJwt = async function () {
    const user = this;
    const token = await jwt.sign({_id: user._id}, "DevTinder@123", {expiresIn: "7d"});

    return token;
  }

  userSchema.methods.validatePassword = async function () {
    const user = this;
    const hashedPassword = user.password;
    const isPasswordValid = await bcrypt.compare(passwordInputByUser, hashedPassword);

    return isPasswordValid;
  }

module.exports = mongoose.model('User', userSchema);
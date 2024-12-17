const mongoose = require("mongoose");
const { userTypes } = require("../config/constants");

const Schema = mongoose.Schema;

const loginSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },

  userType: {
    type: String,
    required: true,
    enum: userTypes,
  },
  Name: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    require: true,
  },
  MobileNo: {
    type: Number,
    require: true,
  },
  firstLogin: {
    type: Boolean,
    default: true,
  },

  resetToken: {
    type: String,
  },
  resetTokenExpiration: {
    type: Date,
  },
});

module.exports = mongoose.model("Login", loginSchema);

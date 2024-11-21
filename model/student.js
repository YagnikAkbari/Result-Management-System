const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const studentSchema = new Schema({
  Enrollment: {
    type: String,
    require: true,
  },
  Password: {
    type: String,
    require: true,
  },
  Name: {
    type: String,
    require: true,
  },
  MobileNo: {
    type: Number,
    require: true,
  },
  Email: {
    type: String,
    require: true,
  },
  Branch: {
    type: String,
    require: true,
  },
  Div: {
    type: String,
    require: true,
  },
  Flag: {
    type: Number,
    require: true,
  },

  Batch: {
    type: String,
    require: true,
  },

  resetToken: {
    type: String,
  },

  resetTokenExpiration: {
    type: Date,
  },
});

module.exports = mongoose.model("Student", studentSchema);

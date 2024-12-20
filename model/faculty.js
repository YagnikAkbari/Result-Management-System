const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const facultySchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "Login",
    required: true,
  },
  colloegeIdNo: {
    type: String,
    required: true,
  },
  collegeEmail: {
    type: String,
    unique: true,
    lowercase: true,
  },
});

module.exports = mongoose.model("Faculty", facultySchema);

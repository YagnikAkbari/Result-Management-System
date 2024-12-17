const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const subjectSchema = new Schema({
  subjectKey: { type: String, required: true },
  subjectName: { type: String, required: true },
  subjectFullName: { type: String, required: true },
  subjectCode: { type: String, required: true, unique: true },
});
module.exports = mongoose.model("Subject", subjectSchema);

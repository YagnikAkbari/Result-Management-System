const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const semesterSchema = new Schema({
  semesterKey: { type: String, required: true, unique: true },
  Name: { type: String, required: true },
});
module.exports = mongoose.model("Semester", semesterSchema);

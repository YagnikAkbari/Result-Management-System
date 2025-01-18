const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const studentSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "Login",
    required: true,
  },
  EnrollmentNo: {
    type: String,
    required: true,
  },
  collegeEmail: {
    type: String,
    unique: true,
    lowercase: true,
  },
  Branch: {
    type: Schema.Types.ObjectId,
    ref: "Branch",
    required: true,
  },
  Div: {
    type: Schema.Types.ObjectId,
    ref: "Division",
    required: true,
  },
  Batch: {
    type: Schema.Types.ObjectId,
    ref: "Batch",
    required: true,
  },
  currentSemester: {
    type: Schema.Types.ObjectId,
    ref: "Semester",
    required: true,
  },
});

module.exports = mongoose.model("Student", studentSchema);

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const subjectAssignmentSchema = new Schema({
  subject: { type: Schema.Types.ObjectId, ref: "Subject", required: true },
  semester: { type: Schema.Types.ObjectId, ref: "Semester", required: true },
  branch: { type: Schema.Types.ObjectId, ref: "Branch", required: true },
  is_elective: { type: Boolean, required: true },
});

module.exports = mongoose.model("SubjectAssignment", subjectAssignmentSchema);

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const resultSchema = new Schema({
  student: {
    type: Schema.Types.ObjectId,
    ref: "Student",
  },
  AcademicYear: {
    type: String,
  },

  division: {
    type: Schema.Types.ObjectId,
    ref: "Division",
  },
  branch: {
    type: Schema.Types.ObjectId,
    ref: "Branch",
  },
  semester: {
    type: Schema.Types.ObjectId,
    ref: "Semester",
  },

  result: {
    type: Object,
  },
});

module.exports = mongoose.model("Result", resultSchema);

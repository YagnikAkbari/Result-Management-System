const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const resultSchema = new Schema({
  divisionId: {
    type: Schema.Types.ObjectId,
    ref: "Division",
  },
  branchId: {
    type: Schema.Types.ObjectId,
    ref: "Branch",
  },
  batchId: {
    type: Schema.Types.ObjectId,
    ref: "Batch",
  },
  semesterId: {
    type: Schema.Types.ObjectId,
    ref: "Semester",
  },
  studentId: {
    type: Schema.Types.ObjectId,
    ref: "Student",
  },
  subjects: [
    {
      subjectId: {
        type: Schema.Types.ObjectId,
        ref: "Subject",
        required: true,
      },
      marks: {
        type: Number,
      },
    },
  ],
});

module.exports = mongoose.model("Result", resultSchema);

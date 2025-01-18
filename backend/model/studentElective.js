const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const studentElectiveSchema = new Schema({
  studentId: {
    type: Schema.Types.ObjectId,
    ref: "Student",
    required: true,
    unique: true,
  },
  electives: [
    {
      semesterId: {
        type: Schema.Types.ObjectId,
        ref: "Semester",
        required: true,
      },
      electiveSubjects: [
        {
          type: Schema.Types.ObjectId,
          ref: "Subject",
        },
      ],
    },
  ],
});

module.exports = mongoose.model("studentElective", studentElectiveSchema);

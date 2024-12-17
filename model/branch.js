const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const branchSchema = new Schema({
  branchKey: {
    type: String,
    required: true,
    unique: true,
  },
  branchName: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return /^[a-zA-Z0-9 _-]+$/.test(value);
      },
    },
  },
  branchFullName: { type: String, required: true },
  semesters: [
    {
      type: Schema.Types.ObjectId,
      ref: "Semester",
    },
  ],
  divisions: [
    {
      type: Schema.Types.ObjectId,
      ref: "Division",
    },
  ],
});

module.exports = mongoose.model("Branch", branchSchema);

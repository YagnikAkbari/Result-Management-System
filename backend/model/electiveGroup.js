const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const electiveGroupSchema = new Schema({
  groupName: {
    type: String,
    required: true,
  },
  semester: {
    type: Schema.Types.ObjectId,
    ref: "Semester",
    required: true,
  },
  branch: { type: Schema.Types.ObjectId, ref: "Branch", required: true },
  subjects: [
    {
      type: Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },
  ],
});

module.exports = mongoose.model("electiveGroup", electiveGroupSchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const sessionSchema = new Schema({
  token: {
    type: String,
  },
  username: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Session", sessionSchema);

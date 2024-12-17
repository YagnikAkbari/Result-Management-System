const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const batchSchema = new Schema({
  batchKey: { type: String, required: true, unique: true },
  batchName: { type: String, required: true },
});
module.exports = mongoose.model("Batch", batchSchema);

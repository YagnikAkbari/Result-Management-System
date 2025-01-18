const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const divisionSchema = new Schema({
  divisionKey: { type: String, required: true, unique: true },
  Name: { type: String, required: true },
});
module.exports = mongoose.model("Division", divisionSchema);

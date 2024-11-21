const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const resultSchema = new Schema({
  Enrollment: {
    type: String,
    require: true,
  },

  Batch: {
    type: String,
    require: true,
  },

  Name: {
    type: String,
    require: true,
  },

  Branch: {
    type: String,
    require: true,
  },

  AcademicYear: {
    type: String,
    require: true,
  },

  Sem: {
    type: String,
    require: true,
  },

  Div: {
    type: String,
    require: true,
  },

  Sub1_Code: {
    type: String,
    require: true,
  },

  Sub1_Name: {
    type: String,
    require: true,
  },
  Sub1_Marks: {
    type: String,
    require: true,
  },
  Sub2_Code: {
    type: String,
    require: true,
  },

  Sub2_Name: {
    type: String,
    require: true,
  },
  Sub2_Marks: {
    type: String,
    require: true,
  },
  Sub3_Code: {
    type: String,
    require: true,
  },

  Sub3_Name: {
    type: String,
    require: true,
  },

  Sub3_Marks: {
    type: String,
    require: true,
  },
  Sub4_Code: {
    type: String,
    require: true,
  },

  Sub4_Name: {
    type: String,
    require: true,
  },

  Sub4_Marks: {
    type: String,
    require: true,
  },
  Sub5_Code: {
    type: String,
    require: true,
  },

  Sub5_Name: {
    type: String,
    require: true,
  },

  Sub5_Marks: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Result4_IT", resultSchema);

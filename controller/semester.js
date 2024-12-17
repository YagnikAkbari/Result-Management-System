const Semester = require("../model/semester");

exports.createSemester = async (req, res) => {
  try {
    const { semester } = req.body;

    const newSemester = new Semester({
      semesterKey: semester,
      Name: semester,
    });

    await newSemester.save();
  } catch (err) {
    if (err?.code === 11000) {
      console.log("Semester Creation Error:---", err?.message);
    }
  }
};

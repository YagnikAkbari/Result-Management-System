const StudentElective = require("../model/studentElective");

exports.addElective = async (req, res, next) => {
  try {
    const { studentId, electives } = req.body;

    const newStudentElectives = new StudentElective({
      studentId,
      electives,
    });
    await newStudentElectives.save();
  } catch (err) {
    console.log("Student Elective Creation Error:--", err);
  }
};

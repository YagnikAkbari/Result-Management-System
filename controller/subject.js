const Subject = require("../model/subject");
const Branch = require("../model/branch");
const SubjectAssignmentSchema = require("../model/subjectAssignment");
const Semester = require("../model/semester");

exports.createSubject = async (req) => {
  try {
    const {
      subjectName,
      subjectCode,
      subjectFullName,
      semester,
      branch,
      is_elective,
    } = req.body;

    const branchObj = await Branch.findOne({ branchKey: branch });
    const semesterObj = await Semester.findOne({ semesterKey: semester });

    const newSubject = new Subject({
      subjectKey: subjectCode.toLowerCase(),
      subjectName,
      subjectCode,
      subjectFullName,
    });

    const newSubjectAssignment = new SubjectAssignmentSchema({
      subject: newSubject?._id,
      branch: branchObj?._id,
      semester: semesterObj?._id,
      is_elective,
    });
    console.log("newSemetes:----", newSubject, newSubjectAssignment);

    await newSubject.save();
    await newSubjectAssignment.save();
  } catch (err) {
    if (err?.code === 11000) {
      console.log("Batch Creation Error:---", err?.message);
    }
  }
};

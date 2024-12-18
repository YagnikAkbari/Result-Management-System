const Semester = require("../model/semester");
const Branch = require("../model/branch");
const subjectAssignment = require("../model/subjectAssignment");

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

exports.getBranchSemester = async (req, res) => {
  try {
    const { branch, semester } = req.query;

    console.log("branchbranchbranch:::", branch, semester);

    const branchobj = await Branch.findById(branch)
      .populate("semesters")
      .populate("divisions");
    console.log("branchbranchbranch:::", branchobj);
    let subjectAssesmentObjs = [];
    if (semester !== "default") {
      subjectAssesmentObjs = await subjectAssignment
        .find({ semester, branch })
        .populate("subject");
    }

    console.log("branchbranchbranch:::", branchobj, subjectAssesmentObjs);

    return res.status(200).json({
      semesters: branchobj?.semesters ?? [],
      divisions: branchobj?.divisions ?? [],
      subjects: subjectAssesmentObjs,
    });
  } catch (err) {
    if (err?.code === 11000) {
      console.log("Semester Creation Error:---", err?.message);
    }
  }
};

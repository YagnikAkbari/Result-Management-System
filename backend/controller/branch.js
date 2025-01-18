const Semester = require("../model/semester");
const Division = require("../model/division");
const Branch = require("../model/branch");

exports.createBranch = async (req, res) => {
  try {
    const { branchName, branchFullName, semesters, divisions } = req.body;

    const getBranchKey = (value) => {
      return "branch-" + value.replace(/[_\s]+/g, "-").toLowerCase();
    };

    const semObj = await Semester.find({ semesterKey: { $in: semesters } });
    const divObj = await Division.find({ divisionKey: { $in: divisions } });

    if (semObj?.length < semesters?.length || divObj?.length < divisions?.length) {
      return;
    }
    const newBranch = new Branch({
      branchKey: getBranchKey(branchFullName),
      branchName,
      branchFullName,
      semesters: semObj?.map((sem) => sem._id),
      divisions: divObj?.map((div) => div._id),
    });

    await newBranch.save();
  } catch (err) {
    if (err?.code === 11000) {
      console.log("Branch Creation Error:---", err?.message);
    }
  }
};

const ElectiveGroup = require("../model/electiveGroup");

exports.createElectiveGroup = async (req, res, next) => {
  try {
    const { groupName, semester, branch, subjects } = req.body;
    const newElectiveGroup = new ElectiveGroup({
      groupName,
      semester,
      branch,
      subjects,
    });
    await newElectiveGroup.save();
  } catch (err) {
    console.log("Elective Group Creation Error:-", err);
  }
};

const Division = require("../model/division");

exports.createDivison = async (req, res) => {
  try {
    const { name } = req.body;

    const newDivision = new Division({
      divisionKey: name,
      Name: name,
    });

    await newDivision.save();
  } catch (err) {
    if (err?.code === 11000) {
      console.log("Batch Creation Error:---", err?.message);
    }
  }
};

const Batch = require("../model/batch");

exports.createBatch = async (req, res) => {
  try {
    const { batch } = req.body;

    const newBatch = new Batch({
      batchName: batch,
      batchKey: batch,
    });

    await newBatch.save();
  } catch (err) {
    if (err?.code === 11000) {
      console.log("Batch Creation Error:---", err?.message);
    }
  }
};

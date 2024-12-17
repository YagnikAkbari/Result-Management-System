const mongoose = require("mongoose");

mongoose.set("strictQuery", true);

const connectDatabaseWithRetry = () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log("Mongo Connected Successful.");
    })
    .catch((err) => {
      console.log("ERROR-MongoDB:-", err);
      setTimeout(connectDatabaseWithRetry, 5000);
    });
};

module.exports = { connectDatabaseWithRetry };

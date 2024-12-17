const Login = require("../model/login");

const mongoose = require("mongoose");

exports.getFacultyPage = (req, res, next) => {
  res.render("faculty/faculty", {
    pageTitle: "Faculty",
    result: 0,
    semester: "",
    division: "",
    subject: "",
    batch: "",
    branch: "",
  });
};

exports.postFacultyResult = (req, res, next) => {
  const { semester, division, subject, batch, branch } = req.body;
  const [subId, subName] = subject.split("|");
  const promises = [];

  for (let i = 1; i <= 8; i++) {
    const dynamicRes = `Result${i}_${branch}`;
    let Model;
    try {
      Model = mongoose.model(dynamicRes);
    } catch (error) {
      continue;
    }

    const promise = Model.find({
      Sem: semester,
      Div: division,
      Batch: batch,
      Branch: branch,
      ["Sub" + subId + "_Name"]: subName,
    });
    promises.push(promise);
  }

  Promise.all(promises)
    .then((results) => {
      const mergedResults = [].concat(...results);
      return res.render("faculty/faculty", {
        pageTitle: "Result",
        result: mergedResults,
        subName: ["Sub" + subId + "_Name"],
        subMarks: ["Sub" + subId + "_Marks"],
        semester: semester,
        division: division,
        subject: subject,
        batch: batch,
        branch: branch,
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getGradeHistory = (req, res, next) => {
  res.render("faculty/grade_history", {
    pageTitle: "Grade History",
  });
};

exports.getGradeHistorySearched = (req, res, next) => {
  let errorMsg = req.flash("error");
  if (errorMsg.length > 0) {
    errorMsg = errorMsg[0];
  } else {
    errorMsg = null;
  }
  res.render("faculty/grade_history_searched", {
    pageTitle: "Grade History",
    errorMessage: errorMsg,
  });
};

// exports.postGradeHistory = (req, res, next) => {
//   const enr = req.body.Enrollment;

//   function getUserBranch(enr) {
//     return Login.findOne({ username: enr }).exec();
//   }

//   getUserBranch(enr).then(user => {

//   })

//   const promises = [];
//   for (let i = 1; i <= 8; i++) {
//     const dynamicRes = `Result${i}_${newBranch}`;
//     let Model;
//     try {
//       Model = mongoose.model(dynamicRes);
//     } catch (error) {
//       console.log(`Model ${dynamicRes} not found.`);
//       continue;
//     }
//     promises.push(Model.find({ Enrollment: enr }));
//   }

//   Promise.all(promises)
//     .then(results => {
//       if (!results) {
//         return req.flash("error", "❌ Enrollment Number is incorrect.");
//       }
//       const combinedResults = results.flat();
//       console.log(combinedResults);
//       res.render("faculty/grade_history_searched", {
//         pageTitle: "Grade History",
//         result: combinedResults,
//       });
//     })
//     .catch(err => {
//       const error = new Error(err);
//       error.httpStatusCode = 500;
//       return next(error);
//     });
// };

exports.postGradeHistory = (req, res, next) => {
  const enr = req.body.Enrollment;

  function getUserBranch(enr) {
    return Login.findOne({ username: enr }).exec();
  }

  getUserBranch(enr)
    .then((user) => {
      if (!user) {
        return res.render("faculty/grade_history_searched", {
          pageTitle: "Grade History",
          result: 0,
        });
      }
      const newBranch = user.Branch;

      const promises = [];
      for (let i = 1; i <= 8; i++) {
        const dynamicRes = `Result${i}_${newBranch}`;
        let Model;
        try {
          Model = mongoose.model(dynamicRes);
        } catch (error) {
          console.log(`Model ${dynamicRes} not found.`);
          continue;
        }
        promises.push(Model.find({ Enrollment: enr }));
      }

      Promise.all(promises)
        .then((results) => {
          const combinedResults = results.flat();
          console.log(combinedResults);
          res.render("faculty/grade_history_searched", {
            pageTitle: "Grade History",
            result: combinedResults,
          });
        })
        .catch((err) => {
          const error = new Error(err);
          error.httpStatusCode = 500;
          return next(error);
        });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

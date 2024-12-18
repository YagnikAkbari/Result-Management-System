const Login = require("../model/login");
const Result = require("../model/result");
const Student = require("../model/student");

const { getPopulatedSubjectData } = require("../config/helpers");

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
    result: 0,
    student: {},
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

exports.postGradeHistory = async (req, res, next) => {
  try {
    const { Enrollment } = req.body;

    if (!Enrollment) {
      return res.render("faculty/grade_history", {
        pageTitle: "Grade History",
        errorMessage: "",
        result: 0,
        student: {},
      });
    }

    const user = await Login.findOne({ username: Enrollment });
    const student = await Student.findOne({ userId: user?._id })
      .populate("Div")
      .populate("Branch")
      .populate("Batch");

    if (!user || !student) {
      return res.render("faculty/grade_history", {
        pageTitle: "Grade History",
        errorMessage: "Please enter valid Enrollment Number!",
        result: 0,
        student: {},
      });
    }

    const results = await Result.find({ student: student?._id }).populate(
      "semester"
    );
    let finalResult = [];

    if (results && results?.length) {
      finalResult = await Promise.all(
        results?.map(async (result) => {
          if (Object?.keys(result?.result)?.length) {
            let subjects = await getPopulatedSubjectData(
              Object?.keys(result?.result)
            );
            let subjectWithmarks = subjects?.map((subject) => {
              return {
                ...subject,
                subjectMarks: result?.result[subject?.subjectCode],
              };
            });
            return {
              ...result?._doc,
              result: subjectWithmarks,
            };
          }
        })
      );
    }

    res.render("faculty/grade_history", {
      pageTitle: "Grade History",
      result: finalResult,
      student: { ...student?._doc, Name: user?.Name },
    });
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
};

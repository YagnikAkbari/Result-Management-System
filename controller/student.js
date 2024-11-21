const Login = require("../model/login");
const Result4 = require("../model/result_CE_4");
const Result = require("../model/result_CE_5");
const Result6 = require("../model/result_CE_6");

let name;
let division;
let enrollmentNo;
let branch;
let password;
let academicYear;
let batch;

exports.getStudentPage = (req, res, next) => {
  let resultNotFound = req.flash("resultNotFound");
  if (resultNotFound.length > 0) {
    resultNotFound = resultNotFound[0];
  } else {
    resultNotFound = null;
  }
  res.render("student/student", {
    pageTitle: "Student",
    errorMessage: resultNotFound,
  });
  const username = req.session.login.username;
  Login.findOne({ username: username })
    .then(student => {
      name = student.Name;
      division = student.Div;
      branch = student.Branch;
      enrollmentNo = student.username;
      password = student.password;
      batch = student.Batch;
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getProfile = (req, res, next) => {
  res.render("student/student_profile", {
    pageTitle: "Student Profile",
    name,
    enrollmentNo,
    division,
    password,
    batch,
  });
};

exports.postResult4 = (req, res, next) => {
  const enrollmentNo = req.session.login.username;
  const semester = req.body.semester;
  Result4.findOne({ Enrollment: enrollmentNo })
    .then(result => {
      if (result) {
        academicYear = result.AcademicYear;
        return res.render("student/result_CE_4", {
          pageTitle: "Semester 4 Result",
          result,
          name,
          enrollmentNo,
          division,
          branch,
          academicYear,
          semester,
        });
      } else {
        req.flash("resultNotFound", "❌ Oops! Your result is not available.");
        return res.redirect("/student");
      }
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postResult5 = (req, res, next) => {
  const enrollmentNo = req.session.login.username;
  const semester = req.body.semester;
  Result.findOne({ Enrollment: enrollmentNo })
    .then(result => {
      if (result) {
        res.render("student/result_CE_5", {
          pageTitle: "Semester 5 Result",
          result,
          name,
          enrollmentNo,
          division,
          branch,
          academicYear,
          semester,
        });
      } else {
        req.flash("resultNotFound", "❌ Oops! Your result is not available.");
        return res.redirect("/student");
      }
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postResult6 = (req, res, next) => {
  const enrollmentNo = req.session.login.username;
  const semester = req.body.semester;
  Result6.findOne({ Enrollment: enrollmentNo })
    .then(result => {
      if (result) {
        res.render("student/result_CE_6", {
          pageTitle: "Semester 6 Result",
          result,
          name,
          enrollmentNo,
          division,
          branch,
          academicYear,
          semester,
        });
      } else {
        req.flash("resultNotFound", "❌ Oops! Your result is not available.");
        return res.redirect("/student");
      }
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

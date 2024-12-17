const Login = require("../model/login");
const Student = require("../model/student");

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
};

exports.getProfile = async (req, res, next) => {
  try {
    const { username, _id: userId } = req.session.login;
    const user = await Login.findOne({ username: username });
    const student = await Student.findOne({ userId })
      .populate("currentSemester")
      .populate("Batch")
      .populate("Div")
      .populate("Branch");
    let userData = {};
    if (user?._doc) {
      const { Name, Email } = user?._doc;
      userData = { ...userData, Name, Email };
    }
    if (student?._doc) {
      const {
        currentSemester,
        Div,
        Branch,
        EnrollmentNo,
        collegeEmail,
        Batch,
      } = student?._doc;
      userData = {
        ...userData,
        currentSemester: currentSemester?.Name,
        Div: Div?.Name,
        Branch: Branch?.branchFullName,
        Batch: Batch?.batchName,
        EnrollmentNo,
        collegeEmail,
      };
    }

    if (!user) {
      return;
    }

    res.render("student/student_profile", {
      pageTitle: "Student Profile",
      user: userData,
    });
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
};

exports.postResult4 = (req, res, next) => {
  const enrollmentNo = req.session.login.username;
  const semester = req.body.semester;
  Result4.findOne({ Enrollment: enrollmentNo })
    .then((result) => {
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
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postResult5 = (req, res, next) => {
  const enrollmentNo = req.session.login.username;
  const semester = req.body.semester;
  Result.findOne({ Enrollment: enrollmentNo })
    .then((result) => {
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
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postResult6 = (req, res, next) => {
  const enrollmentNo = req.session.login.username;
  const semester = req.body.semester;
  Result6.findOne({ Enrollment: enrollmentNo })
    .then((result) => {
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
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

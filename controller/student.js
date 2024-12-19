const Login = require("../model/login");
const Student = require("../model/student");
const Branch = require("../model/branch");
const Result = require("../model/result");
const Semester = require("../model/semester");
const { getPopulatedSubjectData } = require("../config/helpers");

exports.getStudentPage = async (req, res) => {
  try {
    let resultNotFound = req.flash("resultNotFound");
    const user = req.session.login;
    let semesters = [];
    let student = null;
    if (user) {
      student = await Student.findOne({ userId: user?._id });
    }
    if (student) {
      semesters = await Branch.findById(student?.Branch).populate("semesters");
    }
    if (semesters?.length) {
      semesters = semesters?.semesters;
    }
    if (resultNotFound.length > 0) {
      resultNotFound = resultNotFound[0];
    } else {
      resultNotFound = null;
    }

    res.render("student/student", {
      pageTitle: "Student",
      errorMessage: resultNotFound,
      details: semesters,
    });
  } catch (err) {
    console.log(err);
  }
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

exports.getResult = async (req, res, next) => {
  try {
    const { username: enrollmentNo } = req.session.login;

    const semesterObj = await Semester.findOne({
      semesterKey: req.query.semester,
    });
    const studentObj = await Student.findOne({
      EnrollmentNo: enrollmentNo,
    });

    const result = await Result.findOne({
      student: studentObj?._id,
      semester: semesterObj?._id,
    });

    if (!result) {
      req.flash("resultNotFound", "❌ Oops! Your result is not available.");
      return res.redirect("/student");
    }
    let resultData = [];
    if (Object?.keys(result?.result)?.length) {
      let subjects = await getPopulatedSubjectData(
        Object?.keys(result?.result)
      );

      resultData = subjects?.map((subject) => {
        return {
          ...subject,
          subjectMarks: result?.result[subject?.subjectCode],
        };
      });
    }

    result.result = resultData;
    
    return res.render("student/result", {
      pageTitle: `${req.query.semester} Result`,
      result,
    });
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
};

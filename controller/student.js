const Login = require("../model/login");
const Student = require("../model/student");
const Branch = require("../model/branch");
const Result = require("../model/result");
const Semester = require("../model/semester");
const XLSX = require("xlsx");
const fs = require("fs");
const path = require("path");
const {
  getPopulatedSubjectData,
  convertArrToExcelData,
  removeExtraKeys,
} = require("../config/helpers");

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
    const { semester, is_download } = req.query;

    const semesterObj = await Semester.findOne({
      semesterKey: semester,
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
    if (is_download) {
      const data = await convertArrToExcelData(
        removeExtraKeys(resultData, ["_id", "subjectKey", "subjectName", "__v"])
      )?.map((item, idx) =>
        idx === 0
          ? [...item, "Status"]
          : [...item, item[2] < 28 ? "Fail" : "Pass"]
      );

      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(data);

      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

      const excelBuffer = XLSX.write(workbook, {
        type: "buffer",
        bookType: "xlsx",
      });
      const downloadFilePath = path.join(
        __dirname,
        "..",
        "public",
        "results",
        "TimeStampFormat.xlsx"
      );
      fs.writeFileSync(`${downloadFilePath}`, excelBuffer);
      res.download(downloadFilePath);
      setTimeout(() => fs.unlinkSync(downloadFilePath), 3000);
      return;
    } else {
      return res.render("student/result", {
        pageTitle: `${semester} Result`,
        result,
      });
    }
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
};

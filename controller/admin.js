const path = require("path");
const XLSX = require("xlsx");
const Login = require("../model/login");
const Faculty = require("../model/faculty");
const Student = require("../model/student");
const Semester = require("../model/semester");
const Branch = require("../model/branch");
const Batch = require("../model/batch");
const Division = require("../model/division");
const SubjectAssignment = require("../model/subjectAssignment");
const Result = require("../model/result");
const StudentElective = require("../model/studentElective");

const {
  convertToInsertManyMultipleObject,
  compareExcelColumns,
  convertToInsertManyObject,
  convertToDate,
} = require("../config/helpers");
const { ignoreColumns } = require("../config/constants");

const getStudentElectiveSubjects = async (student, semester) => {
  let subArr = [];
  const studentElective = await StudentElective.findOne({
    studentId: student?._id,
  }).populate({
    path: "electives",
    populate: {
      path: "electiveSubjects",
    },
  });

  subArr = studentElective?.electives?.filter((semesterElective) => {
    return (
      JSON.stringify(semesterElective?.semesterId) ===
      JSON.stringify(semester?._id)
    );
  })[0]?.electiveSubjects;

  return subArr?.map((sub) => sub?.subjectCode);
};

exports.getAdminPage = async (req, res, next) => {
  try {
    let successMessage = req.flash("success");
    if (successMessage.length > 0) {
      successMessage = successMessage[0];
    } else {
      successMessage = null;
    }

    let errorMessage = req.flash("error");
    if (errorMessage.length > 0) {
      errorMessage = errorMessage[0];
    } else {
      errorMessage = null;
    }

    const semesters = await Semester.find();
    const branches = await Branch.find();

    res.render("admin/admin", {
      pageTitle: "Admin",
      successMessage: successMessage,
      errorMessage: errorMessage,
      details: { semesters, branches },
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getStudentData = (req, res, next) => {
  let successMessage = req.flash("success");
  if (successMessage.length > 0) {
    successMessage = successMessage[0];
  } else {
    successMessage = null;
  }

  let errorMessage = req.flash("error");
  if (errorMessage.length > 0) {
    errorMessage = errorMessage[0];
  } else {
    errorMessage = null;
  }

  res.render("admin/studentData", {
    pageTitle: "Upload Student Data",
    successMessage: successMessage,
    errorMessage: errorMessage,
  });
};

exports.postStudentData = async (req, res) => {
  try {
    const validExtensions = [".xls", ".xlsx"];
    const fileExtension = path.extname(req.file.originalname);
    if (!validExtensions.includes(fileExtension)) {
      req.flash(
        "error",
        "❌ Invalid file format. Only Excel files are allowed."
      );
      return res.redirect("/studentData");
    }

    // Parse Excel
    const workbook = XLSX.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const xlData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    let compareColumns = Object.keys(Login.schema.paths)
      .concat(Object?.keys(Student.schema.paths))
      .filter((col) => !ignoreColumns?.includes(col));
    const columnErrors = compareExcelColumns(xlData[0], compareColumns);

    if (columnErrors) {
      const { missingColumns, extraColumns } = columnErrors;
      let errorMessage = "";
      if (missingColumns.length) {
        errorMessage += `Total columns are missing from the Excel file(${
          missingColumns.length
        }): ${missingColumns.join(", ")}`;
      }
      errorMessage += "\n\n";
      if (extraColumns.length) {
        errorMessage += `Extra columns are not allowed in the Excel File(${
          extraColumns.length
        }): ${extraColumns.join(", ")} `;
      }
      req.flash("error", `❌ ${errorMessage}`);
      return res.redirect("/studentData");
    }
    const { Login: LoginData, Student: StudentData } =
      convertToInsertManyMultipleObject(xlData, {
        Login: ["username", "password", "Name", "MobileNo", "Email"],
        Student: ["collegeEmail", "Div", "Batch", "Branch", "currentSemester"],
      });
    const insertedData = await Login.insertMany(
      LoginData?.map((item) => ({
        ...item,
        userType: "STUDENT",
        firstLogin: false,
      })),
      { ordered: false }
    );
    const studentsArr = await Promise.all(
      StudentData?.map(async (item, index) => {
        const [semesterObj, branchObj, batchObj, divisionObj] =
          await Promise.all([
            Semester.findOne({ semesterKey: item.currentSemester }),
            Branch.findOne({ branchFullName: item.Branch }),
            Batch.findOne({ batchKey: item.Batch }),
            Division.findOne({ divisionKey: item.Div }),
          ]);

        return {
          ...item,
          Div: divisionObj?._id,
          Batch: batchObj?._id,
          Branch: branchObj?._id,
          currentSemester: semesterObj?._id,
          userId: insertedData[index]?._id,
          EnrollmentNo: insertedData[index]?.username,
        };
      })
    );

    await Student.insertMany(studentsArr);

    req.flash("success", "✌️ Student details is uploaded!");
    return res.redirect("/studentData");
  } catch (err) {
    console.log(err);
    req.flash(
      "error",
      "❌ Duplicate Enteries Present. Please check the excel file again"
    );
    return res.redirect("/studentData");
  }
};

exports.postResultData = async (req, res) => {
  try {
    const { Semester: sem, Branch: branch } = req.body;

    const validExtensions = [".xls", ".xlsx"];
    const fileExtension = path.extname(req.file.originalname);
    const [semesterObj, branchObj] = await Promise.all([
      await Semester.findOne({ semesterKey: sem }),
      await Branch.findOne({ branchKey: branch }),
    ]);

    const subjects = await SubjectAssignment.find({
      semester: semesterObj?._id,
      branch: branchObj?._id,
    }).populate("subject");

    const subjectCodes = subjects?.map((sub) => sub?.subject?.subjectCode);
    const allowedColumns = [...subjectCodes, "EnrollmentNo", "AcademicYear"];

    if (!validExtensions.includes(fileExtension)) {
      req.flash(
        "error",
        "❌ Invalid file format. Only Excel files are allowed."
      );
      return res.redirect("/admin");
    }

    const workbook = XLSX.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const xlData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    const columnErrors = compareExcelColumns(xlData[0], allowedColumns);
    if (columnErrors) {
      const { missingColumns, extraColumns } = columnErrors;
      let errorMessage = "";
      if (missingColumns.length) {
        errorMessage += `Total columns are missing from the Excel file(${
          missingColumns.length
        }): ${missingColumns.join(", ")}`;
      }
      errorMessage += "\n\n";
      if (extraColumns.length) {
        errorMessage += `Extra columns are not allowed in the Excel File(${
          extraColumns.length
        }): ${extraColumns.join(", ")} `;
      }
      req.flash("error", `❌ ${errorMessage}`);
      return res.redirect("/admin");
    }

    const resultsData = convertToInsertManyObject(xlData)?.filter(
      (item) => item?.EnrollmentNo !== "-"
    );

    const subjectElectiveMapping = subjects?.map((sub) => {
      return {
        subjectCode: sub?.subject?.subjectCode,
        is_elective: sub?.is_elective,
      };
    });
    const finalData = await Promise.all(
      resultsData?.map(async (result) => {
        const studentObj = await Student?.findOne({
          EnrollmentNo: result?.EnrollmentNo,
        });
        const electiveSubjects = await getStudentElectiveSubjects(
          studentObj,
          semesterObj
        );
        let resultSubjects = {};
        Object?.keys(result)?.map((key) => {
          let matchingElctiveSubject = subjectElectiveMapping?.filter(
            (item) => key === item?.subjectCode && item?.is_elective
          )[0];

          if (
            (matchingElctiveSubject?.is_elective &&
              electiveSubjects?.includes(
                matchingElctiveSubject?.subjectCode
              )) ||
            !matchingElctiveSubject
          ) {
            resultSubjects[key] = result[key];
          }
        });

        const data = {
          ...resultSubjects,
          semester: semesterObj?._id,
          branch: branchObj?._id,
          division: studentObj?.Div,
          student: studentObj?._id,
        };

        const {
          semester,
          branch,
          division,
          EnrollmentNo,
          AcademicYear,
          student,
          ...resData
        } = data;
        return {
          student,
          semester,
          branch,
          division,
          AcademicYear,
          result: resData,
        };
      })
    );

    Result.insertMany(finalData, (err, data) => {
      if (err) {
        return new Error(err);
      } else {
        req.flash("success", "✌️The result is uploaded");
        res.redirect("/admin");
      }
    });
  } catch (err) {
    console.log(err);
  }
};

exports.createFaculty = async (req, res, next) => {
  try {
    const {
      username,
      password,
      userType,
      Name,
      Email,
      MobileNo,
      colloegeIdNo,
      collegeEmail,
    } = req.body;
    const newUser = new Login({
      username,
      password,
      userType,
      Name,
      Email,
      MobileNo,
    });

    await newUser.save();
    const newFaculty = await new Faculty({
      userId: newUser?._id,
      colloegeIdNo,
      collegeEmail,
    });

    await newFaculty.save();
  } catch (err) {
    console.log(err);
  }
};

exports.convertTimestampToDate = (req, res) => {
  const validExtensions = [".xls", ".xlsx", ".csv"];
  const fileExtension = path.extname(req.file.originalname);
  if (!validExtensions.includes(fileExtension)) {
    req.flash("error", "❌ Invalid file format. Only Excel files are allowed.");
    return res.redirect("/admin");
  }

  const processTimestamp = (timestamp) => {
    return timestamp && typeof timestamp === "number"
      ? convertToDate(timestamp)
      : "Wrong Time Stamp";
  };

  const workbook = XLSX.readFile(req.file.path);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const xlData = XLSX.utils.sheet_to_json(sheet);
  const data = xlData?.map((json) => {
    return {
      ...json,
      Time: processTimestamp(json["Time"]),
      "API Timestamp": processTimestamp(json["API Timestamp"]),
      "Time Processed (UTC)": processTimestamp(json["Time Processed (UTC)"]),
    };
  });

  const dworkbook = XLSX.utils.book_new();
  const dworksheet = XLSX.utils.json_to_sheet(data);

  XLSX.utils.book_append_sheet(dworkbook, dworksheet, "Sheet1");
  const savePath = path.join(
    __dirname,
    "..",
    "results",
    `${req.file.originalname.split(".")[0]}-converted.xlsx`
  );
  XLSX.writeFile(dworkbook, savePath);

  res.status(200).json({
    message: "Success Access it.",
  });
};

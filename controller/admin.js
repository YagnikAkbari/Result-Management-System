const path = require("path");
const XLSX = require("xlsx");
const {
  compareColumns,
  convertToInsertManyMultipleObject,
  compareExcelColumns,
} = require("../config/helpers");
const Login = require("../model/login");
const Student = require("../model/student");
const modelMap = {};
const { ignoreColumns } = require("../config/constants");
const Semester = require("../model/semester");
const Branch = require("../model/branch");
const Batch = require("../model/batch");
const Division = require("../model/division");

exports.getAdminPage = (req, res, next) => {
  let successMessage = req.flash("error");
  if (successMessage.length > 0) {
    successMessage = successMessage[0];
  } else {
    successMessage = null;
  }

  let errorMessage = req.flash("error1");
  if (errorMessage.length > 0) {
    errorMessage = errorMessage[0];
  } else {
    errorMessage = null;
  }
  res.render("admin/admin", {
    pageTitle: "Admin",
    successMessage: successMessage,
    errorMessage: errorMessage,
  });
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
    console.log("reqfiles-----", req.file);
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
    const columnErrors = compareExcelColumns(xlData, compareColumns);

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
    err?.results?.map((obj) => console.log(obj?.err));
    req.flash(
      "error",
      "❌ Duplicate Enteries Present. Please check the excel file again"
    );
    return res.redirect("/studentData");
  }
};

exports.postResultData = (req, res) => {
  const { semester, branch, batch } = req.body;

  const validExtensions = [".xls", ".xlsx"];
  const fileExtension = path.extname(req.file.originalname);
  if (!validExtensions.includes(fileExtension)) {
    req.flash(
      "error1",
      "❌ Invalid file format. Only Excel files are allowed."
    );
    return res.redirect("/admin");
  }

  const ResultModel = modelMap[`${branch}_${semester}`];

  const workbook = XLSX.readFile(req.file.path);
  const sheet_namelist = workbook.SheetNames;
  let x = 0;
  sheet_namelist.forEach((element) => {
    const xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_namelist[x]]);
    const columnErrors = compareColumns(xlData, ResultModel);
    if (columnErrors) {
      const { missingColumns, extraColumns } = columnErrors;
      let errorMessage = "";
      if (missingColumns.length) {
        errorMessage += `Total columns are missing from the Excel file: ${
          missingColumns.length
        } ${missingColumns.join(",")}`;
      }

      if (extraColumns.length) {
        errorMessage += `Total columns are not present in the database schema: ${extraColumns.length} `;
      }
      req.flash("error1", `❌ ${errorMessage}`);
      return res.redirect("/admin");
    }
    ResultModel.findOne({}, (err, existingData) => {
      if (err) {
        return new Error(err);
      } else if (existingData) {
        ResultModel.updateOne(
          {},
          {
            $set: {},
          },
          (err, data) => {
            if (err) {
              return new Error(err);
            } else {
              req.flash("error", "✌️The result is uploaded");
              res.redirect("/admin");
            }
          }
        );
      } else {
        ResultModel.insertMany(xlData, (err, data) => {
          if (err) {
            return new Error(err);
          } else {
            req.flash("error", "✌️The result is uploaded");
            res.redirect("/admin");
            console.log(data);
            x++;
          }
        });
      }
    });
  });
};

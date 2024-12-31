const Login = require("../model/login");
const Result = require("../model/result");
const Student = require("../model/student");
const Batch = require("../model/batch");
const Branch = require("../model/branch");
const Subject = require("../model/subject");
const subjectAssignment = require("../model/subjectAssignment");
const mongoose = require("mongoose");
const XLSX = require("xlsx");
const fs = require("fs");
const path = require("path");
const { ObjectId } = mongoose.Types;

const {
  getPopulatedSubjectData,
  convertArrToExcelData,
  convertFlatArrFromObjs,
  removeExtraKeys,
  sortArrObjKeyWise,
} = require("../config/helpers");

const generateResultRemoveKeys = (data) => {
  return Object?.keys(data)?.filter((key) => key.startsWith("result"));
};

exports.getFacultyPage = async (req, res, next) => {
  try {
    const batches = await Batch.find();
    const branches = await Branch.find();
    res.render("faculty/faculty", {
      pageTitle: "Faculty",
      results: 0,
      semesters: [],
      divisions: [],
      subjects: [],
      batches: batches.sort((b, a) => a.batchName - b.batchName),
      branches: branches.sort((b, a) => a.branchFullName - b.branchFullName),
      filters: {
        semester: "default",
        division: "default",
        subject: "default",
        batch: "default",
        branch: "default",
      },
    });
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
};

exports.postFacultyResult = async (req, res, next) => {
  try {
    const { semester, division, subject, batch, branch } = req.body;
    const { is_download } = req.query;
    const batches = await Batch.find();
    const branches = await Branch.find();
    const branchobj = await Branch.findById(branch)
      .populate("semesters")
      .populate("divisions");
    const subjectAssesmentObjs = await subjectAssignment
      .find({ semester, branch })
      .populate("subject");
    const results = await Result.find({ semester, division, branch }).populate([
      { path: "branch", select: "branchFullName branchKey" },
      {
        path: "student",
        populate: [
          {
            path: "userId",
            select: "Name Email MobileNo",
          },
        ],
      },
      { path: "division" },
      { path: "semester" },
    ]);
    let subjectObj = null;
    if (subject !== "default") {
      subjectObj = await Subject?.findById(subject);
    }

    let remidStudentCount = 0;
    let finalResults = results
      ?.map((result) => {
        let resultObj = result?._doc;
        let resultSub = null;
        if (Object?.keys(resultObj?.result ?? {})?.length) {
          if (subjectObj) {
            resultSub = Object?.keys(resultObj?.result)?.filter(
              (code) => code === subjectObj?.subjectCode
            );
            if (resultObj?.result[resultSub] < 28) {
              remidStudentCount++;
            }

            return {
              ...resultObj,
              ...{
                subjectMarks: resultObj?.result[resultSub],
                ...subjectObj?._doc,
              },
            };
          } else {
            return Object?.keys(resultObj?.result)?.map((subCode) => {
              if (resultObj?.result[subCode] < 28) {
                remidStudentCount++;
              }
              return {
                ...resultObj,
                subjectMarks: resultObj?.result[subCode],
                ...subjectAssesmentObjs?.find(
                  (subject) => subject?.subject?.subjectCode === subCode
                )?.subject?._doc,
              };
            });
          }
        }
      })
      .flat();

    if (is_download) {
      let convertedData = convertFlatArrFromObjs(
        finalResults?.filter((result) => result?.subjectMarks < 28)
      );
      let removeKeys = [
        "_id",
        "student_id",
        "userId_id",
        "division_id",
        "divisiondivisionKey",
        "branch_id",
        "branchbranchKey",
        "semester_id",
        "semestersemesterKey",
        "subjectKey",
        "studentBatch",
        "studentBranch",
        "studentDiv",
        "studentcurrentSemester",
        "subjectName",
        ...generateResultRemoveKeys(convertedData[0]),
      ];

      convertedData = removeExtraKeys(convertedData, removeKeys);

      finalResults = convertArrToExcelData(sortArrObjKeyWise(convertedData));

      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(finalResults);

      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

      const excelBuffer = XLSX.write(workbook, {
        type: "buffer",
        bookType: "xlsx",
      });
      const resultPath = path.join(
        __dirname,
        "..",
        "public",
        "results",
        "Temp.xlsx"
      );

      fs.writeFileSync(`${resultPath}`, excelBuffer);
      res.download(resultPath);
      setTimeout(() => fs.unlinkSync(resultPath), 3000);
      return;
    } else {
      return res.render("faculty/faculty", {
        pageTitle: "Result",
        results: finalResults?.filter((result) => result?.subjectMarks),
        semesters: branchobj?.semesters ?? [],
        divisions: branchobj?.divisions ?? [],
        subjects: subjectAssesmentObjs,
        batches: batches.sort((b, a) => a.batchName - b.batchName),
        branches: branches.sort((b, a) => a.branchFullName - b.branchFullName),
        remidStudentCount,
        filters: {
          semester: new ObjectId(semester),
          division: new ObjectId(division),
          subject: subjectObj ? new ObjectId(subject) : "default",
          batch: new ObjectId(batch),
          branch: new ObjectId(branch),
        },
      });
    }
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
};

exports.getGradeHistory = (req, res, next) => {
  res.render("faculty/grade_history", {
    pageTitle: "Grade History",
    result: 0,
    student: {},
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

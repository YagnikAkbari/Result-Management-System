const path = require("path");
const express = require("express");
const auth = require("../middleware/is-auth");
const router = express.Router();
const multer = require("multer");

const XLSX = require("xlsx");
const Login = require("../model/login");

const Result_CE_4 = require("../model/result_CE_4");
const Result_CE_5 = require("../model/result_CE_5");
const Result_CE_6 = require("../model/result_CE_6");

const Result_IT_4 = require("../model/result_IT_4");
const Result_IT_5 = require("../model/result_IT_5");

const adminController = require("../controller/admin");

const modelMap = {
  CE_4: Result_CE_4,
  CE_5: Result_CE_5,
  CE_6: Result_CE_6,
  IT_4: Result_IT_4,
  IT_5: Result_IT_5,
};

router.get("/admin", auth, adminController.getAdminPage);

router.get("/studentData", auth, adminController.getStudentData);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

function compareColumns(xlData, ResultModel) {
  const dbColumns = Object.keys(ResultModel.schema.paths).filter(
    (col) => col !== "_id" && col !== "__v"
  );
  const xlColumns = Object.keys(xlData[0]);

  const missingColumns = dbColumns.filter((col) => !xlColumns.includes(col));
  const extraColumns = xlColumns.filter((col) => !dbColumns.includes(col));

  if (missingColumns.length || extraColumns.length) {
    return { missingColumns, extraColumns };
  }
  return null;
}

function compareColumns1(xlData, Login) {
  const dbColumns = Object.keys(Login.schema.paths).filter(
    (col) =>
      col !== "resetToken" &&
      col !== "resetTokenExpiration" &&
      col !== "_id" &&
      col !== "__v"
  );
  const xlColumns = Object.keys(xlData[0]);

  const missingColumns = dbColumns.filter((col) => !xlColumns.includes(col));
  const extraColumns = xlColumns.filter((col) => !dbColumns.includes(col));

  if (missingColumns.length || extraColumns.length) {
    return { missingColumns, extraColumns };
  }
  return null;
}

router.post("/studentData", auth, upload.single("excel"), (req, res, next) => {
  const validExtensions = [".xls", ".xlsx"];
  const fileExtension = path.extname(req.file.originalname);
  if (!validExtensions.includes(fileExtension)) {
    req.flash(
      "error1",
      "❌ Invalid file format. Only Excel files are allowed."
    );
    return res.redirect("/studentData");
  }

  const workbook = XLSX.readFile(req.file.path);
  const sheet_namelist = workbook.SheetNames;
  let x = 0;
  sheet_namelist.forEach((element) => {
    const xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_namelist[x]]);
    const columnErrors = compareColumns1(xlData, Login);
    if (columnErrors) {
      const { missingColumns, extraColumns } = columnErrors;
      let errorMessage = "";
      if (missingColumns.length) {
        errorMessage += `Total columns are missing from the Excel file: ${missingColumns.length}`;
      }

      if (extraColumns.length) {
        errorMessage += `Total columns are not present in the database schema: ${extraColumns.length} `;
      }
      req.flash("error1", `❌ ${errorMessage}`);
      return res.redirect("/studentData");
    }

    Login.insertMany(xlData, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        req.flash("error", "✌️ Student details is uploaded!");
        res.redirect("/studentData");
        console.log(data);
        x++;
      }
    });
  });
});

router.post("/admin", auth, upload.single("excel"), (req, res, next) => {
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
});

module.exports = router;

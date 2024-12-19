const Subject = require("../model/subject");

const compareColumns = (xlData, ResultModel) => {
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
};

const compareExcelColumns = (xlColumns, compareColumns) => {
  const missingColumns = compareColumns.filter(
    (col) => !xlColumns.includes(col)
  );
  const extraColumns = xlColumns.filter((col) => !compareColumns.includes(col));

  if (missingColumns.length || extraColumns.length) {
    return { missingColumns, extraColumns };
  }
  return null;
};

const convertToInsertManyObject = (data) => {
  let arrObj = data?.map((_, index) => {
    let obj = {};
    data[0]?.map((key, i) => {
      if (index < data?.length - 1) {
        obj = { ...obj, [key]: data[index + 1][i] ?? "-" };
      }
    });
    return obj;
  });
  return arrObj.slice(0, -1);
};

const convertToInsertManyMultipleObject = (data, seprator) => {
  const sepratorKeys = Object?.keys(seprator);
  let finalObj = {};
  data?.forEach((_, index) => {
    let obj = {};
    data[0]?.forEach((key, i) => {
      sepratorKeys?.forEach((sep) => {
        if (!obj[sep]) {
          obj[sep] = {};
        }
        if (seprator[sep]?.includes(key)) {
          if (index < data?.length - 1) {
            obj[sep] = { ...obj[sep], [key]: data[index + 1][i] };
          }
        }
      });
    });
    if (index < data?.length - 1) {
      sepratorKeys?.forEach((sep) => {
        if (!finalObj[sep]) {
          finalObj[sep] = [];
        }
        finalObj[sep].push(obj[sep]);
      });
    }
  });
  return finalObj;
};

const getPopulatedSubjectData = async (subCodes) => {
  return await Promise.all(
    subCodes?.map(async (subCode) => {
      const subject = await Subject.findOne({ subjectCode: subCode });

      return {
        ...(subject?._doc || {}),
      };
    })
  );
};

const convertArrToExcelData = (data) => {
  let headers = Object?.keys(data[0]);
  let body = data?.map((item) => {
    return Object?.values(item)
      ?.map((value) => {
        if (typeof value === "string") {
          return value;
        } else if (typeof value === "object") {
          return Object?.values?.(value);
        } else {
          return null;
        }
      })
      ?.flatMap((item) => item);
  });
  return [headers, body];
};

const convertToFlatObj = (dataObj) => {
  Object?.keys(dataObj)?.map((key) => {
    if (
      dataObj[key] &&
      typeof dataObj[key] === "object" &&
      !Array?.isArray(dataObj[key])
    ) {
      convertToFlatObj(dataObj[key]);
    } else {
      return { ...dataObj[key] };
    }
  });
};

const convertFlatArrFromObjs = (data) => {
  return data?.map((item) => {
    let data = {};
    if (item && Object?.keys(item) && Object?.keys(item)?.length) {
      Object?.keys(item)?.map((key) => {
        if (typeof item[key] === "object" && !Array?.isArray(item[key])) {
          data = convertToFlatObj(item[key]);
        } else {
          data = { ...data, [key]: item[key] };
        }
      });
    }
    return data;
  });
};

module.exports = {
  compareColumns,
  compareExcelColumns,
  convertToInsertManyObject,
  convertToInsertManyMultipleObject,
  getPopulatedSubjectData,
  convertArrToExcelData,
  convertFlatArrFromObjs,
};

const { default: mongoose } = require("mongoose");
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
    return Object?.values(item);
  });
  return [headers, ...body];
};

const convertToFlatObj = (dataObj, parentKey = "") => {
  let obj = {};
  Object?.keys(dataObj)?.map((key) => {
    if (!dataObj[key]) {
      return dataObj[key];
    }
    const checkObj = JSON.parse(JSON.stringify(dataObj[key]));

    if (
      checkObj &&
      typeof checkObj === "object" &&
      !Array.isArray(checkObj) &&
      !["_id", "__v"]?.includes(key)
    ) {
      const flattenedNestedObj = convertToFlatObj(checkObj, key);
      obj = { ...obj, ...flattenedNestedObj };
    } else {
      obj[`${parentKey}${key}`] = dataObj[key];
    }
  });
  return obj;
};

const removeExtraKeys = (data, removeKeys) => {
  return data?.map((item) => {
    let obj = {};
    if (item && Object?.keys(item) && Object?.keys(item)?.length) {
      Object?.keys(item)?.map((key) => {
        if (!removeKeys?.includes(key)) {
          obj[key] = item[key];
        }
      });
    }
    return obj;
  });
};

const convertFlatArrFromObjs = (data) => {
  return data?.map((item) => convertToFlatObj(item));
};

const sortArrObjKeyWise = (data) => {
  return data?.map((item) => {
    return Object.keys(item)
      .sort()
      .reduce((acc, key) => {
        acc[key] = item[key];
        return acc;
      }, {});
  });
};

const convertToDate = (timestamp) => {
  const date = new Date(timestamp * 1000);

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
};

module.exports = {
  compareColumns,
  compareExcelColumns,
  convertToInsertManyObject,
  convertToInsertManyMultipleObject,
  getPopulatedSubjectData,
  convertArrToExcelData,
  convertFlatArrFromObjs,
  removeExtraKeys,
  sortArrObjKeyWise,
  convertToDate,
};

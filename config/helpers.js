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

module.exports = {
  compareColumns,
  compareExcelColumns,
  convertToInsertManyObject,
  convertToInsertManyMultipleObject,
};

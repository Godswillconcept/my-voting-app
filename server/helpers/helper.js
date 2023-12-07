const { promisify } = require("util");
const xlsx = require("xlsx");

const uploadFile = async (file, destination) => {
  const fileName =
    Number(new Date()).toString(32) +
    Math.random().toString().slice(2) +
    "." +
    file.name.split(".").pop();

  const moveFile = promisify(file.mv);
  await moveFile(`${destination}/${fileName}`);

  console.log("File uploaded successfully");
  return fileName;
};

const dateToISOString = (dob) => {
  const [year, month, day] = dob.split("-");
  return new Date(`${year}-${month}-${day}`).toISOString();
};

const parseExcel = (filePath) => {
  let data = [];
  const workbook = xlsx.readFile(filePath);
  const sheetNames = workbook.SheetNames;
  for (let i = 0; i < sheetNames.length; i++) {
    const arr = xlsx.utils.sheet_to_json(workbook.Sheets[sheetNames[i]]);
    arr.forEach((res) => {
      data.push(res);
    });
  }
  return data;
};


module.exports = {
  uploadFile,
  dateToISOString,
  parseExcel,
};

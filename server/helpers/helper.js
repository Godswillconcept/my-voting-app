const { promisify } = require("util");
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

const convertDOBtoISO = (dob) => {
  const [year, month, day] = dob.split("-");
  return new Date(`${year}-${month}-${day}`).toISOString();
};

module.exports = {
  uploadFile,
  convertDOBtoISO,
};

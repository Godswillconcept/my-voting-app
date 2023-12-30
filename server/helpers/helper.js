const { promisify } = require("util");
const xlsx = require("xlsx");
const jwt = require("jsonwebtoken");

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

function generateRandomToken(length = 32) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let token = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    token += characters.charAt(randomIndex);
  }

  return token;
}

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Forbidden" });

    req.user = user;
    next();
  });
};

module.exports = {
  uploadFile,
  dateToISOString,
  parseExcel,
  generateRandomToken,
  authenticateToken,
};

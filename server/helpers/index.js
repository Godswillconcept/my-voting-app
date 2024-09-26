const { promisify } = require("util");
const xlsx = require("xlsx");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

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

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ error: "Token expired" });
      }
      return res.status(401).json({ error: "Invalid token" });
    }

    req.userId = decoded.userId;
    req.role = decoded.role;
    next();
  });
};

const isAdmin = (req, res, next) => {
  if (req.role !== "Admin") {
    return res.status(403).json({ error: "Permission denied" });
  }

  next();
};
module.exports = {
  uploadFile,
  dateToISOString,
  parseExcel,
  verifyToken,
  isAdmin,
  transporter,
};

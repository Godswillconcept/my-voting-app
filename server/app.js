const express = require("express");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const fileUpload = require("express-fileupload");
const adminRoute = require("./routes/adminRoute");
const app = express();
const PORT = process.env.PORT || 3300;

app.use(express.json());
app.use(cors());
app.use(express.static("uploads"));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./tmp/",
  })
);

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(cookieParser());
app.use(adminRoute);

app.get("/", (req, res) => {
  res.json({
    message: "Testing...",
  });
});

app.listen(PORT, () =>
  console.log(
    `server listening on port ${PORT}\nVisit http://localhost:${PORT}`
  )
);

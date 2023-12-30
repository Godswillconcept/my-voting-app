const express = require("express");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const fileUpload = require("express-fileupload");
const candidateRouter = require("./routes/candidateRoute");
const userRouter = require("./routes/userRoute");
const pollRouter = require("./routes/pollRoute");
const platformRouter = require("./routes/platformRoute");
const app = express();
const port = 3300;

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

app.use("/users", userRouter);
app.use("/candidates", candidateRouter);
app.use("/polls", pollRouter);
app.use("/platforms", platformRouter);

app.get("/", (req, res) => {
  res.json({
    message: "Testing...",
  });
});

app.listen(port, () =>
  console.log(
    `server listening on port ${port}\nVisit http://localhost:${port}`
  )
);

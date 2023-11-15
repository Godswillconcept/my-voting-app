const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const userRouter = require('./routes/userRoute');
const platformRouter = require('./routes/platformRoute');
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

app.use("/users", userRouter);
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

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

require("dotenv").config();

const authRoutes =
  require("./routes/authRoutes");

const projectRoutes =
  require("./routes/projectRoutes");

const taskRoutes =
  require("./routes/taskRoutes");

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use(cors());

app.get("/", (req, res) => {

  res.send(
    "Team Task Manager API Running 🚀"
  );

});

app.use("/api/auth", authRoutes);

app.use("/api/projects", projectRoutes);

app.use("/api/tasks", taskRoutes);

const PORT = 5000;

app.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );

});
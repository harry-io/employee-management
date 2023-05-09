const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { connection } = require("./db");
const { authRoute } = require("./route/auth.route");
const { employeeRoute } = require("./route/employee.route");
const app = express();
app.use(express.json());
app.get("/", (req, res) => {
  res.status(200).send({ message: "Welcome to homepage." });
});
app.use(cors());
app.use(authRoute);
app.use(employeeRoute);
//
app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("MongoDB connected.");
    console.log(`Port running at ${process.env.PORT}.`);
  } catch (error) {
    console.log(error);
  }
});

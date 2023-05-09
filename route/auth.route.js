const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { AuthModel } = require("../model/auth.model");
const authRoute = express.Router();
//
// POST SIGNUP
authRoute.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    const emailCheck = await AuthModel.findOne({ email });
    console.log(emailCheck);
    if (emailCheck) {
      res
        .status(400)
        .send({ message: "User with the same email already exists." });
    } else {
      bcrypt.hash(password, 5, async (error, hash) => {
        const user = new AuthModel({
          email,
          password: hash,
        });
        await user.save();
        res.status(200).send({ message: "Signup success." });
      });
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});
// POST LOGIN
authRoute.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const emailCheck = await AuthModel.findOne({ email: email });
    if (emailCheck) {
      bcrypt.compare(password, emailCheck.password, (error, result) => {
        if (result) {
          res.status(200).send({
            message: "Login success.",
            token: jwt.sign(
              { userID: emailCheck._id },
              process.env.SECRET_CODE
            ),
          });
        } else {
          res.status(400).send({ message: "Invalid credentials." });
        }
      });
    } else {
      res.status(400).send({ message: "User do not exist." });
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});
//   .
module.exports = { authRoute };

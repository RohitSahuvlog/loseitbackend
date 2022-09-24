const jwt = require("jsonwebtoken");
const becryptjs = require("bcryptjs");
const { Router } = require("express");
const userModel = require("../models/User.model");
require("dotenv").config();

const loginControl = Router();

loginControl.post("/login", async (req, res) => {
  try {
    const { email, password: frontend_password } = req.body;
    const User = await userModel.find({ email });
    //console.log(User)//
    const { password: hash } = User[0];

    becryptjs.compare(frontend_password, hash, async function (err, result) {
      if (err) {
        return res
          .status(500)
          .json({ status: "error", message: "invalid credentials hello" });
      }
      try {
        if (result) {
          const token = await jwt.sign({ email }, process.env.SECRETKEY);

          return res.status(201).json({
            status: "success",
            email,
            message: "login sucessful",
            token,
          });
        }
      } catch (e) {
        return res
          .status(500)
          .json({ status: "error", message: "invalid credentials" });
      }
    });
  } catch (err) {
    return res
      .status(500)
      .json({ status: "error", message: "invalid credentials" });
  }
});

module.exports = loginControl;

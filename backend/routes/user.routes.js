const express = require("express");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { usermodel } = require("../models/user.Model");

userRouter.post("/register", async (req, res) => {
  const { name, email, pass } = req.body;
  try {
    bcrypt.hash(pass, 5, async (error, hash) => {
      if (error) {
        res.json({ error: error.message });
      } else {
        const user = new usermodel({ name, email, pass: hash });
        await user.save();
      }
    });
    res.json({ msg: "user has been registered" });
  } catch (error) {
    res.send({ error: error.message });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  try {
    const user = await usermodel.findOne({ email });

    if (user) {
      console.log(user);
      bcrypt.compare(pass, user.pass, function (err, result) {
        if (result) {
          var token = jwt.sign(
            { userID: user._id, userName: user.name },
            "reddy"
          );
          res.status(200).json({ msg: "login successful", token: token });
        } else {
          res.status(200).json({ msg: "wrong credentials" });
        }
      });
    } else {
      res.status(200).json({ msg: "user not found" });
    }
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

module.exports = { userRouter };

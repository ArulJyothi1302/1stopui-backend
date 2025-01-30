const express = require("express");
const authRouter = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { validateSignUp, validateLogin } = require("../utils/helper");
authRouter.post("/signup", async (req, res) => {
  try {
    validateSignUp(req);
    const { fullName, email, password, userName } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      fullName,
      userName,
      email,
      password: hashedPassword,
    });
    const saveUser = await user.save();
    const token = await saveUser.getJwt();

    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 3600000),
    });
    res.json({ message: "Account Created", data: saveUser });
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    console.log("Inside login Route");
    validateLogin(req);
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const isCorrectPassword = await user.validatePassword(password);
    if (!isCorrectPassword) {
      throw new Error("Invalid Credentials");
    } else {
      const token = await user.getJwt();
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.json({ message: "Login Successful", data: user });
    }
  } catch (err) {
    console.log("Error");
    res.status(400).send("ERROR:" + err.message);
  }
});
authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, { expires: new Date(Date.now()) });
  await res.send("Logout Successful");
});
module.exports = authRouter;

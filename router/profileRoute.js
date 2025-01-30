const express = require("express");
const profileRoute = express.Router();
const { UserAuth } = require("../middleware/authCheck");
const { validateEdit } = require("../utils/helper");

profileRoute.get("/profile/view", UserAuth, async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("User Not Found");
    }
    await res.send(user);
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

profileRoute.patch("/profile/edit", UserAuth, async (req, res) => {
  try {
    if (!validateEdit(req)) {
      throw new Error("unable to update");
    }
    const loggedinUser = req.user;
    if (!loggedinUser) {
      console.log("Checking.............");
      throw new Error("User Not Found");
    }
    console.log("Before Update:" + loggedinUser);

    Object.keys(req.body).forEach((key) => (loggedinUser[key] = req.body[key]));
    await loggedinUser.save();

    console.log("After Update:" + loggedinUser);
    res.json({
      messsage: `${loggedinUser.fName} your Profile is Updated Successfully`,
      data: loggedinUser,
    });
  } catch (err) {
    res.status(404).send("ERROR:" + err.message);
  }
});
module.exports = profileRoute;

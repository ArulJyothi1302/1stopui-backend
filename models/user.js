const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
      trim: true,
    },
    userName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid");
        }
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
  },
  {
    timestamps: true,
  }
);
userSchema.methods.getJwt = async function () {
  const user = this;
  const token = await jwt.sign(
    { _id: user._id.toString() },
    process.env.JWT_KEY,
    {
      expiresIn: "8h",
    }
  );
  return token;
};

userSchema.methods.validatePassword = async function (inputPassword) {
  const user = this;
  const hashPass = user.password;
  const isValidPass = await bcrypt.compare(inputPassword, hashPass);
  return isValidPass;
};

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;

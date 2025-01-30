const validator = require("validator");
const validateSignUp = (req) => {
  const { fullName, email, password } = req.body;
  if (!validator.isEmail(email)) {
    throw new Error("Enter a Valid Email");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Enter a valid Strong Password");
  }
};

const validateLogin = (req) => {
  const { email, password } = req.body;
  if (!validator.isEmail(email)) {
    throw new Error("Invalid Email");
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error("Invalid Password");
  }
};
const validateEdit = (req) => {
  const ALLOWED_DATA = ["fullName", "email"];
  const isAllowed = Object.keys(req.body).every((field) =>
    ALLOWED_DATA.includes(field)
  );
  return isAllowed;
};
module.exports = { validateSignUp, validateLogin, validateEdit };

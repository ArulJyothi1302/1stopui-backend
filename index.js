const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const cors = require("cors");

const conDb = require("./config/database");
require("dotenv").config();

const port = process.env.PORT;
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

const authRouter = require("./router/authRouter");
const profileRoute = require("./router/profileRoute");

app.use(express.json());
app.use(cookieParser());
app.use("/", authRouter);
app.use("/", profileRoute);
app.get("/home", (req, res) => {
  res.send("Hi");
});
conDb()
  .then(() => {
    console.log("DB connected");
    app.listen(port, () => {
      console.log("Server is Listening");
    });
  })
  .catch((err) => {
    console.error("DB not Connected");
  });

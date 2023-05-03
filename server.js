const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const authRouter = require("./routes").auth;
const dataRouter = require("./routes").data;
const passport = require("passport");
require("./config/passport")(passport);
const cors = require("cors");
const PORT = process.env.PORT || 8080;
const path = require("path");

mongoose
  .connect(process.env.MONGODB_CONNECTION)
  .then(console.log("正在連結到資料庫。。。"))
  .catch((e) => {
    console.log(e);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, "client", "build")));

// route設置
app.use("/api/user", authRouter);
app.use(
  "/api/data",
  passport.authenticate("jwt", { session: false }),
  dataRouter
);

if (
  process.env.NODE_ENV === "production" ||
  process.env.NODE_ENV === "staging"
) {
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`後端伺服器正在聆聽${PORT}。。。`);
});

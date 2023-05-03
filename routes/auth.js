const router = require("express").Router();
const registerValidation = require("../validation").registerValidation;
const loginValidation = require("../validation").loginValidation;
const User = require("../models").user;
const jwt = require("jsonwebtoken");

router.get("/test", (req, res) => {
  return res.send("成功連結到auth。。。");
});

router.post("/register", async (req, res) => {
  // 使用joi驗證註冊訊息
  let { error } = registerValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let emailExist = await User.findOne({ email: req.body.email });
  if (emailExist)
    return res
      .status(400)
      .send("該郵箱已經註冊過，請更換其他郵箱或使用該郵箱登錄。");

  let { userName, email, password } = req.body;
  let newUser = new User({ userName, email, password });
  try {
    let saveUser = await newUser.save();
    return res.send({
      mes: "註冊成功!",
      saveUser,
    });
  } catch (e) {
    return res.status(500).send("無法儲存使用者。。。");
  }
});

router.post("/login", async (req, res) => {
  let { error } = loginValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let foundUser = await User.findOne({ email: req.body.email });
  if (!foundUser) return res.status(401).send("無此郵箱號註冊訊息!");

  foundUser.comparePassword(req.body.password, (err, isMatch) => {
    if (err) return res.status(500).send(err);

    if (isMatch) {
      // 製作jwt
      const tokenobject = { _id: foundUser._id, email: foundUser.email };
      const token = jwt.sign(tokenobject, process.env.PASSPORT_SECRET);
      return res.send({
        msg: "成功登入",
        token: "JWT " + token,
        user: foundUser,
      });
    } else return res.status(401).send("密碼錯誤!");
  });
});

module.exports = router;

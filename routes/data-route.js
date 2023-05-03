const router = require("express").Router();
const Data = require("../models").data;
const dataValidation = require("../validation").dataValidation;

let TheUser;
router.use((req, res, next) => {
  // console.log("data route正在接受一個request...");
  next();
});

// 查看自己的所有數據
router.get("/owner/:_id", async (req, res) => {
  let { _id } = req.params;
  let foundData = await Data.find({ owner: _id })
    .populate("owner", ["userName", "email"])
    .exec();
  TheUser = _id;
  return res.send(foundData);
});

// 搜尋單一幣種資料
router.get("/token/:token", async (req, res) => {
  let { token } = req.params;
  try {
    let dataFound = await Data.find({ token, owner: TheUser })
      .populate("owner", ["userName"])
      .exec();
    return res.send(dataFound);
  } catch (e) {
    return res.status(500).send(e);
  }
});

router.get("/:_id", async (req, res) => {
  let { _id } = req.params;
  try {
    let dataFound = await Data.findOne({ _id })
      .populate("owner", ["userName"])
      .exec();
    return res.send(dataFound);
  } catch (e) {
    return res.status(500).send(e);
  }
});

// 新增幣種資料，若相同幣種則更新該幣種資料
router.post("/", async (req, res) => {
  let { error } = dataValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let { token, price, amount } = req.body;
  let owner = req.user._id;
  try {
    let foundData = await Data.findOne({ token, owner }).exec();
    if (foundData) {
      let _id = foundData._id;
      foundData.price.push(price);
      foundData.amount.push(amount);
      price = foundData.price;
      amount = foundData.amount;
      let updateData = await Data.findOneAndUpdate(
        { _id },
        { price, amount },
        { new: true, runValidators: true }
      ).exec();
      return res.send({
        msg: "已經更新成功",
        updateData,
      });
    } else {
      let newData = new Data({ token, price, amount, owner });
      let saveData = await newData.save();
      return res.send({
        msg: "儲存數據成功!",
        saveData,
      });
    }
  } catch (e) {
    return res.status(500).send(e);
  }
});

// 刪除整個幣種的資料
router.delete("/deleteToken/:token", async (req, res) => {
  let { token } = req.params;
  try {
    let dataFound = await Data.findOne({ token });
    if (!dataFound) {
      return res.status(404).send("查無此數據。。。");
    }
    await Data.deleteOne({ token }).exec();
    return res.send("成功刪除該數據。");
  } catch (e) {
    return res.status(500).send(e);
  }
});

// 刪除單筆價格及數量的資料
router.post("/deleteToken", async (req, res) => {
  let { _id, token, index } = req.body;
  try {
    let foundData = await Data.findOne({ token, owner: _id }).exec();
    foundData.price.splice(index, 1);
    foundData.amount.splice(index, 1);
    let newPrice = foundData.price;
    let newAmount = foundData.amount;
    let newData = await Data.findOneAndUpdate(
      { token, owner: _id },
      { price: newPrice, amount: newAmount },
      { new: true, runValidators: true }
    ).exec();
    return res.send(newData);
  } catch (e) {
    return res.status(500).send(e);
  }
});

router.delete("/:_id", async (req, res) => {
  let { _id } = req.params;
  try {
    let dataFound = await Data.findOne({ _id });
    if (!dataFound) {
      return res.status(404).send("查無此數據。。。");
    }
    await Data.deleteOne({ _id }).exec();
    return res.send("成功刪除該數據。");
  } catch (e) {
    return res.status(500).send(e);
  }
});

module.exports = router;

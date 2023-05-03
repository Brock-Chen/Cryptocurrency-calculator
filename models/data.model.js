const mongoose = require("mongoose");
const { Schema } = mongoose;

const dataSchema = new Schema({
  token: {
    type: String,
    required: true,
    maxlength: 30,
  },
  price: {
    type: [Number],
    required: true,
    maxlength: 20,
  },
  amount: {
    type: [Number],
    required: true,
    maxlength: 30,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  time: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Data", dataSchema);

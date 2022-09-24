const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true },
  password: { type: String, required: true },
  age: { type: Number },
  date: { type: String, required: true },
  currweight: { type: Number, required: true },
  initweight: { type: Number, required: true },
  goalweight: { type: Number, required: true },
  height: { type: Number, required: true },
  gender: { type: String },
  calories: { type: Number, default: 0 },
  friends: { type: Array, default: [] },
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;

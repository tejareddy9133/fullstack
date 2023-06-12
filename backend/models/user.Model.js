//mongoose

const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: String,
    email: String,
    pass: String,
  },
  {
    versionKey: false,
  }
);
const usermodel = mongoose.model("signup", userSchema);
module.exports = {
  usermodel,
};

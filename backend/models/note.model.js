//mongoose

const mongoose = require("mongoose");

const noteSchema = mongoose.Schema(
  {
    title: String,
    body: String,
    user: String,
    userID: String,
    category: String,
  },
  {
    versionKey: false,
  }
);
const notemodel = mongoose.model("notes", noteSchema);
module.exports = {
  notemodel,
};

const mongoose = require("mongoose");

const connection = mongoose.connect(
  "mongodb+srv://tejareddy9133:tejareddy9133@cluster0.o5ilbo2.mongodb.net/notes?retryWrites=true&w=majority"
);

module.exports = {
  connection,
};

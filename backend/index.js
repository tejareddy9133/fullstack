const express = require("express");
const app = express();
app.use(express.json());

const connection = require("./config/db");
const { userRouter } = require("./routes/user.routes");
const { noteRouter } = require("./routes/notes.routes");
app.use("/users", userRouter);
app.use("/notes", noteRouter);
app.listen(8080, async () => {
  try {
    await connection;
    console.log("db is connected");
  } catch (error) {
    console.log(error);
  }
});

const express = require("express");
const noteRouter = express.Router();
const { notemodel } = require("../models/note.model");
const { auth } = require("../middleware/auth.midddleware");
noteRouter.use(auth);
noteRouter.post("/create", async (req, res) => {
  try {
    const note = new notemodel(req.body);
    await note.save();
    res.json({ msg: "new user has been added " });
  } catch (error) {
    res.json({ err: error.message });
  }
});
//get
noteRouter.get("/", async (req, res) => {
  try {
    let collection = await notemodel.find({ userID: req.body.userID });
    res.send({ data: collection, msg: "data retrived" }).status(200);
  } catch (error) {
    res.send({ err: error.message });
  }
});

noteRouter.patch("/update/:noteID", async (req, res) => {
  const userIDUserDoc = req.body.userID;
  const { noteID } = req.params;
  try {
    const note = await notemodel.findOne({ _id: noteID });
    const userIDnoteDoc = note.userID;
    console.log(userIDUserDoc, userIDnoteDoc);
    if (userIDnoteDoc === userIDUserDoc) {
      await notemodel.findByIdAndUpdate({ _id: noteID }, req.body);
      res.json({ msg: `${note.title} has been added` });
    } else {
      res.json({ msg: "not Authorized" });
    }
  } catch (error) {
    res.json({ error: error });
  }
});
noteRouter.delete("/delete/:noteID", async (req, res) => {
  const userIDUserDoc = req.body.userID;
  const { noteID } = req.params;
  try {
    const note = await notemodel.findOne({ _id: noteID });
    const userIDnoteDoc = note.userID;
    console.log(userIDUserDoc, userIDnoteDoc);
    if (userIDnoteDoc === userIDUserDoc) {
      await notemodel.findByIdAndDelete({ _id: noteID });
      res.json({ msg: `${note.title} has been added` });
    } else {
      res.json({ msg: "not Authorized" });
    }
  } catch (error) {
    res.json({ error: error });
  }
});
module.exports = {
  noteRouter,
};

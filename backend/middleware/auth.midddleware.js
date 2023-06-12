const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    try {
      const decoded = jwt.verify(token, "reddy");
      if (decoded) {
        console.log(decoded);
        req.body.userID = decoded.userID;
        req.body.user = decoded.userName;
        next();
      } else {
        res.json({ msg: "not authorized" });
      }
    } catch (error) {
      res.json({ err: error.message });
    }
  } else {
    res.json({ msg: "no token" });
  }
};

module.exports = {
  auth,
};

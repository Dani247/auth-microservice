const express = require("express");
const router = express.Router();
const { addUser } = require("../controllers/User.controllers");

router.post("/register", async (req, res) => {
  console.log("adding", req);

  const user = await addUser(req.body);
  res.status(200).json({ msg: "user added", data: user });
});

router.post("/login", async (req, res) => {
  console.log("adding", req);

  const user = await addUser(req.body);
  res.status(200).json({ msg: "user added", data: user });
});

module.exports = router;

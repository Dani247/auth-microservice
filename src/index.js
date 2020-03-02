const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());

const userRouter = require("./routes/User.routes");

app.use("/auth", userRouter);

//create a server object:
app.listen(8080, err => {
  if (err) {
    console.error("ERROR... server didn't run");
    console.log(err);
  }
  console.log(`Server running...`);
});

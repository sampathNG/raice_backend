const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", async (req, res) => {
  try {
    console.log("hello world");
    res.send("hello world");
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
});
const routes = require("./controller/routes");
app.use(routes);
const mongoDBURL = require("./config.js").url;
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("connected to database");
  })
  .catch((error) => {
    console.log(error);
  });
const port = require("./config.js").port;
app.listen(port, console.log(`server running on http://localhost:${port}`));

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3999;

const db = require("./db");
const route = require("./routes");
const middleware = require("./middlewares");
const errHandle = require("./middlewares/errHandle");

db.connect();
middleware(app);
route(app);
app.use(errHandle);

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(PORT, () => {
  console.log("Server has started successfully!!!");
});

const api = require("./router/api.js");
module.exports = api;

/*
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello world!");
});

const listener = app.listen(process.env.APIPORT, process.env.LOCALHOST, () => {
  console.log("Express server is listening " + listener.address().address + ":" + listener.address().port);
});
*/
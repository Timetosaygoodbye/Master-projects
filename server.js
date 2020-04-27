const express = require("express");
const proxy = require("express-http-proxy");
const history = require("connect-history-api-fallback");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
// Establish a connection with the Mongo Database
// Get the username, password, host, and databse from the .env file
const mongoDB = ("mongodb+srv://"+
                 process.env.USERNAME+
                 ":"
                 +process.env.PASSWORD+
                 "@"
                 +process.env.HOST+
                 "/"
                 +process.env.DATABASE);
mongoose.connect(mongoDB, {useNewUrlParser: true, retryWrites: true, useUnifiedTopology: true});
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(history());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, Accept");
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  next();
});

const api = require("./server/server.js");
app.use("/api/", api);

app.use(express.static("client/dist"));
app.get("/", function(req, res) {
  res.sendFile(__dirname+"/client/dist/index.html");
});

const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});

/*
app.use("/api/", proxy(process.env.LOCALHOST + ":" + process.env.APIPORT));
app.use("/", proxy(process.env.LOCALHOST + ":" + process.env.WEBPORT));
const listener = app.listen(process.env.PORT, function() {
  console.log("App is listening on port " + listener.address().port);
});
*/
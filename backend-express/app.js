const livekit = require("livekit-server-sdk");

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

var app = express();
app.use(cors());

const createToken = ({ room, username }) => {
  const roomName = room;
  // const participantName = makeid(4);
  const participantName = username;
  if (!roomName || !participantName) {
    return null;
  }
  const at = new livekit.AccessToken("APIByJUHrwJ4xoF", "efh4ujO9mZXFGxcOAxO2QRCf6NOVLm6SrDXe5lW9IuxC", {
    identity: participantName,
  });
  at.addGrant({ roomJoin: true, room: roomName });

  return at.toJwt();
};
function makeid(length) {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/getToken", (req, res) => {
  const room = req.query.room;
  const username = req.query.username;
  if (!room) {
    return res.status(400).send({ error: "roomName is required" });
  }
  res.send(createToken({ room, username }));
});
app.use("/", (req, res) => {
  res.send("");
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

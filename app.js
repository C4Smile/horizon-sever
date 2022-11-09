const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const favicon = require("serve-favicon");

const app = express();

app.set("etag", "strong"); //browser caching of static assets should work properly

app.use(express.json({ limit: 1048576 }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

const {
  helmet,
  cors,
  limiter,
  // favicon,
  morgan,
} = require("./utils/middlewares");

// middle wares
// morgan
app.use(morgan.assignId);
app.use(morgan.structure);
app.use(morgan.dev);
// helmet
app.use(helmet);
// cors
app.use(cors);

//users
const user = require("./routes/user");
app.use("/api/user/", user);

// Handle 404 - Keep this as a last route
app.use(function (req, res) {
  res.status(404);
  res.sendFile(path.join(__dirname, "views", "404.html"));
});

module.exports = app;

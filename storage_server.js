/* eslint-disable @typescript-eslint/no-require-imports */
var liveServer = require("live-server");
var dotenv = require("dotenv");
dotenv.config();

var params = {
  port: process.env.STORAGE_PORT || 8080,
  host: process.env.STORAGE_HOST || "0.0.0.0",
  root: "./" + process.env.STORAGE_ROOT || "./public",
  open: false,
  file: "index.html",
  wait: 1000,
  logLevel: 2,
};

liveServer.start(params);

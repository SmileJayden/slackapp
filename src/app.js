"use strict";
exports.__esModule = true;
var slackapi_1 = require("./slackapi");
var dotenv = require("dotenv");
// get info from .env
dotenv.config();
console.log('hii', slackapi_1.sendMsg());

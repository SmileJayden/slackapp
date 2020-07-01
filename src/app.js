"use strict";
exports.__esModule = true;
var crawl_1 = require("./crawl");
var dotenv = require("dotenv");
// get info from .env
dotenv.config();
crawl_1.getWantedLinks().then(function (resumes) {
    console.log('resumes', resumes);
});

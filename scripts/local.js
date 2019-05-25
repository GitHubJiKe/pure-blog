const path = require("path");
const fs = require("fs");
const postsDirs = fs.readdirSync(path.resolve(__dirname, "../src/posts/"));
const recentlysDirs = fs.readdirSync(
  path.resolve(__dirname, "../src/recentlys/")
);
const { genJsons } = require("./util");

genJsons(postsDirs, "posts");
genJsons(recentlysDirs, "recentlys");
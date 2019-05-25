const path = require("path");
const fs = require("fs");
const execSync = require("child_process").execSync;
const process = require("process");
const showdown = require("showdown");
const readline = require("readline");
const util = require("util");

exports.makePostTeml = (postTitle, description, link) => {
  return {
    postTitle,
    description,
    link
  };
};

exports.readLineContent = function readLineContent(_path, cb) {
  let input = fs.createReadStream(_path);
  const rl = readline.createInterface({ input: input });
  let desc = "";
  let title = "";
  let lineNum = 0;
  rl.on("line", res => {
    if (res.startsWith("#") && lineNum < 2) {
      //标题
      title = res.split("#")[1].trim();
    }
    if (desc.length > 300) {
      //desc 最大长度 300
      rl.close();
    }
    if (res && !res.startsWith("#")) {
      if (res.startsWith(">")) {
        desc += res.split(">")[1].trim();
      } else {
        desc += res.trim();
      }
    }
  });
  rl.on("close", () => {
    let obj = exports.makePostTeml(title, desc, "");
    cb(null, obj);
  });
  lineNum++;
};

exports.genJsons = async function genJsons(dirs, type) {
  let arr = [];
  const readLineContentP = util.promisify(exports.readLineContent);
  for (let index = 0; index < dirs.length; index++) {
    const p = dirs[index];
    let finalPath = path.resolve(__dirname, `../src/${type}/${p}`);
    let obj = await readLineContentP(finalPath);
    obj.link = `/${type}/${p.split(".md")[0]}.html`;
    arr.push(obj);
  }
  fs.writeFileSync(
    path.resolve(__dirname, `../src/jsons/${type}.json`),
    JSON.stringify(arr)
  );
};

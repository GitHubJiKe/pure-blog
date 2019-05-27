const path = require("path");
const fs = require("fs");

exports.readLineContent = function readLineContent(_path, cb) {
  const postContent = fs.readFileSync(_path).toString();
  let obj = {};
  postContent
    .split("---")[1]
    .split("\n")
    .forEach(v => {
      if (v) {
        let [key, value] = v.split(":");
        if (key === "tags") {
          obj[key] = value.split(",");
        } else {
          obj[key] = value;
        }
      }
    });
  return obj;
};

exports.genJsons = async function genJsons(dirs, type) {
  let arr = [];
  for (let index = 0; index < dirs.length; index++) {
    const p = dirs[index];
    let finalPath = path.resolve(__dirname, `../src/${type}/${p}`);
    let obj = await exports.readLineContent(finalPath);
    obj.link = `/${type}/${p.split(".md")[0]}.html`;
    arr.push(obj);
  }
  fs.writeFileSync(
    path.resolve(__dirname, `../src/jsons/${type}.js`),
    `const ${type} = ${JSON.stringify(arr)}; export default ${type};`
  );
};

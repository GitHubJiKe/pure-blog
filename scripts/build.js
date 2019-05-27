const path = require("path");
const fs = require("fs");
const execSync = require("child_process").execSync;
const process = require("process");
const showdown = require("showdown");
const { genJsons } = require("./util");
const postsDirs = fs.readdirSync(path.resolve(__dirname, "../src/posts/"));
const recentlysDirs = fs.readdirSync(
  path.resolve(__dirname, "../src/recentlys/")
);
const convert = new showdown.Converter();

function buildBlog(blogName) {
  console.log("开始构建博客工程");
  let buildPath = path.resolve(__dirname, "../build");
  let blogPath = getBlogPath(blogName);
  execSync(`rm -rf ${buildPath}`);
  execSync(`rm -rf ${blogPath}`);
  execSync("yarn build");
  //两秒之后，确保编译已完成执行后续操作
  setTimeout(() => {
    copyBolg(blogName);
  }, 2000);
}

function copyBolg(blogName) {
  console.log("开始新建blog目录，并拷贝项目文件");
  execSync(
    `cp -r ${path.resolve(__dirname, `../build`)} ${path.resolve(
      __dirname,
      `../${blogName}`
    )} `
  );
  //两秒之后，执行copy等操作
  setTimeout(() => {
    makeDirPostsAndRecently(blogName);
  }, 2000);
}

function makeDirPostsAndRecently(blogName) {
  console.log("开始转化markdown为html文件到指定目录");
  fs.mkdirSync(path.resolve(__dirname, `../${blogName}/posts`));
  fs.mkdirSync(path.resolve(__dirname, `../${blogName}/recentlys`));
  //先创建文件夹，再生成文件到指定目录
  transferMDToHtml(blogName, postsDirs, "posts");
  transferMDToHtml(blogName, recentlysDirs, "recentlys");
  copyPictures(blogName);
  setTimeout(() => {
    publishBlog(blogName);
  }, 3000);
}

function copyPictures(blogName) {
  execSync(
    `cp -r ${path.resolve(__dirname, `../src/pictures`)} ${path.resolve(
      __dirname,
      `../${blogName}/pictures`
    )} `
  );
}

function getBodyContent(html, title) {
  let content = fs
    .readFileSync(path.resolve(__dirname, "./demo.html"))
    .toString();
  const [part1, part2] = content.split("<title>");
  const [part3, part4] = part2.split("<body>");
  return part1 + "<title>" + title + part3 + html + part4;
}

function transferMDToHtml(blogName, dirs, type) {
  dirs.forEach(p => {
    const fileName = p.split(".md")[0];
    const postContent = fs
      .readFileSync(path.resolve(__dirname, `../src/${type}/${p}`))
      .toString();

    const postHtml = convert.makeHtml(postContent.split("---")[2]);
    fs.writeFileSync(
      path.resolve(__dirname, `../${blogName}/${type}/${fileName}.html`),
      getBodyContent(postHtml, fileName)
    );
  });
}

genJsons(recentlysDirs, "recentlys");
genJsons(postsDirs, "posts");

buildBlog("peter.yuan");

function getBlogPath(blogName) {
  return path.resolve(__dirname, `../${blogName}/`);
}

function publishBlog(blogName) {
  let blogPath = getBlogPath(blogName);
  let nowJson = { version: 2 };
  fs.writeFileSync(`${blogPath}/now.json`, JSON.stringify(nowJson));
  //执行发布
  setTimeout(() => {
    console.log("所有步骤结束，开始自动发布");
    console.log("存在now.json:", fs.existsSync(`${blogPath}/now.json`));
    process.chdir(blogPath);
    console.log(process.cwd());
    execSync(`now`);
  }, 2000);
}

const path = require("path");

const config = {
  test: {
    build: "build:test",
    zipName: "cyberspace-administration-test.zip",
  },
  master: {
    build: "build:master",
    zipName: "cyberspace-administration.zip",
  },
};

Object.keys(config).forEach((env) => {
  const baseCofig = {
    zipName: `${path.basename(process.cwd())}-${env}.zip`, // zip 压缩后的临时文件名
    files: [
      "/dist/css",
      "/dist/img",
      "/dist/js",
      "/dist/favicon.ico",
      "/dist/index.html",
    ], // 需要压缩的文件夹和文件
    pm2Cmd: "/usr/local/node/bin/pm2", // 服务器pm2命令位置
  };
  config[env] = { ...baseCofig, ...config[env] };
});
config.default = config.master;
module.exports = config;

//用来放数据源的获取和更新
const axios = require("axios");
const compareVersions = require("compare-versions");
const terminalLink = require('terminal-link')
const color = require('cli-color')

module.exports = async (v) => {
  //拿到所有的Node版本
  const { data } = await axios.get("https://nodejs.org/dist/index.json");

  return data
    .filter((node) => {
      const cp = v
        ? compareVersions(node.version, "v" + v + ".0.0") >= 0
        : true;
      return node.lts && cp;
    })
    .map((it) => {
      //踢出file这个字段
      const { files, ...rest } = it;
      const doc=color.yellow(terminalLink('API',`https://nodejs.org/dist/${it.version}/docs/api/documentation.html`))
      return { ...rest,doc };
    });
};

"use strict";

const path = require('path');
const fs = require('fs');
const packageJsonPath = path.resolve(__dirname, '../package.json');
const apiJsonPath = path.resolve(__dirname, './api.json');

try {
  const packageName = require(packageJsonPath).name;
  let json = require(apiJsonPath).children[0];

  json = {
    name: packageName,
    children: json.children,
    groups: json.groups
  };

  const str = JSON.stringify(json) + '\n';
  fs.writeFileSync(apiJsonPath, str);
  console.log('Shaped the doc/api.json file.');
} catch (e) {
  console.error('Unable to shape the api.json. The file probably has an incorrect format or doesn\'t exist.');
  console.error(e.message);
}

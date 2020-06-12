const fs = require ('fs');

const data = fs.readFileSync('package.json');
const content = JSON.parse(data.toString());
content.peerDependencies = content.peerDependencies || {};
for (let p of Object.getOwnPropertyNames(content.devDependencies)) {
  if (p.startsWith('@aurelia-ux')) {
    content.peerDependencies[p] = content.devDependencies[p];
  }
};
fs.writeFileSync('package.json', JSON.stringify(content, null, 2));

"use strict";

const path = require('path');
const fs = require('fs');
const packageJsonPath = path.resolve(__dirname, '../package.json');

try {
  const packageName = require(packageJsonPath).name;
  const dtsPath = path.resolve(__dirname, `../dist/doc-temp/${packageName}.d.ts`);
  let defs = fs.readFileSync(dtsPath).toString();

  // aggregate external imports
  const packages = {};
  const importRegex = /^\s*import\s+\{([^}]+)\}\s*from\s*'([\w|-]+)'/gm;
  let importMatch  = importRegex.exec(defs);
  while (importMatch) {
    const packageName = importMatch[2];
    const imports = packages[packageName] || (packages[packageName] = []);
    const bindings = importMatch[1].split(',').map(x => x.trim());
    for (let binding of bindings) {
      if (imports.indexOf(binding) === -1) {
        imports.push(binding);
      }
    }
    importMatch = importRegex.exec(defs);
  }

  // remove leading declare module
  defs = defs.replace(/^declare module ".*" \{/, '');
  // remove "} declare module {"
  defs = defs.replace(/\}\r?\ndeclare module ".*" \{/g, '');
  // remove closing "}"
  defs = defs.replace(/\}\r?\n$/, '');
  // remove imports
  defs = defs.replace(/^\s+import.*;$/gm, '');
  // remove "export *"
  defs = defs.replace(/^\s+export \*.*;$/gm, '');

  // write imports
  for (let packageName in packages) {
    if (packages.hasOwnProperty(packageName)) {
      const imports = packages[packageName];
      defs = `import {${imports.sort()}} from '${packageName}';\n` + defs;
    }
  }

  fs.writeFileSync(dtsPath, defs);
  console.log(`Shaped the dist/doc-temp/${packageName}.d.ts file.`);
} catch (e) {
  console.error(`Unable to shape the .d.ts file.`);
  console.error(e.message);
}

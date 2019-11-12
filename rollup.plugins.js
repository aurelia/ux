import { dirname } from 'path';
import * as fse from 'fs-extra';
import { createFilter } from 'rollup-pluginutils';
import { minify } from 'html-minifier';
import { exec } from 'child_process';

/**
 * @param {{ dir: string }} options
 * @returns {import('rollup').Plugin}
 */
export function typings(options = {}) {
  return {
    name: 'rollup-plugin-typings-aurelia-ux',
    buildEnd: function(error) {
      if (error) {
        return;
      }
      exec(`npm run build:typings ${options.dir ? ` -- --declarationDir ${options.dir}` : ''}`, (error) => {
        if (error) {
          console.log('Failure building typings:', error.toString());
        }
      });
    }
  }
}

/**
 * @param {{ verbose: boolean, files: { from: string, to: string }[] }} options
 * @returns {import('rollup').Plugin}
 */
export function copy (options = {}) {
  const { verbose = false, files = [] } = options;
  const name = 'rollup-plugin-copy-fork-aurelia';

  return {
    name: name,
    buildEnd: function(error) {
      if (error) {
        return;
      }
      for (const { from, to } of files) {
        const targetDir = dirname(to);
        fse
          .ensureDir(targetDir)
          .then(() => 
            fse
              .copy(from, to)
              .then(
                () => {
                  if (verbose) {
                    success(name, from, to);
                  }
                },
                ex => {
                  fatal(name, from, to, ex);
                }
              )
          );
      }
    }
  };
}

function success (name, src, dest) {
  console.log('(' + name + ") '" + src + "' -> '" + dest + "' (" + '\u2714' + ')');
}

function fatal (name, src, dest, err) {
  console.error('(' + name + ") '" + src + "' -> '" + dest + "' (" + '\u2718' + ')');
  console.error();
  console.error('    ' + err);
  process.exit(err.errno);
}

const OPTIONS_HTML_MINIFIER = {
  collapseWhitespace: true,
  collapseBooleanAttributes: true,
  conservativeCollapse: true
};

/**
 * @param {{ include: string | RegExp; exclude: string | RegExp }} options
 * @returns {import('rollup').Plugin}
 */
export function html(options = {}) {
	if (!options.include) {
		options.include = '**/*.html'
	}

	const filter = createFilter(options.include, options.exclude);

	return {
		name: 'rollup-plugin-html-fork-aurelia',

		transform(code, id) {

			if (filter(id)) {
				const x = {
          code: `export default ${JSON.stringify(minify(code, OPTIONS_HTML_MINIFIER))};`,
          // code: `export default ${JSON.stringify(code)};`,
					map: { mappings: '' }
				};

				return x;
			}
		}
	};
}

/**
 * @param {string[]} fileNames
 * @param {string[]} moduleNames
 */
export function buildCopyInstruction(fileNames, moduleNames, targetDir) {
  const files = [];
  moduleNames.forEach(moduleName => {
    fileNames.forEach(fileName => {
      files.push({ from: `src/${fileName}`, to: `${targetDir}/${moduleName}/${fileName}` });
    });
  });
  return files;
}

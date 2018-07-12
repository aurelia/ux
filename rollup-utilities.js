import typescript from 'rollup-plugin-typescript2';
import * as fse from 'fs-extra';
import html from 'rollup-plugin-html';
import { createFilter } from 'rollup-pluginutils';
import csso from 'csso';

/**
 * @param {string | string[]} cssFiles CSS files path to be copied
 * @param {string | string[]} format dist format 'es2015', 'amd', 'commonjs', 'native-modules'
 * @return { { from: string; to: string; } }
 */
export function configCopyCssPath(cssFiles, format) {
  cssFiles = Array.isArray(cssFiles) ? cssFiles : [cssFiles];
  format = Array.isArray(format) ? format : [format];
  return cssFiles
    .reduce(/** @param {{ from: string; to: string }[]} cfg */(cfg, css) =>
      cfg.concat(format.map(f => ({ from: `src/${css}`, to: `dist/${f}/${css}` })))
  , []);
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

var copyTimer;

/**
 * @param {{ verbose: boolean, files: { from: string, to: string }[] }} options
 */
function copy (options = {}) {
  const { verbose = false, files = [] } = options;
  const name = 'rollup-plugin-copy-fork-aurelia';

  return {
    name: name,
    onwrite: function (object) {
      clearTimeout(copyTimer);
      copyTimer = setTimeout(() => {
        for (const { from, to } of files) {
          fse.copy(from, to)
            .then(function() {
              if (verbose) {
                success(name, from, to);
              }
            })
            .catch(function(ex) {
              fatal(name, from, to, ex);
            });
        }
      }, 1000);
    }
  };
}

/**
 * Commonly shared config for all UX elements
 * @param {string} elementName
 * @param {string | string[]} cssFiles
 * @param {boolean} isProduction
 */
export function configRollup(elementName, cssFiles, isProduction) {
  return [{
    input: 'src/index.ts',
    output: {
      file: 'dist/es2015/index.js',
      format: 'es'
    },
    external: 'tslib',
    plugins: [
      typescript({
        useTsconfigDeclarationDir: true,
        tsconfigOverride: {
          compilerOptions: {
            target: 'es2015',
            declarationDir: 'dist/types',
            importHelpers: true
          }
        },
        cacheRoot: '.rollupcache'
      }),
      copy({
        verbose: true,
        files: configCopyCssPath(cssFiles, 'es2015')
      }),
      html({
        include: '**/*.html',
        htmlMinifierOptions: {
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          conservativeCollapse: true,
        }
      }),
      css(),
    ]
  }].concat(!isProduction
    ? []
    : [{
      input: 'src/index.ts',
      output: [
        { file: 'dist/commonjs/index.js', format: 'cjs' },
        { file: 'dist/amd/index.js', format: 'amd', amd: { id: `@aurelia-ux/${elementName}` } },
        { file: 'dist/native-modules/index.js', format: 'es' }
      ],
      external: 'tslib',
      plugins: [
        typescript({
          tsconfigOverride: {
            compilerOptions: {
              declaration: false,
              declarationDir: null,
              importHelpers: true
            }
          },
          cacheRoot: '.rollupcache',
        }),
        copy({
          verbose: true,
          files: configCopyCssPath(cssFiles, ['amd', 'commonjs', 'native-modules'])
        }),
        html({
          include: '**/*.html',
          htmlMinifierOptions: {
            collapseWhitespace: true,
            collapseBooleanAttributes: true,
            conservativeCollapse: true,
          }
        }),
        css(),
      ]
    }]
  );
}


export default function css () {
  const filter = createFilter(['**/*.css'], []);

  return {
    name: 'css',
    transform (code, id) {
      if (!filter(id)) {
        return;
      }

      return {
        code: 'export default ' + JSON.stringify(csso.minify(code, {
          restructure: false,
          debug: false,
          sourceMap: false
        }).css),
        map: { mappings: '' }
      };
    }
  };
}

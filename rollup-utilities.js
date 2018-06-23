/**
 * @param {string[]} cssFiles CSS files path to be copied
 * @param {string | string[]} format dist format 'es2015', 'amd', 'commonjs', 'native-modules'
 * @return { { from: string; to: string; } }
 */
export function configCopyCssPath(cssFiles, format) {
  format = Array.isArray(format) ? format : [format];
  return cssFiles
    .reduce((cfg, css) =>
      cfg.concat(format.map(f => ({ from: `src/${css}`, to: `dist/${f}/${css}` })))
  , []);
}

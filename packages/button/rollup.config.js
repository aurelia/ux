import typescript from 'rollup-plugin-typescript2';
import packageJson from './package.json';
import { copy, html } from '../../rollup.plugins'

const FILE_NAME_ENTRY = 'src/index.ts';
const FILE_NAME_OUTPUT = 'index.js';
const OPTIONS_HTML_MINIFIER = {
  collapseWhitespace: true,
  collapseBooleanAttributes: true,
  conservativeCollapse: true
};

const TARGET_DIR = process.env.target_dir || 'dist';

/**
 * @param {import('rollup').RollupOptions} commandLineArgs
 */
export default ([
  {
    input: FILE_NAME_ENTRY,
    output: {
      file: `${TARGET_DIR}/es2015/${FILE_NAME_OUTPUT}`,
      format: 'es'
    },
    plugins: [
      typescript({
        useTsconfigDeclarationDir: true,
        tsconfigOverride: {
          compilerOptions: {
            target: 'es2015'
          }
        },
        cacheRoot: '.rollupcache'
      }),
      copy({
        verbose: true,
        files: [
          { from: 'src/ux-button.css', to: `${TARGET_DIR}/es2015/ux-button.css` }
        ]
      }),
      html({
        htmlMinifierOptions: OPTIONS_HTML_MINIFIER
      })
    ]
  }
].concat(process.env.BUILD === 'production'
  ? [{
    input: FILE_NAME_ENTRY,
    output: [
      { file: `${TARGET_DIR}/commonjs/${FILE_NAME_OUTPUT}`,         format: 'cjs' },
      { file: `${TARGET_DIR}/amd/${FILE_NAME_OUTPUT}`,              format: 'amd', amd: { id: packageJson.name } },
      { file: `${TARGET_DIR}/native-modules/${FILE_NAME_OUTPUT}`,   format: 'es' },
      { file: `${TARGET_DIR}/system/${FILE_NAME_OUTPUT}`,           format: 'system' }
    ],
    plugins: [
      typescript({
        tsconfigOverride: {
          compilerOptions: {
            declaration: false,
            declarationDir: null
          }
        },
        cacheRoot: '.rollupcache',
      }),
      copy({
        verbose: true,
        files: [
          { from: 'src/ux-button.css', to: `${TARGET_DIR}/commonjs/ux-button.css` },
          { from: 'src/ux-button.css', to: `${TARGET_DIR}/amd/ux-button.css` },
          { from: 'src/ux-button.css', to: `${TARGET_DIR}/native-modules/ux-button.css` },
        ]
      }),
      html({
        htmlMinifierOptions: OPTIONS_HTML_MINIFIER
      })
    ]
  }]
  : []
));

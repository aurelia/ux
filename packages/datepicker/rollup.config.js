import typescript from 'rollup-plugin-typescript2';
import packageJson from './package.json';
import { copy, html, typings, buildCopyInstruction } from '../../rollup.plugins'

const FILE_NAME_ENTRY = 'src/index.ts';
const FILE_NAME_OUTPUT = 'index.js';
const OPTIONS_HTML_MINIFIER = {
  collapseWhitespace: true,
  collapseBooleanAttributes: true,
  conservativeCollapse: true
};
const FILE_NAME_CSS = [
  'ux-calendar.css',
  'ux-year-list.css',
  'ux-datepicker.css',
  'ux-picker-dialog.css',
];
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
        files: buildCopyInstruction(FILE_NAME_CSS, ['es2015'], TARGET_DIR)
      }),
      html({
        htmlMinifierOptions: OPTIONS_HTML_MINIFIER
      }),
      typings({
        dir: `${TARGET_DIR}/types`
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
        files: buildCopyInstruction(FILE_NAME_CSS, ['commonjs', 'amd', 'native-modules'], TARGET_DIR)
      }),
      html({
        htmlMinifierOptions: OPTIONS_HTML_MINIFIER
      })
    ]
  }]
  : []
));

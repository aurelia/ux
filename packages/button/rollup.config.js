import typescript from 'rollup-plugin-typescript2';
import packageJson from './package.json';
import { copy, html, typings, buildCopyInstruction } from '../../rollup.plugins'

const FILE_NAME_ENTRY = 'src/index.ts';
const FILE_NAME_OUTPUT = 'index.js';
const FILE_NAME_CSS = [
  'ux-button.css'
];
const TARGET_DIR = process.env.target_dir || 'dist';

export default ([
  {
    input: FILE_NAME_ENTRY,
    output: { file: `${TARGET_DIR}/es2015/${FILE_NAME_OUTPUT}`,   sourcemap: true, format: 'es' },
    plugins: [
      typescript({
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
      html(),
      typings({
        dir: `${TARGET_DIR}/types`
      })
    ]
  }
].concat(process.env.BUILD === 'production'
  ? [{
    input: FILE_NAME_ENTRY,
    output: [
      { file: `${TARGET_DIR}/commonjs/${FILE_NAME_OUTPUT}`,       sourcemap: true, format: 'cjs' },
      { file: `${TARGET_DIR}/amd/${FILE_NAME_OUTPUT}`,            sourcemap: true, format: 'amd', amd: { id: packageJson.name } },
      { file: `${TARGET_DIR}/native-modules/${FILE_NAME_OUTPUT}`, sourcemap: true, format: 'es' },
    ],
    plugins: [
      typescript({
        cacheRoot: '.rollupcache',
      }),
      copy({
        verbose: true,
        files: buildCopyInstruction(FILE_NAME_CSS, ['commonjs', 'amd', 'native-modules'], TARGET_DIR)
      }),
      html()
    ]
  }]
  : []
));

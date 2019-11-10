import typescript from 'rollup-plugin-typescript2';
import packageJson from './package.json';
import { copy } from '../../rollup.plugins';

const FILE_NAME_ENTRY = 'src/index.ts';
const FILE_NAME_OUTPUT = 'index.js';
const OPTIONS_HTML_MINIFIER = {
  collapseWhitespace: true,
  collapseBooleanAttributes: true,
  conservativeCollapse: true
};

const TARGET_DIR = process.env.target_dir || 'dist';

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
          { from: 'src/styles/normalize.css',     to: `${TARGET_DIR}/es2015/styles/normalize.css` },
          { from: 'src/effects/paper-ripple.css', to: `${TARGET_DIR}/es2015/effects/paper-ripple.css` },
        ]
      })
    ]
  }
].concat(process.env.BUILD === 'production'
  ? [{
    input: FILE_NAME_ENTRY,
    output: [
      { file: `${TARGET_DIR}/commonjs/${FILE_NAME_OUTPUT}`,        format: 'cjs' },
      { file: `${TARGET_DIR}/amd/${FILE_NAME_OUTPUT}`,             format: 'amd', amd: { id: packageJson.name } },
      { file: `${TARGET_DIR}/native-modules/${FILE_NAME_OUTPUT}`,  format: 'es' }
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
          { from: 'src/styles/normalize.css',     to: `${TARGET_DIR}/commonjs/styles/normalize.css` },
          { from: 'src/styles/normalize.css',     to: `${TARGET_DIR}/amd/styles/normalize.css` },
          { from: 'src/styles/normalize.css',     to: `${TARGET_DIR}/native-modules/styles/normalize.css` },
          { from: 'src/effects/paper-ripple.css', to: `${TARGET_DIR}/commonjs/effects/paper-ripple.css` },
          { from: 'src/effects/paper-ripple.css', to: `${TARGET_DIR}/amd/effects/paper-ripple.css` },
          { from: 'src/effects/paper-ripple.css', to: `${TARGET_DIR}/native-modules/effects/paper-ripple.css` },
        ]
      })
    ]
  }]
  : []
));

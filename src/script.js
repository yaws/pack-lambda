/**
 * Imports
 */

// core
import path from 'path'
import {exec} from 'child_process'

// utils
import zipDir from '@yaws/zip-dir'

const BIN = path.resolve(path.join(__dirname, '../node_modules/.bin'))

function * script (dir, env, opts) {
  env = env || {}
  opts = opts || {}

  opts.src = opts.src || 'src'
  opts.entry = opts.entry || 'index.js' // inside src
  opts.out = opts.out || 'lib'

  // function entry
  env.FUNCTION_ENTRY = path.join(opts.out, opts.entry)

  // lambda entry
  opts.lambda = opts.lambda || 'lambda.js'

  yield `${BIN}/babel ${opts.src} --out-dir ${opts.out}`

  yield `cd ${dir}
  ${BIN}/npm install`

  yield `cd ${dir}
  ${BIN}/npm install @f/to-promise @yaws/env-json babel-polyfill`

  return zipDir(contents)

  function contents (zip) {
    // shim
    zip.append(JSON.stringify(env), '.env.json')
    zip.file(path.join(__dirname, 'lambda.js'), opts.lambda)

    // node modules
    zip.directory(path.join(dir, 'node_modules'), 'node_modules')

    // code
    zip.directory(path.join(dir, opts.out), opts.out)
  }
}

export default script

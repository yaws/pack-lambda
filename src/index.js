/**
 * Imports
 */

// core
import path from 'path'
import {exec} from 'child_process'

// modules
import co from 'co'

// utils
import zipDir from '@yaws/zip-dir'
import toPromise from '@f/thunk-to-promise'

const BIN = path.resolve(path.join(__dirname, '../node_modules/.bin'))

/**
 * pack-lambda
 */

let packLambda = co.wrap(function * (dir, env, opts) {
  env = env || {}
  opts = opts || {}

  opts.src = opts.src || 'src'
  opts.entry = opts.entry || 'index.js' // inside src
  opts.out = opts.out || 'lib'

  // function entry
  env.FUNCTION_ENTRY = path.join(opts.out, opts.entry)

  // lambda entry
  opts.lambda = opts.lambda || 'lambda.js'

  yield [babel(path.join(dir, opts.src), path.join(dir, opts.out)), node_modules(dir)]

  return zipDir(contents)

  function contents (zip) {
    // shim
    zip.append(JSON.stringify(env), '.env.json')
    zip.file(path.join(__dirname, 'lambda.js'), opts.lambda)

    // node modules
    zip.directory(path.join(dir, 'node_modules'), 'node_modules')

    // node modules required by shim
    zip.directory(path.resolve(__dirname + '/../node_modules/@f/to-promise'), 'node_modules/@f/to-promise')
    zip.directory(path.resolve(__dirname + '/../node_modules/@yaws/env-json'), 'node_modules/@yaws/env-json')
    zip.directory(path.resolve(__dirname + '/../node_modules/babel-polyfill'), 'node_modules/babel-polyfill')

    // code
    zip.directory(path.join(dir, opts.out), opts.out)
  }
})

function babel (src, out) {
  return toPromise(exec.bind(exec, `${BIN}/babel ${src} --out-dir ${out}`))
}

function node_modules (dir) {
  return toPromise(exec.bind(exec, `cd ${dir}; ${BIN}/npm install`))
}


/**
 * Exports
 */

export default packLambda

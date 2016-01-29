/**
 * Imports
 */

import test from 'tape'
import path from 'path'
import Zip from 'jszip'

import packScript from '../src/script'
import packLambda from '../src'


/**
 * Tests
 */

const BIN = process.cwd() + '/node_modules/.bin'
const CODE = __dirname + '/code'

test('should yield shell commands', (t) => {

  let it = packScript(CODE)

  t.equal(it.next().value, `${BIN}/babel src --out-dir lib`)

  t.equal(it.next().value, `cd ${CODE}
  ${BIN}/npm install`)

  t.equal(it.next().value, `cd ${CODE}
  ${BIN}/npm install @f/to-promise @yaws/env-json babel-polyfill`)

  t.end()
})

test('should pack lambda', (t) => {
  packLambda(__dirname + '/code').then(function (zipped) {
    let zip = new Zip(zipped, {compression: 'DEFLATE'})
    t.ok(zip.file('lambda.js').asText())
    t.equal(zip.file('.env.json').asText(), '{"FUNCTION_ENTRY":"lib/index.js"}')
    t.end()
  }).catch(function (err) {
    console.error(err.stack)
  })
})

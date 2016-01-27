require('@yaws/env-json')()
require('babel-polyfill')

let func = require(process.env.FUNCTION_ENTRY)
let toPromise = require('@f/toPromise')

exports.handler = function (event, context) {
  toPromise(func(event)).then(context.succeed, context.fail)
}

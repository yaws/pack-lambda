require('@yaws/env-json')()
require('babel-polyfill')

let toPromise = require('@f/toPromise')
let func = require(process.env.FUNCTION_ENTRY)

exports.handler = function (event, context) {
  toPromise(func(event)).then(context.succeed, context.fail)
}

/**
 * Imports
 */

import test from 'tape'
import packLambda from '../src'

/**
 * Tests
 */

test('should pack code', (t) => {
  packLambda(__dirname + '/code').then(function () {
    console.log('finished')
  }).catch(function (err) {
    console.log('err', err)
  })
})

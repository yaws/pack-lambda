/**
 * Imports
 */

import compose from '@f/compose'
import floMap from 'flo-map'
import prosh from 'prosh'

import packScript from './script'

/**
 * pack-lambda
 */

let floShell = floMap(prosh)
let packLambda = compose(floShell, packScript)

/**
 * Exports
 */

export default packLambda

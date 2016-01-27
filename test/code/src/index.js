import defaults from '@f/defaults'

function main (event) {
  return defaults(event, {payload: 'foo'})
}

export default main

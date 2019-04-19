const pkgConf = require('pkg-conf')
const getopts = require('getopts')
const dotProp = require('dot-prop')
const merge = require('@ianwalter/merge')

module.exports = function cli ({ name, opts }) {
  // Create the configuration object that will be returned.
  const config = {}

  // If a name is specified, attempt to populate config with any data specified
  // in the closest package.json with that name as the property key.
  if (name) {
    Object.assign(config, pkgConf.sync(name))
  }

  //
  let cliOpts = getopts(process.argv.slice(2), opts)

  //
  cliOpts = Object.entries(cliOpts).reduce(
    (acc, [key, val]) => {
      if (key.includes('.')) {
        dotProp.set(acc, key, val)
        delete acc[key]
      }
      return acc
    },
    cliOpts
  )

  // Add/overwrite configuration data with options passed through command-line
  // flags.
  merge(config, cliOpts)

  // Return the populated configuration object.
  return config
}

const pkgConf = require('pkg-conf')
const getopts = require('getopts')

module.exports = function cli ({ name, opts }) {
  // Create the configuration object that will be returned.
  const config = {}

  // If a name is specified, attempt to populate config with any data specified
  // in the closest package.json with that name as the property key.
  if (name) {
    Object.assign(config, pkgConf.sync(name))
  }

  // Add/overwrite configuration data with options passed through command-line
  // flags.
  Object.assign(config, getopts(process.argv.slice(2), opts))

  // Return the populated configuration object.
  return config
}

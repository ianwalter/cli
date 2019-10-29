const readPkgUp = require('read-pkg-up')
const getopts = require('getopts')
const dotProp = require('dot-prop')
const merge = require('@ianwalter/merge')

module.exports = function cli ({ name, opts }) {
  // Extract the curren't package's package.json so that it can be included in
  // the returned config object.
  const { packageJson } = readPkgUp.sync()

  // Create the configuration object that will be returned to the CLI.
  const config = { packageJson, ...(packageJson[name] || {}) }

  // Collect any command-line arguments passed to the process.
  let cliOpts = getopts(process.argv.slice(2), opts)

  // Reduce any command-line arguments containing dots into a nested structure.
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

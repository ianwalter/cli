const util = require('util')
const readPkgUp = require('read-pkg-up')
const getopts = require('getopts')
const dotProp = require('dot-prop')
const merge = require('@ianwalter/merge')
const { oneLine } = require('common-tags')
const { md } = require('@ianwalter/print')

module.exports = function cli ({ name, description, usage, options }) {
  // Extract the curren't package's package.json so that it can be included in
  // the returned config object.
  const { packageJson } = readPkgUp.sync() || {}

  // Create the configuration object that will be returned to the CLI.
  const config = { packageJson, ...(packageJson && packageJson[name]) }

  // Convert cli config to getopts config.
  const opts = { alias: {}, default: {} }
  Object.entries(options).forEach(([key, option]) => {
    opts.alias[key] = option.alias

    // Default to package.json config or option config.
    opts.default[key] = dotProp.get(config, key) || option.default
  })

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

  if (config.help) {
    config.help = `# ${name}\n`

    if (description) {
      config.help += `${description}\n\n`
    }

    if (usage) {
      config.help += `## Usage\n${usage}\n\n`
    }

    if (options) {
      config.help += '## Options\n'
      config.help += Object.entries(options).reduce((acc, [key, option]) => {
        const alias = option.alias ? `, --${option.alias}` : ''
        const def = option.default !== undefined
          ? ` (default: \`${util.inspect(option.default)}\`)`
          : ''
        const description = oneLine(option.description)
        return acc + `* \`--${key}${alias}\`  ${description}${def}\n`
      }, '')
    }

    // Format the help markdown text with marked.
    config.help = md(config.help) + '\n'
  }

  // Return the populated configuration object.
  return config
}

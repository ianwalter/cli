#!/usr/bin/env node

const { print } = require('@ianwalter/print')
const cli = require('../..')

const config = cli({
  name: 'exampleCli',
  description: 'Just an example CLI',
  usage: 'example [options]',
  options: {
    concurrency: {
      alias: 'c',
      description: `
        The number of CPU cores to use when executing the application. The value
        must be an integer between 1 and 4
      `,
      default: 1
    }
  }
})

config.packageJson = { name: config.packageJson && config.packageJson.name }

if (config.help) {
  print.info(config.help)
} else {
  print.log(config)
}

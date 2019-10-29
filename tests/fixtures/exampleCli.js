#!/usr/bin/env node

const cli = require('../..')

const config = cli({
  name: 'exampleCli',
  options: {
    concurrency: {
      alias: 'c',
      description: `
        The number of CPU cores to use when executing the application. The value
        must be an integer between 1 and 4.
      `,
      default: 1
    }
  }
})

config.$package = { name: config.$package.name }

console.log(config)

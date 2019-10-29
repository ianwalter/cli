#!/usr/bin/env node

const cli = require('../..')

const config = cli({
  name: 'exampleCli',
  opts: { alias: { concurrency: 'c' } }
})

config.packageJson = { name: config.packageJson.name }

console.log(config)

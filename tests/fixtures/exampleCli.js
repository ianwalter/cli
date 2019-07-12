#!/usr/bin/env node

const cli = require('../..')

const config = cli({
  name: 'exampleCli',
  opts: { alias: { concurrency: 'c' } }
})

config.$package = { name: config.$package.name }

console.log(config)

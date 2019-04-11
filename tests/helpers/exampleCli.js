#!/usr/bin/env node

const cli = require('../..')

const config = cli({
  name: 'exampleCli',
  opts: { alias: { concurrency: 'c' } }
})

console.log(config)

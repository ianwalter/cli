const { test } = require('@ianwalter/bff')
const execa = require('execa')

test('cli', async ({ expect }) => {
  const { stdout } = await execa('./tests/helpers/exampleCli.js', ['-c', '4'])
  // TODO: replace with snapshot when it's added to bff.
  expect(stdout).toContain(`level: 'debug', concurrency: 4`)
})

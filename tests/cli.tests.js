const { test } = require('@ianwalter/bff')
const execa = require('execa')

test('cli', async ({ expect }) => {
  const { stdout } = await execa('./tests/helpers/exampleCli.js', ['-c', '4'])
  expect(stdout).toMatchSnapshot()
})

const { test } = require('@ianwalter/bff')
const execa = require('execa')

test('cli', async ({ expect }) => {
  const { stdout } = await execa('./tests/fixtures/exampleCli.js', ['-c', '4'])
  expect(stdout).toMatchSnapshot()
})

test('dot format', async ({ expect }) => {
  const args = ['--some.other.thing', 'b']
  const { stdout } = await execa('./tests/fixtures/exampleCli.js', args)
  expect(stdout).toMatchSnapshot()
})

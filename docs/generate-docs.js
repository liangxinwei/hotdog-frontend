/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

const shell = require('shelljs')

const docDir = __dirname
const utilsScript = path.resolve(docDir, 'generate-utils.js')
const utilsDoc = path.resolve(docDir, 'utils.md')

if (shell.exec(`node ${utilsScript}`).code !== 0) shell.exit(1)

shell.exec(`git add ${utilsDoc}`)

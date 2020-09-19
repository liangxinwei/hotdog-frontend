/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')

const spawn = require('cross-spawn')
const dotenv = require('dotenv')
const dotenvExpand = require('dotenv-expand')

const rootPath = `${process.cwd()}/env`
const getFullPath = file => `${rootPath}/${file}`

// eslint-disable-next-line no-process-env
const envFile = process.env.ENVFILE || '.env.development.local'
const envFileExists = fs.existsSync(getFullPath(envFile))
console.log(
  envFileExists ? `INFO: Using <${envFile}> as endfile.` : `INFO: <${envFile}> not found.`,
)

const envFileFallback = /\.local$/.test(envFile) && envFile.replace(/\.local$/, '')
const envFileFallbackExists = !!envFileFallback && fs.existsSync(getFullPath(envFileFallback))
if (envFileFallbackExists) {
  console.log(
    `INFO: Using <${envFileFallback}> as fallback. Env vars not defined in <${envFile}> will use values from <${envFileFallback}>.`,
  )
}

if (!envFileExists && !envFileFallbackExists) {
  console.log(
    envFileFallback
      ? `ERROR: Neither <${envFile}> nor its fallback <${envFileFallback}> exists.`
      : `ERROR: <${envFile}> not found.`,
  )
  process.exit(1)
}

const envFileChain = []
if (envFileExists) envFileChain.push(getFullPath(envFile))
if (envFileFallbackExists) envFileChain.push(getFullPath(envFileFallback))
const parsedEnv = envFileChain.reduce((envs, path) => {
  return Object.assign(envs, dotenvExpand(dotenv.config({ path })).parsed)
}, {})

const [, , command, commandArgs] = process.argv
const exit = spawn.sync(command, [commandArgs], {
  stdio: 'inherit',
  shell: false,
  env: {
    // eslint-disable-next-line no-process-env
    ...process.env,
    ...Object.entries(parsedEnv).reduce((env, [key, value]) => {
      // eslint-disable-next-line no-param-reassign
      env[`REACT_APP_${key}`] = value
      return env
    }, {}),
  },
})

if (exit.error) {
  console.log('ERROR:', exit.error)
  process.exit(1)
}

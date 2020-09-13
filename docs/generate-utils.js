/* eslint-disable @typescript-eslint/no-var-requires */

const fs = require('fs')
const path = require('path')

const extract = require('extract-comments')
const glob = require('glob')
const json2md = require('json2md')

const docDir = __dirname

const getInputFiles = () => {
  const root = path.resolve(docDir, '..')
  const patterns = ['src/**/*.ts']
  return patterns.reduce((res, p) => [...res, ...glob.sync(path.resolve(root, p))], [])
}

const extractUtilComments = file => {
  const fileStr = fs.readFileSync(file, { encoding: 'utf8' })
  if (!fileStr.includes('@util')) return []
  return extract.block(fileStr).filter(comment => comment.value.match(/@util\s/))
}

const getFunctionName = (comment, file) => {
  const nextLineCode = comment.code.value
  const matched = nextLineCode.match(/(function|const|type)\s([1-9a-zA-Z_]+)/)
  if (!matched) {
    throw new Error(`ERROR: failed to get function name from "${nextLineCode}" in ${file}`)
  }
  return matched[2]
}

const commentToMarkdownJson = (comment, file) => {
  const source = path.relative(docDir, file)
  const title = {
    h4: [{ link: { title: `\`${getFunctionName(comment)}\``, source } }],
  }
  const description = {
    ul: comment.value.replace('@util', '').trim().split('\n'),
  }
  return [title, description]
}

const fileToMarkdownJson = file => {
  const comments = extractUtilComments(file)
  return comments.reduce((json, cmt) => [...json, ...commentToMarkdownJson(cmt, file)], [])
}

const prettifyMarkdown = str => {
  return (
    str
      // compress multi blank line
      .replace(/\n\n+/g, '\n\n')
      // wrap @param/@return(s) with ``
      .replace(/(@param|@return[s]?)/g, '`$1`')
  )
}

const jsonToMarkdownFile = mdJson => {
  const out = path.resolve(docDir, 'utils.md')
  mdJson.unshift({ h1: '@util' })
  fs.writeFileSync(out, prettifyMarkdown(json2md(mdJson)))
}

;(() => {
  const files = getInputFiles()
  const markdownJson = files.reduce((json, file) => [...json, ...fileToMarkdownJson(file)], [])
  jsonToMarkdownFile(markdownJson)
})()

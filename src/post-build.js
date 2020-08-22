const fs = require('fs')
const path = require('path')

console.log('Post-build:', 'replace window by this')

const fname = path.resolve(__dirname, '../dist/makeLexerClass.js')
const build = fs.readFileSync(fname, 'utf8')
const postBuild = build.replace(/window/, 'this')
fs.writeFileSync(fname, postBuild)

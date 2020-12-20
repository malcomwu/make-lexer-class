/* hello-world.js */

// import makeLexerClass from '../dist/makeLexerClass'   // ES6 import
const makeLexerClass = require('../dist/makeLexerClass')

const Lexer = makeLexerClass({
  // token: pattern
  '+': '\\+',
  integer: '[\\+\\-]?(0|([1-9]\\d*))'  // sign? none-negative-integer
                                       //   ''  positve-integer or zero
})

// Simple add paser.
const add = src => {
  const lexer = new Lexer(src)
  let value

  lexer.skipWhite()  // skip ('S'|'NL')+ or use lexer.skipSS() for 'SS'

  lexer.token('integer', lexeme => { value = +lexeme })
  lexer.skipWhite()
  lexer.token('+')
  lexer.skipWhite()
  lexer.token('integer', lexeme => { value += +lexeme })

  lexer.skipWhite()
  if (!lexer.eof) lexer.error('syntax error')

  return value
}

console.log(add('123 + 456'))   // 579

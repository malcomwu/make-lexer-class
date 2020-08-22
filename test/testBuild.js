const makeLexerClass = require('../dist/makeLexerClass')

console.log('makeLexerClass', makeLexerClass)

const Lexer = makeLexerClass({
  '"': '"',
  content: '[a-z\\\\"]+',
  escape: '\\\\.'
})

const parse = src => {
  const lexer = new Lexer(src)
  lexer.token('"')
  lexer.escprevent('"', 'escape').optional('content', lexeme => {
    console.log('src:', src, 'content:', lexeme)
  })
  lexer.token('"')
}
parse('"abc"')
parse('"abc\\"def"')
parse('"\\""')
parse('""')
try { parse('"\\"') } catch (e) { console.log('Error:', e.message) }
try { parse('"abc\\"') } catch (e) { console.log('Error:', e.message) }

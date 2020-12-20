# make-lexer-class

A maker of lexer class with simple token-by-token interface.


## Install
```sh
npm install make-lexer-class --save
```

## Feature update
- v1.1.0
  + Fix lexer.without/escwithout with '' content.
  + Add { keywords: 'aa|bb|cc' } support as in patterns.

- v1.2.0
  + Fix 'a|b' becomes /^a|b/ mistake; /^(a|b)/ to work around.
  + Add look-ahead tokens with sequence, `['ta tb tc']` and with
    some-of `'[ta|tb|tc]'`. They can be nested in hidden.

- v1.3.0-gamma
  + lite-token expression in `{ a : '!b', b: 'd e f ...', c: 'g|h|i|...' }`
  + embed literal in `'{{latex}}': LatexLexer`
  + keywords bundle: `{ keywords: 'yes|no|if|else|...'` with resulting keywords
    and keyword boundaries. The keywords do not have token namespace and share.
    By design logic, the token name will neither collide nor conflict.
  + Look-ahead-token series: `lexer.is('a', 'b', 'c', ...)`. It is idential to
    the token definition in `{ n: 'a b c...' }`. The advantage is the quotes of
    `'a'`, `'b'`, and `'c'` can be removed and it becomes token variable in
    `lexer.is(a, b, c, ...)`. The flexibility is for deeper future ahead-tokens.


## Usage
```js
import makeLexerClass from 'make-lexer-class'
const Lexer = makeLexerClass({
  token1: pattern1,
  token2: pattern2,
  keywords: listOfKeywords
})
// listOfKeywordsExample = 'if|for|loop'
// result is keywords: /(if|for|loop)\b/, if: /if\b/, for, ...
```


## Getting start
currently the npm version is not in sync. Please check it out from GitHub and
run:

```sh
node samples/hello-world.js
```

For the first glance.


## APIs in brief

(Update: this description is not updated for testing purposes.)

### Make a lexer class
Make a Lexer class with definition of token names with their patterns.

```js
const tokenPatterns = {
  tokenName1: pattern1,   // cannot produce ''
  ...otherPatterns
}
const Lexer = makeLexerClass(tokenPatterns)
```
A token is by definition `{ name, lexeme }`.
The token name is referred to as token in the APIs,
because it is treated as the identifier of token.

The default patterns as the following are used in some APIs, and they can be overwritten
to specify the white-space-for-you or pattern-for-your-all.

```js
const defaultPatterns = {
  S: ' ',
  SS: ' +',
  ALL: '.+'
}
```

### Make a lexer
```js
const lexer = new Lexer(src)
```

### Usage in parser
The lexer is sort of a token string and it is stateless.
Technically, it has a cursor state, which is behind the next token, and some other properties shown below.
```js
lexer.token(token, act)     // e.g., token(token, lexeme => { value = lexeme })
lexer.optional(token, act)
````

Look-ahead token predicate:
```js
lexer.is(token)
```
This lexer can be thought of as a container of context states, but only the parser has knowledge to tell it.
This is sometimes good for not letting the lexer (less knowlegable) to handle the states.

In summary, this lexer only do the tokenization one by one, and the parser decides when to do.
The pratice is that a main parser inits and distributes the work to subparsers by means of the grammar.
It can be seen as a lower-level AST; the AST is not a data structure but a control logic.
The possible advantage is that one can easily convert this to data or incorporate extra data flow in the control logic.
For example, a while-loop does a parallel list selection, and procedual subparser calls are in serial.
Nontheless, any subpaser call is a branch-ret, and it naturally goes to the recursive walk and back to the
caller to form, sort of, a syntax tree.

### Prevent
```js
lexer.prevent(token)
lexer.escprevent(token, escToken)  // escaped prevent
```
These make a possible and temporary boundary for a token at right to prevent it from
the consuming by the left (next) token.
The temporary unbound state will be recovered by `lexer.token()` or `lexer.optional()`.

### Error
```js
lexer.error(message)  // throw new Error(message + ..)
```

### Properties
```js
lexer.line    // current line
lexer.ln      // current index of line
lexer.col     // current index column
lexer.eol     // is end of line
lexer.eof     // is end of file
```

### Sugars
```js
lexer.skipWhite()     // (S | NL)*
lexer.skipSS()        // S*
lexer.without(token)              // All but not token
lexer.escwithout(token, escToken) // as above, escaped version
lexer.mlwithout(token)            // multi-line without
```

### Suggestions for praticing
- Take the `lexer.error(message)` as a possible debugging tool.
- If white space handling is confusing, it is readily in any grammar: do it in the end not in the front in any subparser,
  but only do the main parser in the front.
- Token abstraction, pretend a higher level "Token" in the following two cases:
  ```
  A := B | C | D
  while (lexer.is('A'), ..) {  // in list A rather than within items B, C and D
    ...
  }
  ```
  ```
  value := number | ident | paran
  paran := '(' expr ')'
  if (lexer.is(paran)) {/* go to the paran subparser */} // is preferred than if (lexer.is('(')) {} thought they are the same.
  ```
  It is by definition of the grammar that 'A' or 'paran' will never be used to produce a lexeme, but only as a look-ahead token.
  But it can be subtle that one might want to play a trick to keep the error handling in or out.
  Or it could be taken as a tolarence metric to relax a strict grammar, to researve features or so.
- The bottom up acending has an advantage to test a grammar line with a corresponding data structure.
  It is shown here that it is often possible to exchange the `src`, `lexer` and `plainObject`,
  and to flow in a 'constructor()' and out of the 'toString()' and 'toJSON()' fluently.
- Not implement a `B := ( ... )? or *` in any subparser. The rule of thumb is that the subparser at least advance a token.
  Instead, do `A := ... B? ...` in the caller supparser. Only do it in the main parser in need.
- Top-down descend iterations, pick up an interested language sub-domain, do it bottom-up (syntatic level) and
  test it top-down (sementic level). It is very normal that one changes a grammar in a top-down iteration, for human's taste.
- Schema taken as a part of the grammar, sementic language restriction, e.g., `A := (B | C){2,5}` instead of `A := (B | C)*` currently.
  It can be done for ordering or maybe others.
  ```
  const min = 2, max = 5
  let counter = 0
  while (..) {
    if (counter > max) lexer.error(message)
    ...
    counter++
  }
  if (counter < min) lexer.error(message)
  ```
  This logic can also be used to prevent from an endless-loop during the development.


## Development

Updated-2020-12-20: v1.3.0-gamma. The hypenatation of 0-gamma
denotes that it is only for the test in a cirle-of-trust. The
future version in 0-delta is for the third-party trust. It shell
be v1.n.m where n > 4 for feature update. The code will be
refactored by the development amid for v2.0.0-beta. The beta
version will be for the players and alpha for the public review.

Donations are thankful but are not accepted here. It is welcome
to contribute in the GitHub plateform. The license is unlicensed
in public domain.

**Build**

Install Node.js and in the command-line interface:
```
npm run install
npm run build
```

Please notice that the 0-gamma tests are in the academic level.
The suggestion for starting of the test is test it individually
in the EcmaScript 6 specification for clerity. The sample code in
the next section.


## Sample code
It can be view or be refered to as a macro. The token definition is
concise while the parser is verbose. It is the disadvantage but also
the advantage for flexibility, agile development and schema validation.

```js
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
```
The code is in `./samples/hello-world.js` and run `node samples/hello-world` or
`node samples\hello-world` depending on your system.


## Note

This library is a spin-off of the https://github.com/malcomwu/musje;
a sheet music and musical processing library in numbered musical notation.

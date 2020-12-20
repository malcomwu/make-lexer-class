!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.makeLexerClass=e():t.makeLexerClass=e()}(this,(function(){return function(t){var e={};function n(i){if(e[i])return e[i].exports;var r=e[i]={i:i,l:!1,exports:{}};return t[i].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=t,n.c=e,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(i,r,function(e){return t[e]}.bind(null,r));return i},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e){function n(t,e){var n;if("undefined"==typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(n=function(t,e){if(!t)return;if("string"==typeof t)return i(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return i(t,e)}(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var r=0,o=function(){};return{s:o,n:function(){return r>=t.length?{done:!0}:{done:!1,value:t[r++]}},e:function(t){throw t},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var s,a=!0,u=!1;return{s:function(){n=t[Symbol.iterator]()},n:function(){var t=n.next();return a=t.done,t},e:function(t){u=!0,s=t},f:function(){try{a||null==n.return||n.return()}finally{if(u)throw s}}}}function i(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,i=new Array(e);n<e;n++)i[n]=t[n];return i}function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function o(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,i)}return n}function s(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?o(Object(n),!0).forEach((function(e){a(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function a(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function u(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function l(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function f(t,e,n){return e&&l(t.prototype,e),n&&l(t,n),t}var h=[].concat,c=function(t){return h.apply([],t)},y=function(){function t(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"both";u(this,t),this.data="both"===n?e.replace(/\r\n/g,"\n").split("\n"):e.split(n),this.ln=-1,this.nextLine()}return f(t,[{key:"nextLine",value:function(){this.ln++,this.line=new v(this.data[this.ln])}},{key:"eof",get:function(){return this.ln===this.data.length-1&&this.line.eol}}]),t}(),v=function(){function t(e,n){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;u(this,t),this.str=e,this.rest=n||e,this.col=i}return f(t,[{key:"advance",value:function(t){this.col+=t,this.rest=this.rest.substr(t)}},{key:"cutoff",value:function(t){this.cutoffRest=this.rest.substr(t),this.rest=this.rest.substr(0,t),this.isCutoff=!0}},{key:"joinCutoff",value:function(){this.rest+=this.cutoffRest,this.isCutoff=!1}},{key:"eol",get:function(){return 0===this.rest.length}}]),t}(),p=function(){function t(e){u(this,t),this.lexer=e,this.lines=e.lines,this.setCurrLine(e.lines.ln),this.ref=1}return f(t,[{key:"setCurrLine",value:function(t){this.ln=t,this.line=new v(this.lines.data[t])}},{key:"nextLine",value:function(){this.setCurrLine(this.ln+1)}},{key:"keepState",value:function(){this.kstate={ln:this.ln,line:s({},this.line)}}},{key:"restoreState",value:function(){this.ln=this.kstate.ln;var t=this.kstate.line,e=t.str,n=t.rest,i=t.col;this.line=new v(e,n,i)}},{key:"eatToTest",value:function(t){if("NL"===t)return!(this.eof||!this.line.eol)&&(this.nextLine(),!0);if("NL!"===t)return!!this.hasNextLine&&(this.nextLine(),!0);var e=this.lexer.getPattern(t);if(!(e instanceof RegExp))return this.lexer.is(t);var n=this.line.rest.match(e);return!!n&&(this.line.advance(n[0].length),!0)}},{key:"eol",get:function(){return this.line.eol}},{key:"eof",get:function(){return this.ln===this.lines.data.length-1&&this.line.eol}},{key:"hasNextLine",get:function(){return this.ln<this.lines.data.length-1}}]),t}(),d={S:" ",SS:" +",ALL:".+"},b=function(t){return Array.isArray(t)?function(t){var e=t[0];if(/^!/.test(e)){if(/[ \|]/.test(e))throw new Error("Not supported.");return{not:e.substr(1)}}if(/ /.test(e))return{seq:e.split(" ")};if(/\|/.test(e))return{some:e.split("|")};throw new Error("Incorrect compound tokens: "+e)}(t):(/\|/.test(t)&&(t="(".concat(t,")")),new RegExp("^"+t))},g=function(t){if(!t)return"both";var e=t.source.substr(1);if(/^win|^(CRLF|\\r\\n)$/i.test(e))return"\r\n";if(/^(unix|LF|\\n)$/i.test(e))return"\n";if(/^mac|^(CR|\\r)$/i.test(e))return"\r";throw new Error("Invalid NL format: [".concat(e,"]."))};t.exports=function(t){var e=function(t){t=s(s({},d),function(t){var e=t.keywords;return e?(t.keywords="(".concat(e,")\\b"),e.split("|").forEach((function(e){t[e]=e+"\\b"})),t):t}(t));var e=[{},{},{}];for(var n in t){var i=t[n];/^\{\{.+\}\}$/.test(n)?e[0][n]=new i:(e[0][n]=b(i),e[1][n]=new RegExp(i),e[2][n]=new RegExp(i,"g"))}return e}(t);return function(){function t(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";if(u(this,t),this.name="lexer",this.src=n,"string"!=typeof n)throw new Error("The type of src, ".concat(r(n),", is not string."));this.patterns=e[0],this.aheadPatterns=e[1],this.globalPatterns=e[2];var i=g(this.patterns.NL);this.lines=new y(n,i)}return f(t,[{key:"nextLine",value:function(){this.lines.nextLine()}},{key:"getPattern",value:function(t){if(t in this.patterns)return this.patterns[t];this.error("Undefined token [".concat(t,"]"))}},{key:"getAheadPattern",value:function(t){if(t in this.aheadPatterns)return this.aheadPatterns[t];this.error("Undefined token [".concat(t,"]"))}},{key:"getGlobalPattern",value:function(t){if(t in this.globalPatterns)return this.globalPatterns[t];this.error("Undefined token [".concat(t,"]"))}},{key:"eat",value:function(t){var e=this.line.rest.match(this.getPattern(t));e||this.error("token [".concat(t,"]")),this.lexeme=e[0],this.line.isCutoff&&this.line.joinCutoff(),this.line.advance(this.lexeme.length)}},{key:"prevent",value:function(t){var e=this.line.rest.match(this.getAheadPattern(t));return e&&this.line.cutoff(e.index),this}},{key:"escprevent",value:function(t,e){var i=this.line.rest.matchAll(this.getGlobalPattern(t));if(!i)return this;var r,o,s=this.line.rest.matchAll(this.getGlobalPattern(e)),a=[],u=function(t){for(var e=0;e<a.length;e++){var n=a[e];if(t>=n[0]&&t<n[1])return!0}},l=n(s);try{for(l.s();!(o=l.n()).done;){var f=o.value;a.push([f.index,f.index+f[0].length])}}catch(t){l.e(t)}finally{l.f()}var h,c=n(i);try{for(c.s();!(h=c.n()).done;){var y=h.value;if(!u(y.index)){r=y.index;break}}}catch(t){c.e(t)}finally{c.f()}return r>=0&&this.line.cutoff(r),this}},{key:"is",value:function(t){var e=c(Array.from(arguments));if(e.length>1)return this.isSeq(e);if(1===e.length&&(t=e[0]),"NL"===t)return this.eol&&!this.eof;var n=this.getPattern(t),i=n.not,r=n.seq,o=n.some;return i?!this.is(i):r?this.isSeq(r):o?this.isSome(o):this.seqData?this.seqData.eatToTest(t):n.test(this.line.rest)}},{key:"isSeq",value:function(t){var e=this;this.seqData?this.seqData.ref++:this.seqData=new p(this);var n=t.every((function(t){return e.seqData.eatToTest(t)}));return this.seqData.ref--,this.seqData.ref||delete this.seqData,n}},{key:"isSome",value:function(t){var e=this;return this.seqData&&this.seqData.keepState(),t.some((function(t){var n=e.is(t);return e.seqData&&!n&&e.seqData.restoreState(),n}))}},{key:"token",value:function(t,e){this.eat(t),e&&e(this.lexeme)}},{key:"optional",value:function(t,e){this.lexeme="",this.is(t)?this.eat(t):this.line.isCutoff&&this.line.joinCutoff(),e&&e(this.lexeme)}},{key:"without",value:function(t,e){this.prevent(t).optional("ALL",(function(t){return e&&e(t)}))}},{key:"escwithout",value:function(t,e,n){this.escprevent(t,e).optional("ALL",(function(t){return n(t)}))}},{key:"mlwithout",value:function(t,e){for(var n=this.getAheadPattern(t),i=[],r=this.line.rest.match(n);!r&&(i.push(this.line.rest),this.line.advance(this.line.rest.length),!this.eof);)this.nextLine(),r=this.line.rest.match(n);if(r){var o=this.line.rest.substr(0,r.index);i.push(o),this.line.advance(o.length)}this.lexeme=i.join("\n"),e&&e(this.lexeme)}},{key:"error",value:function(t){var e,n,i=this.ln,r=["".concat(t," at line ").concat(this.ln+1," column ").concat(this.col+1,".")];throw i>1&&r.push("|"+this.lines.data[i-2]),i>0&&r.push("|"+this.lines.data[i-1]),r.push("|"+this.lines.data[i]),r.push((e=" ",n=this.line.col+1,new Array(n+1).join(e)+"^")),new Error(r.join("\n"))}},{key:"skipSS",value:function(){this.optional("SS")}},{key:"skipWhite",value:function(){for(;(this.is("S")||this.eol)&&!this.eof;)this.eol?this.nextLine():this.token("SS")}},{key:"optionalNL",value:function(){this.eol&&!this.eof&&this.nextLine()}},{key:"to",value:function(t){var e=this.patterns["{{".concat(t,"}}")];if(!e)throw new Error("The embedded lexer {{".concat(t,"}} not defined."));return e.lines=this.lines,e}},{key:"line",get:function(){return this.lines.line}},{key:"ln",get:function(){return this.lines.ln}},{key:"col",get:function(){return this.line.col}},{key:"eol",get:function(){return this.line.eol}},{key:"eof",get:function(){return this.lines.eof}}]),t}()}}])}));
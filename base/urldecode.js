

const { encode, decode } = require('url-encode-decode')
 
encode('foo bar baz') // 'foo+bar+baz'
encode(`Hi! How? & you person/\\`) // 'Hi%21+How%3F+%26+you+person%2F%5C'
 
decode('foo+bar+baz') // 'foo bar baz'
decode('Hi%21+How%3F+%26+you+person%2F%5C') // `Hi! How? & you person/\\`

var mo = decode('task id \u4e0d\u80fd\u4e3a\u7a7a\u3002');

console.log('succ'+mo);
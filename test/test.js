var fs       = require('fs')
var parse    = require('../index.js')
var S        = require('string')
var jsObjStr = fs.readFileSync(__dirname + '/test.jsobj', 'utf8')
var expected = S(fs.readFileSync(__dirname + '/test.json', 'utf8')).trim().s
var result   = parse(jsObjStr)
var json     = JSON.stringify(result)
if (json != expected) {
  console.log('fail')
  console.log("EXPECTED:", expected)
  console.log("RESULT:", result)
  process.exit(1)
}

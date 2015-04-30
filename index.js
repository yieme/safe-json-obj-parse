'use strict';

var S = require('string')
var quoteEscape = "`~`"


// "users": { "briansturgill": true, jonamorua: true },

// but:
// users: { "some": "this, that: other" } is ok

function isAlpha(char) {
  return ((char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z'))
}

function fixSubLine(subline) {
  var firstQuote = subline.indexOf('"')
  var firstColon = subline.indexOf(':')
  var first = subline.substr(0,1)
  if (firstColon >= 0 && isAlpha(first)) {
    if (firstQuote < 0 || firstQuote > firstColon) {
      subline = '"' + subline
      subline = subline.replace(':', '":')
    }
  }
  return subline
}

function fixUpLine(line) {
  line = S(line).trim().s
  var first = line.substr(0,1)
  if (line.length > 0 && isAlpha(first)) {
    line = '"' + line
    line = line.replace(':', '":')
    var sub = line.split(', ')
    for (var i=1; i < sub.length; i++) {
      sub[i] = fixSubLine(sub[i])
    }
    line = sub.join(', ')
  }
  return line
}

function parse(jsObjString) {
  var result = S(jsObjString).replaceAll('"', quoteEscape).s
  result = S(result).replaceAll("'", '"').s
  result = S(result).replaceAll("{", "{\n").s
  result = S(result).replaceAll("},", "\n},\n").s
  result = S(result).replaceAll("[", "[\n").s
  result = S(result).replaceAll("],", "\n],\n").s
  var lines = result.split("\n")
  result = []
  for (var i=0; i < lines.length; i++) {
    var line = fixUpLine(lines[i])
    if (line.length > 0) {
      result.push(line)
    }
  }

  result = result.join("\n")
  result = S(result).replaceAll("{\n", "{ ").s
  result = S(result).replaceAll("[\n", "[ ").s
  result = S(result).replaceAll("\n}", " }").s
  result = S(result).replaceAll("\n]", " ]").s

  result = S(result).replaceAll(quoteEscape, '"').s

  try {
    return JSON.parse(result)
  } catch (e) { }

  return result
}



module.exports = parse

#!/usr/local/bin/node

'use strict';

var stdin = require('get-stdin');
var parse = require('../index.js')

stdin(function (data) {
  if (data) {
    var result = parse(data)
    console.log(JSON.stringify(result));
  }
})

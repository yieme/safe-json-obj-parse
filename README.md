# safe-json-obj-parse

Safely parse JSON object string

## Install

```sh
npm i safe-json-obj-parse
```

## Usage

```js
var parse = require('safe-json-obj-parse')
var jsObjStr = '{ name: "someone" }'
var obj = parse(jsObjStr)
console.log(JSON.stringify(obj)) // { "name" : "someone" }
```

## License MIT

# Object Utils

This is a simple, object utility library. This is intended to be used imported via Node.js (or a bundler like Webpack for client side).

## Installation

### Using NPM or Yarn
```
npm install '@beautiful-code/object-utils'
yard add '@beautiful-code/object-utils'
```

## Usage

### Basic Usage

```javascript
const ObjectUtils = require('@beautiful-code/string-utils').ObjectUtils

let example = {
    key: 'value',
    key2: 'value2',
    key3: 'value3'
}

let swapped = ObjectUtils.swap(example)

console.log(swapped.value)  // key
console.log(swapped.value2) // key2
console.log(swapped.value3) // key3

let extended = ObjectUtils.extend(swapped, {
    extra: 'value4'
})

console.log(extended.value)  // key
console.log(extended.extra)  // value4


```
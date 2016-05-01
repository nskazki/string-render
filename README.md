# string-render

[![Build Status](https://travis-ci.org/nskazki/string-render.svg)](https://travis-ci.org/nskazki/string-render)
[![Coverage Status](https://coveralls.io/repos/github/nskazki/string-render/badge.svg?branch=master)](https://coveralls.io/github/nskazki/string-render)

>This module is written on `typescript`, and contains the `.d.ts` file.
><br>If you write on `typescript`: just use it in your project and definitions will be automatically uploaded.

```
npm i -S string-render
```

## About

This module replaces all escape sequence by spaces and line breaks.

## Warning!

This module does not supported an [ANSI escape codes](http://en.wikipedia.org/wiki/ANSI_escape_code).
And simply removes them before forming line.

```js
const sr = require('string-render')
const inspect = require('util').inspect
const assert = require('assert')
const chalk = require('chalk')

var actColor = sr(`${chalk.green(`12${chalk.red('345')}67`)}8\r!${chalk.blue('@#$')}`)
var actClear = sr('12345678\r!@#$')
var exp = '!@#$5678'
assert.equal(inspect(actColor), inspect(exp))
assert.equal(inspect(actClear), inspect(exp))
```

## Examples

```js
const sr = require('string-render')
const inspect = require('util').inspect
const assert = require('assert')

var act = sr('some\be\rsom\vstrange\r\vline')
var exp = 'some\n'
        + '   strange\n'
        + 'line'
assert.equal(inspect(act), inspect(exp))

var act = sr('1\b\v2\b\v3')
var exp = '1\n'
        + '2\n'
        + '3'
assert.equal(inspect(act), inspect(exp))

var act = sr('wow\rwow\f space\t!\rbig\n01234567012345670')
var exp = 'wow\n'
        + 'big space       !\n'
        + '01234567012345670'
assert.equal(inspect(act), inspect(exp))
```

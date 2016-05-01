'use strict'

import { repeat } from 'lodash'
import getAnsiRegex = require('ansi-regex')

const needRender = /[\v\f\r\t\x08]/

export default function stringRender(rawStr: string): string {
  if (!needRender.test(rawStr))
    return rawStr

  let clrStr = rawStr
    .replace(getAnsiRegex(), '')
    .replace(/\v\r/g, '\n')
    .replace(/\f\r/g, '\n')
    .replace(/\r\v/g, '\n')
    .replace(/\r\f/g, '\n')
    .replace(/\r\n/g, '\n')
    .replace(/\n\r/g, '\n')

  if (!needRender.test(clrStr))
    return clrStr

  let resStr: Array<string> = [ ]
  let resNextIndex = 0
  let resLineStart = 0

  for (let index = 0; index < clrStr.length; index ++) {
    let char = clrStr[index]

    if ((char === '\v') || (char === '\f')) {
      const padSize = resNextIndex - resLineStart
      const padLine = repeat(' ', padSize)

      resNextIndex = resStr.length
      resStr[resNextIndex] = '\n'
      resNextIndex++
      resLineStart = resNextIndex

      resStr.push.apply(resStr, padLine.split(''))
      resNextIndex += padSize
      continue
    }

    if (char === '\r') {
      const newCurr = resLineStart
      resNextIndex = newCurr
      continue
    }

    if (char === '\t') {
      const tabSize = 8
      const tabDone = (resNextIndex - resLineStart) % tabSize
      const padSize = tabSize - tabDone
      const padLine = repeat(' ', padSize)
      resStr.push.apply(resStr, padLine.split(''))
      resNextIndex += padSize
      continue
    }

    if (char === '\b') {
      if (resNextIndex === resLineStart) continue
      resNextIndex--
      continue
    }

    if (char === '\n') {
      resNextIndex = resStr.length
      resStr[resNextIndex] = '\n'
      resNextIndex++
      resLineStart = resNextIndex
      continue
    }

    resStr[resNextIndex] = char
    resNextIndex++
  }

  return resStr.join('')
}

// ES6 Modules default exports interop with CommonJS
module.exports = stringRender
module.exports.default = stringRender

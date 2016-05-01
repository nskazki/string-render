'use strict'

import sr from '../src/index'
import { inspect } from 'util'
import assert = require('power-assert')
import chalk = require('chalk')

describe('string-render', () => {
  it('\\t x 1', () => {
    const act = sr('01234567012345670\n'
                + '\t0\n'
                + ' \t1\n'
                + '  \t2\n'
                + '   \t3\n'
                + '    \t4\n'
                + '     \t5\n'
                + '      \t6\n'
                + '       \t7\n'
                + '        \t8\n'
                + '         \t9\n'
                + '01234567012345670')

    const exp = sr('01234567012345670\n'
                + '        0\n'
                + '        1\n'
                + '        2\n'
                + '        3\n'
                + '        4\n'
                + '        5\n'
                + '        6\n'
                + '        7\n'
                + '                8\n'
                + '                9\n'
                + '01234567012345670')

    assert.equal(inspect(act), inspect(exp))
  })

  it('\\t x 2', () => {
    const act = sr('0123456701234567012345670\n'
                + '\t\t0\n'
                + ' \t\t1\n'
                + '  \t\t2\n'
                + '   \t\t3\n'
                + '    \t\t4\n'
                + '     \t\t5\n'
                + '      \t\t6\n'
                + '       \t\t7\n'
                + '        \t\t8\n'
                + '         \t\t9\n'
                + '\t\t0\n'
                + ' \t\t1\n'
                + '0123456701234567012345670')

    const exp = sr('0123456701234567012345670\n'
                + '                0\n'
                + '                1\n'
                + '                2\n'
                + '                3\n'
                + '                4\n'
                + '                5\n'
                + '                6\n'
                + '                7\n'
                + '                        8\n'
                + '                        9\n'
                + '                0\n'
                + '                1\n'
                + '0123456701234567012345670')

    assert.equal(inspect(act), inspect(exp))
  })

  it('\\b x 1', () => {
    const act = sr( '\b012\n'
                + '?\b012\n'
                + '0?\b12\n'
                + '01?\b2\n'
                + '012?\b\n'
                +  '\b012\n'
                + '?\b012\n')
    const exp = '012\n'
              + '012\n'
              + '012\n'
              + '012\n'
              + '012?\n'
              + '012\n'
              + '012\n'

    assert.equal(inspect(act), inspect(exp))
  })

  it('\\b x 2', () => {
    const act = sr(  '\b\b012\n'
                +  '\b?\b012\n'
                + '?\b?\b012\n'
                + '0?\b?\b12\n'
                + '01?\b?\b2\n'
                + '012?\b?\b\n'
                + '012??\b\b\n'
                +   '\b\b012\n'
                +  '\b?\b012\n'
                + '?\b?\b012\n')
    const exp = '012\n'
              + '012\n'
              + '012\n'
              + '012\n'
              + '012\n'
              + '012?\n'
              + '012??\n'
              + '012\n'
              + '012\n'
              + '012\n'

    assert.equal(inspect(act), inspect(exp))
  })

  it('\\v', () => {
    const act = sr('\v'
                + '1\v'
                + '2\v'
                + '3')
    const exp = '\n'
              + '1\n'
              + ' 2\n'
              + '  3'

    assert.equal(inspect(act), inspect(exp))
  })

  it('\\f', () => {
    const act = sr('\f'
                + '1\f'
                + '2\f'
                + '3')
    const exp = '\n'
              + '1\n'
              + ' 2\n'
              + '  3'

    assert.equal(inspect(act), inspect(exp))
  })

  it('\\r x 1', () => {
    const act = sr('\r012\n'
                + '?\r012\n'
                + '??\r012\n'
                + '???\r012\n'
                + '??2\r01\n'
                + '?12\r0\n'
                + '012\r\n')
    const exp = '012\n'
              + '012\n'
              + '012\n'
              + '012\n'
              + '012\n'
              + '012\n'
              + '012\n'

    assert.equal(inspect(act), inspect(exp))
  })

  it('\\r x 2', () => {
    const act = sr('\r?\r012\n'
                + '?\r?\r012\n'
                + '??\r?\r012\n'
                + '???\r?\r012\n'
                + '\r??2\r01\n'
                + '?\r?12\r0\n'
                + '012\r\r\n')
    const exp = '012\n'
              + '012\n'
              + '012\n'
              + '012\n'
              + '012\n'
              + '012\n'
              + '012\n'

    assert.equal(inspect(act), inspect(exp))
  })

  it('\\n', () => {
    const act = sr('123\n\n\n123\n123\n\n1\n123')
    const exp = '123\n\n\n123\n123\n\n1\n123'
    assert.equal(inspect(act), inspect(exp))
  })

  it('mix test #1', () => {
    const act = sr('\n1234\b\b\bnoop\r!12\v\t213\n01234567')
    const exp = '\n'
              + '!12op\n'
              + '        213\n'
              + '01234567'
    assert.equal(inspect(act), inspect(exp))
  })

  it('mix test #2', () => {
    const act = sr('1\b\v2\b\v3')
    const exp = '1\n'
              + '2\n'
              + '3'
    assert.equal(inspect(act), inspect(exp))
  })

  it('mix test #3', () => {
    const act = sr('\v\b1\v\b2')
    const exp = '\n'
              + '1\n'
              + '2'
    assert.equal(inspect(act), inspect(exp))
  })

  it('mix test #4', () => {
    const act = sr('some\be\rsom\vstrange\r\vline')
    const exp = 'some\n'
              + '   strange\n'
              + 'line'
    assert.equal(inspect(act), inspect(exp))
  })

  it('mix test #5', () => {
    const act = sr('wow\rwow\f space\t!\rbig\n01234567012345670')
    const exp = 'wow\n'
              + 'big space       !\n'
              + '01234567012345670'
    assert.equal(inspect(act), inspect(exp))
  })

  it('ANSI escape codes test #1', () => {
    const actColor = sr(`${chalk.green(`12${chalk.red('345')}67`)}8\r!${chalk.blue('@#$')}`)
    const actClear = sr('12345678\r!@#$')
    const exp = '!@#$5678'
    assert.equal(inspect(actColor), inspect(exp))
    assert.equal(inspect(actClear), inspect(exp))
  })
})

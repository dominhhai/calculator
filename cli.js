#!/usr/bin/env node

if (process.argv.length < 3) {
  var version = require('./package').version
  console.error('Smart Calculator for Nodejs supports all type of Polish notations.\n')
  console.error('Version:', version, '\n')
  console.error('Usage\n\n1. Command Line\n')
  console.error('    $ scalc "your_expression"\n\n    or\n')
  console.error('    $ scalc \'your_expression\'\n\n    or\n')
  console.error('    $ scalc your_expression\n')
  console.error('    E.x: $ scalc "1 + 5*(PI - 10 * 2^5)" or $ scalc 1 + 5*[PI - 10 * 2^5]')
  console.error('\n\n2. API\n')
  console.error('    var scalc = require(\'scalc\')\n    var result = scalc(your_expression)\n')
  console.error('    E.x: var result = require(\'scalc\')(\'10 - E * |-10| - 0.5*(2^3)\')')
} else {
  var exp = process.argv.slice(2).join(' ').trim()
  console.log(exp, '=')
  var rst = require('./app')(exp)
  console.log(rst)
  // copy to clipboard
  require('copy-paste').copy(rst, function () {
    console.log('\nCopied the result to the clipboard!')
  })
}

#!/usr/bin/env node

if (process.argv.length < 3) {
  console.error("Smart Calculator for Nodejs supports all type of Polish notations.\n")
  console.error("Usage\n\n1. Command Line\n")
  console.error("    $ scalc \"your_expression\"\n\n    or\n")
  console.error("    $ scalc 'your_expression'\n\n    or\n")
  console.error("    $ scalc your_expression\n")
	console.error("    E.x: $ scalc \"1 + 5*(PI - 10 * 2^5)\" or $ scalc 1 + 5*(PI - 10 * 2^5)")
  console.error("\n\n2. API\n")
	console.error("    var scalc = require('scalc')\n    var result = scalc(your_expression)\n")
  console.error("    E.x: var result = require('scalc')('10 - E * |-10| - 0.5*(2^3)')")
  return
}

var rst = require('./app')(process.argv.slice(2).join(' ').trim())
console.log(rst)

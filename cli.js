#!/usr/bin/env node

var rst = require('./app')(process.argv.slice(2).join(' ').trim())
console.log(rst)

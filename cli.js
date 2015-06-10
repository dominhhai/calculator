#!/usr/bin/env node

require('./app')(process.argv.slice(2).join(' ').trim(), console.log)

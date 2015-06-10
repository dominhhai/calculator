const test = require('tape')
var app = require('../app')

test('prefix test', function (t) {
  app('+ 1 3', function (rst) {
    t.equal(rst, 4)
  })

  t.end()
})

test('postfix test', function (t) {
  app('1 3 +', function (rst) {
    t.equal(rst, 4)
  })

  t.end()
})

test('infix test', function (t) {
  app('1+3', function (rst) {
    t.equal(rst, 4)
  })

  app('1+(-3)', function (rst) {
    t.equal(rst, -2)
  })

  app('1 - -3', function (rst) {
    t.equal(rst, 4)
  })

  app('-1 - -3', function (rst) {
    t.equal(rst, 2)
  })

  app('-1 - -3 + 2^4', function (rst) {
    t.equal(rst, 18)
  })

  app('-1 - -3 + pow[2, 4]', function (rst) {
    t.equal(rst, 18)
  })

  t.end()
})

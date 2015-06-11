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

  app('-1 - -3 + 2^5', function (rst) {
    t.equal(rst, 34)
  })

  app('-1 - -3 + pow[2, 4] + 1', function (rst) {
    t.equal(rst, 19)
  })

  app('-1 - |-3| + 2^5', function (rst) {
    t.equal(rst, 28)
  })

  t.end()
})

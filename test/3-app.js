const test = require('tape')
var app = require('../app')

test('prefix test', function (t) {

  t.equal(app('+ 1 3'), 4)

  t.equal(app('+ - -1 |3| 2^5'), 28)

  t.equal(app('+ - -1 |-3| 2^5'), 28)

  t.end()
})

test('postfix test', function (t) {
  t.equal(app('1 3 +'), 4)

  t.end()
})

test('infix test', function (t) {

  t.equal(app('1+3'), 4)

  t.equal(app('1+(-3)'), -2)

  t.equal(app('1 - -3'), 4)

  t.equal(app('-1 - -3'), 2)

  t.equal(app('-1 - -3 + 2^5'), 34)

  // t.equal(app('-1 - -3 + pow[2, 4] + 1'), 19)

  t.equal(app('-1 - |-3| + 2^5'), 28)

  t.equal(app('-1 - abs[-3] + 2^5'), 28)

  // t.equal(app('-1 - abs[-3] + pow[2, 5]'), 28)

  t.equal(app('-1 - abs(-3) + 2^5'), 28)

  // t.equal(app('-1 - abs(-3) + pow[2, 5]'), 28)
  //
  // t.equal(app('-1 - abs(-3) + pow(2, 5) - (5 + 5)'), 18)
  //
  // t.equal(app('-1 - abs(-3) + pow(2, 5) - 10 % 3'), 27)

  t.equal(app('-1'), -1)

  t.equal(app('100'), 100)

  t.equal(app('PI'), 3.141592653589793)

  t.equal(app('abs(-10)'), 10)

  t.equal(app('|-20|'), 20)

  t.equal(app('|-20|'), 20)

  t.equal(app('min(10, 20, 30)'), 10)

  t.end()
})

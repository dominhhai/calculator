const test = require('tape')
var postfixer = require('../postfixer')

test('expression type test', function (t) {
  t.plan(3)

  t.equal(postfixer.getExpressionType('1 + (2 - 10) * E'), postfixer.INFIX)
  t.equal(postfixer.getExpressionType('+ 1 * - 2 10 E'), postfixer.PREFIX)
  t.equal(postfixer.getExpressionType(' 1 E 2 10 - * +'), postfixer.POSTFIX)
})

test('infix to postfix test', function (t) {
  t.equal(postfixer('1 + 2'), '1 2 +')
  t.equal(postfixer('1 + 2 * 3'), '1 2 3 * +')
  t.equal(postfixer('(1 + 2) * 3'), '1 2 + 3 *')
  t.equal(postfixer('(abs[1] + 2) * 3 + E'), '. 1 abs. 2 + 3 * E +')
  t.equal(postfixer('(PI     + 2) * 3 + E'), 'PI 2 + 3 * E +')
  t.equal(postfixer('(PI     + 2/ 10) * 3 + (E-19 )'), 'PI 2 10 / + 3 * E 19 - +')
  t.equal(postfixer('(1 + 2 - 3*(PI + 10))'), '1 2 + 3 PI 10 + * -')

  t.equal(postfixer('1 + (-2)'), '1 -2 +')
  t.equal(postfixer('-1 + 2 + -3'), '-1 2 + -3 +')
  t.equal(postfixer('1 + - 2'), '1 -2 +')
  t.equal(postfixer('-1 + - 2'), '-1 -2 +')
  t.equal(postfixer('-1 - -3'), '-1 -3 -')
  t.equal(postfixer('|-1| - -3'), '. -1 abs. -3 -')
  t.equal(postfixer('abs[-1] - -3'), '. -1 abs. -3 -')

  t.equal(postfixer('9 - 3 : 1/3 + 1'), '9 3 1 3 / : - 1 +')
  t.equal(postfixer('9 - 3 % 1/3 + 1'), '9 3 1 3 / % - 1 +')

  t.end()
})

test('func: infix to postfix test', function (t) {
  t.equal(postfixer('abs(1 - 2)'), '. 1 2 - abs.')
  t.equal(postfixer('|1 - 2|'), '. 1 2 - abs.')
  t.equal(postfixer('pow(5,|1 - 2|)'), '. 5 . 1 2 - abs. pow.')
  t.equal(postfixer('min(10, 20, 30)'), '. 10 20 30 min.')
  t.equal(postfixer('max(10, 20 + 5, 30 - 40)'), '. 10 20 5 + 30 40 - max.')

  t.equal(postfixer('max(10, 20 + 5, 30 - 40, min ( 40, 100))'), '. 10 20 5 + 30 40 - . 40 100 min. max.')
  t.equal(postfixer('max(10, 20 + 5, min ( 40, 100) * 4,30 - 40)'), '. 10 20 5 + . 40 100 min. 4 * 30 40 - max.')

  t.end()
})

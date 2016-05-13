const test = require('tape')
var calc = require('../calc')

test('is an operator test', function (t) {
  t.equal(calc.isOperator('+'), true)
  t.equal(calc.isOperator('-'), true)
  t.equal(calc.isOperator('*'), true)
  t.equal(calc.isOperator(':'), true)
  t.equal(calc.isOperator('%'), true)
  t.equal(calc.isOperator('/'), true)

  t.equal(calc.isOperator(' +'), false)
  t.equal(calc.isOperator('- '), false)
  t.equal(calc.isOperator(' *'), false)
  t.equal(calc.isOperator(': '), false)
  t.equal(calc.isOperator(' %'), false)
  t.equal(calc.isOperator('/ '), false)

  t.equal(calc.isOperator('.'), false)
  t.equal(calc.isOperator('n'), false)

  t.end()
})

module.exports = function (test) {
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
    t.equal(postfixer('(abs[1] + 2) * 3 + E'), 'abs[1] 2 + 3 * E +')
    t.equal(postfixer('(PI     + 2) * 3 + E'), 'PI 2 + 3 * E +')
    t.equal(postfixer('(PI     + 2/ 10) * 3 + (E-19 )'), 'PI 2 10 / + 3 * E 19 - +')
    t.equal(postfixer('(1 + 2 - 3*(PI + 10))'), '1 2 + 3 PI 10 + * -')

    t.equal(postfixer('1 + (-2)'), '1 -2 +')
    t.equal(postfixer('1 + - 2'), '1 -2 +')
    t.equal(postfixer('-1 + - 2'), '-1 -2 +')

    t.end()
  })
}

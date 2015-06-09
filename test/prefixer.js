const test = require('tape'),
      prefixer = require('../prefixer')

test('expression type test', function (t) {
    t.plan(3)

    t.equal(prefixer.getExpressionType('1 + (2 - 10) * E'), prefixer.INFIX)
    t.equal(prefixer.getExpressionType('+ 1 * - 2 10 E'), prefixer.PREFIX)
    t.equal(prefixer.getExpressionType(' 1 E 2 10 - * +'), prefixer.POSTFIX)
})

test('infix to prefix test', function (t) {
    t.equal(prefixer.getExpressionType('1 + (2 - 10) * E'), prefixer.INFIX)
    t.equal(prefixer.getExpressionType('+ 1 * - 2 10 E'), prefixer.PREFIX)
    t.equal(prefixer.getExpressionType(' 1 E 2 10 - * +'), prefixer.POSTFIX)

    t.end()
})

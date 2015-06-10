module.exports = function (test) {
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
      t.equal(rst, 6)
    })

    t.end()
  })
}

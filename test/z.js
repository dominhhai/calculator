const test = require('tape')
var app = require('../app')

test('func - postfix test', function (t) {
  t.equal(app('1 3 +'), 4)

  t.equal(app('. 3 0 -2 19 min.'), -2)

  t.equal(app('. 3 0 -2 19 max.'), 19)

  t.equal(app('. -1 abs. 10 +'), 11)

  t.equal(app('. 2 . 2 3 pow. - max.'), -6)

  t.end()
})

test('func - prefix test', function (t) {
  t.equal(app('+ 1 3'), 4)

  t.equal(app('.min 3 0 -2 19 .'), -2)

  t.equal(app('.max 3 0 -2 19 .'), 19)

  t.equal(app('+ .abs -1 . 10'), 11)

  t.equal(app('.max - 2 .pow 2 3 . .'), -6)

  t.end()
})

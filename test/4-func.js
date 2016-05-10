const test = require('tape')
var app = require('../app')

test('func - postfix test', function (t) {
  t.equal(app('1 3 +'), 4)

  t.equal(app('. 3 0 -2 10 - 19 min.'), -12)

  t.equal(app('. 3 0 -2 19 max.'), 19)

  t.equal(app('. 3 20 + 0 -2 19 max.'), 23)

  t.equal(app('. -1 abs. 10 +'), 11)

  t.equal(app('. 2 . 2 3 pow. - max.'), -6)

  t.equal(app('. 1 2 - abs.'), 1)
  t.equal(app('. 1 2 - abs.'), 1)
  t.equal(app('. 5 . 1 3 - abs. pow.'), 25)
  t.equal(app('. 10 20 30 min.'), 10)
  t.equal(app('. 10 20 5 + 30 40 - max.'), 25)

  t.equal(app('. 10 20 5 + 30 40 - . 40 100 min. max.'), 40)
  t.equal(app('. 10 20 5 + . 40 100 min. 4 * 30 40 - max.'), 160)

  t.equal(app('0!'), 1)
  t.equal(app('1!'), 1)
  t.equal(app('3!'), 6)
  t.equal(app('4! 1 +'), 25)
  t.equal(app('5! 100 -'), 20)

  t.end()
})

test('func - prefix test', function (t) {
  t.equal(app('+ 1 3'), 4)

  t.equal(app('.min 3 0 -2 19 .'), -2)

  t.equal(app('.max 3 0 -2 19 .'), 19)

  t.equal(app('+ .abs -1 . 10'), 11)

  t.equal(app('.max - 2 .pow 2 3 . .'), -6)

  t.equal(app('+ 4! 1'), 25)
  t.equal(app('- 5! 100'), 20)

  t.end()
})

test('func - infix test', function (t) {
  t.equal(app('abs(1 - 2)'), 1)
  t.equal(app('|1 - 2|'), 1)
  t.equal(app('pow(5,|1 - 4|)'), 125)
  t.equal(app('min(10, 20, 30)'), 10)
  t.equal(app('max(10, 20 + 5, 30 - 40)'), 25)

  t.equal(app('max(10, 20 + 5, 30 - 40, min ( 40, 100))'), 40)
  t.equal(app('max(10, 20 + 5, min ( 40, 100) * 4,30 - 40)'), 160)

  t.equal(app('4! + 1'), 25)
  t.equal(app('5! - 100'), 20)

  t.end()
})

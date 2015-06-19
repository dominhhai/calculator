const test = require('tape')
var app = require('../app')

test('func - postfix test', function (t) {
  t.equal(app('1 3 +'), 4)

  t.equal(app(') 3 0 -2 19 min('), 4)

  t.equal(app(') 3 0 -2 19 max('), 4)

  t.equal(app(') -1 abs( 10 +'), 4)

  t.equal(app(') 2 ) 2 3 pow( - max('), 4)

  t.end()
})

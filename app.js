const calc = require('./calc')

var exp = process.argv[2]

calc(exp, function (rst) {
  console.log(rst)
})

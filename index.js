const app = require('./app')

var exp = process.argv[2]

app(exp, function (rst) {
  console.log(rst)
})

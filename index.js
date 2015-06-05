const app = require('./app')

var exp = process.argv.slice(2).join(' ').trim()

app(exp, function (rst) {
  console.log(rst)
})

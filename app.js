const toPrefix = require('./prefixer')
const calc = require('./calc')

module.exports = function app (exp, cb) {
  // convert to prefix notation
  exp = toPrefix(exp)
  console.log(exp)
  var stack = []
  // scan the prefix expression from right to left
  var token = ''
  for (var i = exp.length - 1; i >= 0; i--) {
    var char = exp[i]
    if (char !== ' ') {
      token = char + token
    }
    if ((char === ' ' || i === 0) && token.length > 0) {
      if (calc.isOperator(token)) {
        var rst = calc(token, Number(stack.pop()), Number(stack.pop()))
        stack.push(rst)
      } else {
        stack.push(token)
      }
      // reset token
      token = ''
    }
  }

  cb(stack.pop())
}
const toPrefix = require('./to_prefix')

module.exports = function cal (exp, cb) {
  // convert to prefix notation
  exp = toPrefix(exp)
  var stack = []
  // scan the prefix expression from right to left
  var token = ''
  for (var i = exp.length - 1; i >= 0; i--) {
    var char = exp[i]
    if (char !== ' ') {
      token = char + token
    }
    if ((char === ' ' || i === 0) && token.length > 0) {
      if (toPrefix.isOperator(token)) {
        var rst = calc(token, stack.pop(), stack.pop())
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

function calc (operator, o1, o2) {
  o1 = Number(o1)
  o2 = Number(o2)
  switch (operator) {
    case '*':
      return o1 * o2
    case '/':
      return o1 / o2
    case '+':
      return o1 + o2
    case '-':
      return o1 - o2
    default:
      throw new Error('`' + operator + '` is not a valid operator')
  }
}

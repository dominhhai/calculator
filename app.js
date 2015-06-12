const postfixer = require('./postfixer')
const calc = require('./calc')

module.exports = function app (exp, cb) {
  if (calc.isNumber(exp)) return cb(Number(exp))

  var type = postfixer.getExpressionType(exp)
  var rst = null
  if (type === postfixer.PREFIX) {
    rst = calcPrefix(exp)
  } else {
    // convert to postfix notation
    if (type === postfixer.INFIX) {
      exp = postfixer(exp)
    }
    rst = calcPostfix(exp)
  }

  cb(rst)
}

function calcPrefix (exp) {
  var stack = []
  // scan the prefix expression from right to left
  var token = ''
  for (var i = exp.length - 1; i >= 0; i--) {
    var char = exp[i]
    if (char !== ' ') {
      token = char + token
    }
    if ((char === ' ' || i === 0) && token) {
      if (calc.isOperator(token)) {
        var rst = calc(token, getValue(stack.pop()), getValue(stack.pop()))
        stack.push(rst)
      } else {
        stack.push(token)
      }
      // reset token
      token = ''
    }
  }

  return stack.pop()
}

function calcPostfix (exp) {
  var stack = []
  // scan the postfix expression from left to right
  var token = ''

  for (var i = 0; i < exp.length; i++) {
    var char = exp[i]
    if (char !== ' ') {
      token = token + char
    }
    if ((char === ' ' || i === exp.length - 1) && token) {
      if (calc.isOperator(token)) {
        var o2 = getValue(stack.pop())
        var o1 = getValue(stack.pop())
        var rst = calc(token, o1, o2)
        stack.push(rst)
      } else {
        stack.push(token)
      }
      token = ''
    }
  }

  return stack.pop()
}

function getValue (exp) {
  if (calc.isNumber(exp)) return Number(exp)
  for (var op in calc.EXTEND) {
    var rsl = calc.EXTEND[op](exp)
    if (rsl !== null) {
      return rsl
    }
  }

  return calc(exp)
}

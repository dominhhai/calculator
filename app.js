const toPrefix = require('./prefixer')
const calc = require('./calc')

module.exports = function app (exp, cb) {
  var type = toPrefix.getExpressionType(exp)
  var rst = null
  if (type === toPrefix.POSTFIX) {
    rst = postfixCalc(exp)
  } else {
    // convert to prefix notation
    if (type === toPrefix.INFIX) {
      exp = toPrefix(exp)
    }    
    rst = prefixCalc(exp)
  }

  cb(rst)
}

function prefixCalc(exp) {
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

  return stack.pop()
}

function postfixCalc (exp) {
  var stack = []
  // scan the prefix expression from right to left
  var token = ''

  for (var i = 0; i < exp.length; i ++) {
    var char = exp[i]
    if (char !== ' ') {
      token = token + char
    }
    if ((char === ' ' || i === exp.length - 1) && token.length > 0) {
      if (calc.isOperator(token)) {
        var rst = calc(token, Number(stack.pop()), Number(stack.pop()))
        stack.push(rst)
      } else {
        stack.push(token)
      }
      token = ''
    }
  }

  return stack.pop()
}

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
      console.log(exp)
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
        var rst = calc(token, getValue(stack.pop()), getValue(stack.pop()))
        stack.push(rst)
      } else {
        stack.push(token)
      }
      token = ''
    }
  }

  return stack.pop()
}

function getValue(exp) {
  if (calc.isNumber(exp)) return Number(exp)
  var i = exp.indexOf('[')
  if (i === -1) return calc(exp)
  var func = exp.substring(0, i),
      args = exp.substring(i + 1, exp.length - 1)
  args = args.split(',')
  args.map(function (val) {
    return Number(val)
  })
  args.unshift(func)
  return calc.apply(null, args)
}

// infix to postfix conversion
const INFIX = 'INFIX'
const PREFIX = 'PREFIX'
const POSTFIX = 'POSTFIX'

const OPEN = '('
const CLOSE = ')'
const SPACE = ' '

// TODO: match with calc.js:EXTEND ?
const MATH_EXTEND = {
  '[': ']',
  '(': ')',
  '|': '|'
}

// math function endpoint
const MATH_EP = '.'

const isOperator = require('./calc').isOperator

function getExpressionType (exp) {
  if (isOperator(exp[exp.length - 1]) || (exp.length > 2 && exp[exp.length - 1] === MATH_EP && exp[exp.length - 2] !== ' ')) return POSTFIX
  if (isOperator(exp[0]) || exp[0] === MATH_EP) {
    // negative number -> infix notation
    if (exp.length > 1 && exp[1] >= '0' && exp[1] <= '9') return INFIX
    return PREFIX
  }

  return INFIX
}

// TODO: match with calc.js:OPERATOR ?
function getPriority (op) {
  if (op === '+' || op === '-') return 1
  if (op === '*' || op === ':') return 2
  if (op === '%') return 3
  if (op === '/') return 4
  return 0
}

exports = module.exports = function toPostfixNotation (exp) {
  var out = []
  var stack = []

  // flag for allowing negative number in the next time
  // negative number will be only existed whether
  // 1. begin of expression
  // 2. after `(`
  // 3. after an operator
  var nega = true
  // skip handle when meet Math's functions
  var skip = []

  var token = ''
  for (var i = 0, j = exp.length; i < j; i++) {
    var cur = exp[i]

    if (cur === SPACE) continue

    // handle Math's functions
    if (skip.length > 0) {
      if (cur === MATH_EXTEND[skip[skip.length - 1]]) {
        removeFunction()
        continue
      } else if (cur === ',') {
        removeComma()
        continue
      }
    }

    if (isOperator(cur)) {
      var curPri = getPriority(cur)

      if (nega) {
        if (curPri === 1) { // negative or positive number
          token = cur + token
        } else {
          throw new Error(exp + ' is NOT valid expression')
        }

        disableNega()
      } else {
        addOperate()
        while (stack.length > 0 && curPri <= getPriority(stack[stack.length - 1])) {
          out.push(stack.pop())
        }
        stack.push(cur)

        enableNega()
      }
    } else if (cur === OPEN) {
      // token is the math's function name
      if (token) {
        addFunction(cur)
      } else {
        addOperate()

        stack.push(cur)
      }

      enableNega()
    } else if (cur === CLOSE) {
      addOperate()

      var op = null
      while (stack.length > 0 && (op = stack.pop()) !== OPEN) {
        out.push(op)
      }

      disableNega()
    } else {
      if (MATH_EXTEND.hasOwnProperty(cur)) {
        addFunction(cur)
        enableNega()
      } else {
        token += cur
        disableNega()
      }
    }
  }
  // final token
  addOperate()
  while (stack.length > 0) out.push(stack.pop())

  return out.join(SPACE)

  // add operate to output
  function addOperate () {
    if (token) {
      out.push(token)
      token = ''
    }
  }

  function addFunction (cur) {
    out.push(MATH_EP)
    if (!token) token = 'abs'
    stack.push(token + MATH_EP)
    token = ''
    skip.push(cur)
  }

  function removeFunction () {
    if (token) {
      out.push(token)
      token = ''
    }
    while (stack.length > 0) {
      var o = stack.pop()
      out.push(o)
      if (o.substr(o.length - MATH_EP.length) === MATH_EP) break
    }
    skip.pop()
  }

  function removeComma () {
    if (token) {
      out.push(token)
      token = ''
    }
    while (stack.length > 0) {
      var o = stack.pop()
      if (o.substr(o.length - MATH_EP.length) === MATH_EP) {
        stack.push(o)
        break
      } else {
        out.push(o)
      }
    }
  }

  function enableNega () {
    setNega(true)
  }

  function disableNega () {
    setNega(false)
  }

  function setNega (flag) {
    if (nega !== flag) {
      nega = flag
    }
  }
}

exports.PREFIX = PREFIX
exports.INFIX = INFIX
exports.POSTFIX = POSTFIX
exports.MATH_EP = MATH_EP

exports.getExpressionType = getExpressionType

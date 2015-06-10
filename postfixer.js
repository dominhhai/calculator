// infix to postfix conversion
const INFIX = 'INFIX',
      PREFIX = 'PREFIX',
      POSTFIX = 'POSTFIX'

const OPEN = '(',
      CLOSE = ')',
      SPACE = ' '

const isOperator = require('./calc').isOperator

function getExpressionType (exp) {
  if (isOperator(exp[exp.length - 1])) return POSTFIX
  if (isOperator(exp[0])) {
    // negative number -> infix notation
    if (exp.length > 1 && exp[1] >= '0' && exp[1] <= '9') return INFIX
    return PREFIX
  }

  return INFIX
}

function getPriority (op) {
  if (op === '+' || op === '-') return 1
  if (op === '*' || op === '/') return 2
  if (op === '^') return 3
  return 0
}

exports = module.exports = function toPostfixNotation (exp) {
  var out = [],
      stack = []

  // flag for allowing negative number in the next time
  // negative number will be only existed whether
  // 1. begin of expression
  // 2. after `(`
  // 3. after an operator
  var nega = true

  var token = ''
  for (var i = 0, j = exp.length; i < j; i++) {
    var cur = exp[i]

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
      addOperate()

      stack.push(cur)

      enableNega()
    } else if (cur === CLOSE) {
      addOperate()

      var op = null
      while (stack.length > 0 && (op = stack.pop()) !== OPEN) {
        out.push(op)
      }

      disableNega()
    } else if (cur !== SPACE) {
      token += cur

      disableNega()
    }
  }
  // final token
  addOperate()
  while (stack.length > 0) out.push(stack.pop())

  return out.join(SPACE)

  // add operate to output
  function addOperate () {
    if (token.length > 0) {
      out.push(token)
      token = ''
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

exports.getExpressionType = getExpressionType

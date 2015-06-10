// infix to postfix conversion
const INFIX = 'INFIX',
      PREFIX = 'PREFIX',
      POSTFIX = 'POSTFIX'

const OPEN = '(',
      CLOSE = ')',
      SPACE = ' '

const isOperator = require('./calc').isOperator

function getExpressionType (exp) {
  if (isOperator(exp[0])) return PREFIX
  if (isOperator(exp[exp.length - 1])) return POSTFIX
  return INFIX
}

function getPriority (op) {
  if (op === '+' || op === '-') return 1
  if (op === '*' || op === '/') return 2
  return 0
}

exports = module.exports = function toPostfixNotation (exp) {
  var out = [],
      stack = []

  var token = ''
  for (var i = 0, j = exp.length; i < j; i++) {
    var cur = exp[i]

    if (isOperator(cur)) {
      addOperate()

      var curPri = getPriority(cur)
      while (stack.length > 0 && curPri <= getPriority(stack[stack.length - 1])) {
        out.push(stack.pop())
      }
      stack.push(cur)
    } else if (cur === OPEN) {
      addOperate()

      stack.push(cur)
    } else if (cur === CLOSE) {
      addOperate()

      var op = null
      while (stack.length > 0 && (op = stack.pop()) !== OPEN) {
        out.push(op)
      }
    } else if (cur !== SPACE) {
      token += cur
    }
  }
  // final token
  addOperate()
  while (stack.length > 0) out.push(stack.pop())

  return out.join(SPACE)

  // add operate to output
  function addOperate () {
    if (token.length < 1) return
    out.push(token)
    token = ''
  }
}

exports.PREFIX = PREFIX
exports.INFIX = INFIX
exports.POSTFIX = POSTFIX

exports.getExpressionType = getExpressionType

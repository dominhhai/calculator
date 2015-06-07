// infix to prefix conversion
const INFIX = 'INFIX'
const PREFIX = 'PREFIX'
const POSTFIX = 'POSTFIX'

const isOperator = require('./calc').isOperator

function getExpressionType (exp) {
  if (isOperator(exp[0])) return PREFIX
  if (isOperator(exp[exp.length - 1])) return POSTFIX
  return INFIX
}

function isLowerPrecedence (o1, o2) {
  return (o1 === '+' || o1 === '-') && (o2 === '*' || o2 === '/')
}

function add2Out (out, tmp) {
  var j = null
  while (tmp.length > 0 && (j = tmp.pop()) !== ')') {
    out.push(j)
  }
}

exports = module.exports = function toPrefixNotation (exp) {
  var out = [],
      tmp = []

  var token = ''
  for (var i = exp.length - 1; i >= 0; i--) {
    var char = exp[i]

    if (char !== ')' && char !== '(' && char !== ' ') {
      token = char + token
    }

    if ((char === ' ' || char === ')' || char === '(' || i === 0) && token.length > 0) {
      if (char === ')') {
        tmp.push(char)
      }
      if (isOperator(token)) {
        while (tmp.length > 0 && isOperator(tmp[tmp.length - 1]) 
                && isLowerPrecedence(token, tmp[tmp.length - 1])) {
          out.push(tmp.pop())
        }
        tmp.push(token)
      } else {
        out.push(token)
      }
      if (char === '(') {
        add2Out(out, tmp)
      }

      token = ''
    }
  }
  add2Out(out, tmp)

  console.log(out)

  return out.reverse().join(' ')
}

exports.PREFIX = PREFIX
exports.INFIX = INFIX
exports.POSTFIX = POSTFIX

exports.getExpressionType = getExpressionType

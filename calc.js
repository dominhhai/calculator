// TODO handle the overflow
// ES6 support?

// define math operators
const OPERATOR = {
  '+': function add (o1, o2) {
    return o1 + o2
  },
  '-': function substract (o1, o2) {
    return o1 - o2
  },
  '*': function multiply (o1, o2) {
    return o1 * o2
  },
  ':': function divide (o1, o2) {
    return o1 / o2
  },
  '%': function modulo (o1, o2) {
    return o1 % o2
  },
  '/': function fractal (o1, o2) {
    return o1 / o2
  }
}

function factorial (n) {
  if (n === 0) return 1
  else return n * factorial(n - 1)
}

// define math common constants, and functions
const MATH = Math

const EXTEND = {
  '^': function pow (exp) {
    var i = exp.indexOf('^')
    if (i === -1) return null
    var o1 = exp.substring(0, i)
    var o2 = exp.substring(i + 1, exp.length)
    return Math.pow(o1, o2)
  },
  '|': function abs (exp) {
    var i = exp.indexOf('|')
    if (i === -1) return null
    return Math.abs(exp.substring(1, exp.length - 1))
  },
  '!': function fact (exp) {
    if (exp.charAt(exp.length - 1) !== '!') return null
    return factorial(parseInt(exp.substr(0, exp.length - 1), 10))
  }
}

function isOperator (token) {
  return OPERATOR.hasOwnProperty(token)
}

function isNumber (num) {
  return !isNaN(num)
}

function isConst (token) {
  return MATH.hasOwnProperty(token) && isNumber(MATH[token])
}

exports = module.exports = function calc (cmd) {
  var argv = arguments
  var length = argv.length

  if (length === 1) return MATH[cmd]

  if (argv.length === 3 && isOperator(cmd)) {
    return OPERATOR[cmd](argv[1], argv[2])
  }

  return MATH[cmd].apply(null, Array.prototype.slice.call(argv, 1))
}

exports.OPERATOR = OPERATOR
exports.MATH = MATH
exports.EXTEND = EXTEND
exports.isOperator = isOperator
exports.isNumber = isNumber
exports.isConst = isConst

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
  '*': function product (o1, o2) {
    return o1 * o2
  },
  '/': function divide (o1, o2) {
    return o1 / o2
  }
}

// define math common constants, and functions
const MATH = Math

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
  var argv = arguments,
      length = argv.length

  if (length === 1) return MATH[cmd]

  if (argv.length === 3 && isOperator(cmd)) {
    return OPERATOR[cmd](argv[1], argv[2])
  }

  return MATH[cmd].apply(null, Array.prototype.slice.call(argv, 1))
}

exports.OPERATOR = OPERATOR
exports.MATH = MATH
exports.isOperator = isOperator
exports.isNumber = isNumber
exports.isConst = isConst
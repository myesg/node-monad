const R = require('ramda')
const Either = require('./either')
const data = require('./data')
const stringData = (data)

const STRING_CANNOT_B_EMPTY = require('./Exception').STRING_CANNOT_B_EMPTY
const NOT_AN_INT = require('./Exception').NOT_AN_INT

// getName::object -> any
const getName = R.prop('name')

// getValue::object -> any
const getValue = R.prop('value')

// getLengt::object -> any
const getLength = R.prop('length')

// isNumber::any -> bool
const isNumber = R.is(Number)

// safeLength::string -> Either Failure integer
const safeLength = R.cond([
                           [R.isNil, R.always(Either.Failure(STRING_CANNOT_B_EMPTY))],
                           [R.T, R.pipe(getLength, Either.Success)]
])

// safeMultiplyBy2::integer -> Either Failure integer
const safeMultiplyBy2 = R.cond([
                              [isNumber, R.pipe(R.multiply(2), Either.Success)],
                              [R.T, R.always(Either.Failure(NOT_AN_INT))]
])
// operation :: string -> any

var tap = function (value) {
  console.log(value)
  return value
}

var safeParse = Either.try(JSON.parse)

const operation = R.pipe(safeParse, tap, R.map(getName), tap, R.chain(safeLength), tap, R.chain(R.inc), tap, R.chain(safeMultiplyBy2), getValue)
console.log(operation(stringData))

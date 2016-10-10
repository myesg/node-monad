const R = require('ramda')
const Either = require('./either')
const data = require('./data')
const stringData = JSON.stringify(data)
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
                           [R.T, R.always(Either.Failure(STRING_CANNOT_B_EMPTY))],
                           [R.T, R.pipe(getLength, Either.Success)]
])

// safeMultiplyBy2::integer -> Either Failure integer
const safeMultiplyBy2 = R.cond([
                              [isNumber, R.pipe(R.multiply(2), Either.Success)],
                              [R.T, R.always(Either.Failure(NOT_AN_INT))]
])

// tap :: a' -> a'
const tap = function (value) {
  console.log(value)
  return value
}

const handleError = function (eitherObject) {
  if (eitherObject.isFailure) {
    console.log('Failed:  ' + eitherObject.value.toString())
    if (eitherObject.value instanceof Error)
      console.log('Stack:  ' + eitherObject.value.stack)
    return
  }
  console.log('success:  ', eitherObject.value)
  return getValue(eitherObject)
}

const safeParse = Either.try(JSON.parse)

// operation :: string -> any
const operation = R.pipe(safeParse, R.map(getName), R.chain(safeLength), tap, R.map(R.inc), R.chain(safeMultiplyBy2), handleError)
console.log(operation(stringData))

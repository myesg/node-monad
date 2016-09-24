const R = require('ramda')
const Either = require('ramda-fantasy').Either
const data = require("./data")
const stringData = JSON.stringify(data)

const STRING_CANNOT_B_EMPTY = require("./Exception").STRING_CANNOT_B_EMPTY
const NOT_AN_INT = require("./Exception").NOT_AN_INT

// getName::object -> any
const getName = R.prop("name")

// getValue::object -> any
const getValue = R.prop('value')
// getLengt::object -> any
const getLength = R.prop('length')

// isNumber::any -> bool
const isNumber= R.is(Number)

// safeLength::string -> Either Failure integer
const safeLength = R.cond([
                           [R.isNil,R.always(Either.Left(STRING_CANNOT_B_EMPTY))] ,
                           [R.T , R.pipe(getLength,Either.Right)]
                          ])

// safeMultiplyBy2::integer -> Either Failure integer
const safeMultiplyBy2=R.cond([
                              [isNumber,R.pipe(R.multiply(2),Either.Left)] ,
                              [R.T , R.always(Either.Left(NOT_AN_INT))]
                             ])
// operation :: string -> any
const operation = R.pipe(JSON.parse, getName, safeLength, R.map(R.inc), R.chain(safeMultiplyBy2), getValue)

console.log(operation(stringData))

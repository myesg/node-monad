const Failure = require("./types").Failure

const STRING_CANNOT_B_EMPTY = new Failure("String cannot be empty")
const NOT_AN_INT = new Failure("Not an Int")

const toExport = {}

toExport.STRING_CANNOT_B_EMPTY = STRING_CANNOT_B_EMPTY
toExport.NOT_AN_INT = NOT_AN_INT

module.exports = toExport

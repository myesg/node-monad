// Util functions

var noop = function () { return this }
var cloneObject = Object.create

// Constructors
function Either () {}

function Success (value) {
  this.value = value
}

function Failure (value) {
  this.value = value
}

Success.prototype = cloneObject(Either)
Failure.prototype = cloneObject(Either)

Either.of = value => new Success(value)
Either.prototype.of = Either.of

Success.of = value => new Success(value)
Success.prototype.of = Success.of

Failure.of = noop
Failure.prototype.of = Failure.of

Either.Success = value => new Success(value)
Either.Failure = value => new Failure(value)

// Predicates
Either.prototype.isSuccess = false
Either.prototype.isFailure = false

Success.prototype.isSuccess = true
Failure.prototype.isFailure = true

Success.prototype.map = function (func) {
  return new Success(func(this.value))
}
Failure.prototype.map = noop

Success.prototype.chain = function (func) {
  return func(this.value)
}
Failure.prototype.chain = noop

Either.try = function (func) {
  return function () {
    try {
      return new Success(func.apply(null, arguments))
    } catch (exception) {
      return new Failure(exception)
    }
  }
}

module.exports = Either

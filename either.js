// Util functions

var noop = function () { return this }
var cloneObject = Object.create


// Constructors
var Either =  {}

function Success (value) {
  this.value = value
}

function Failure (value) {
  this.value = value
}

Success.prototype = cloneObject(Either)
Failure.prototype = cloneObject(Either)

Success.prototype.constructor = Success
Failure.prototype.constructor = Failure

Either.of = value => new Success(value)

Either.empty = value => new Success([])

Success.of = value => new Success(value)
Success.prototype.of = Success.of

Failure.of = noop
Failure.prototype.of = Failure.of

Either.Success = value => new Success(value)
Either.Failure = value => new Failure(value)

// Predicates
Either.isSuccess = false
Either.isFailure = false

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

function concat(one,two){
   return Array.isArray(one)? one.concat(two) : [one].concat(two)
}

Either.concat = Success.prototype.concat = Failure.prototype.concat = function (toConcat) {
  if (toConcat.isFailure && this.isFailure) {
    return new Failure(concat(this.value,toConcat.value))
  }
  else if(this.isSuccess && toConcat.isSuccess){
    return new Success(concat(this.value,toConcat.value))
  }
  else if(this.isFailure && toConcat.isSuccess){
    return new Failure(this.value)
  }
  else {
    return new Failure(toConcat.value)
  }
}
module.exports = Either


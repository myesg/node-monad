function Failure(error){
        Error.captureStackTrace(this)
        this.error = error
}


Failure.prototype = Object.create(Error.prototype)
module.exports = Failure

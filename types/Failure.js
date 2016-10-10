function Failure(error){
        Error.captureStackTrace(this)
        this.error = error
}


Failure.prototype = Object.create(Error.prototype)
Failure.prototype.toString = function(){
        return this.error
}
module.exports = Failure

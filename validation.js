const R = require('ramda')
const Either = require('./either')
const data = {
  email: '',
  firstName: 'ssdd',
  lastName: '',
  password: ''
}

const validateEmptyEmail = x => x != '' ? Either.Success(true) : Either.Failure('Empty Email')
const validateEmptyFirstName = x => x != '' ? Either.Success(true) : Either.Failure('Empty FirstName')
const isEmailEmpty = R.pipe(R.prop('email'), validateEmptyEmail)
const isFirstNameEmpty = R.pipe(R.prop('firstName'), validateEmptyFirstName)
const Validate = data => R.reduce(R.concat, Either.empty(), [isFirstNameEmpty(data), isEmailEmpty(data)])


console.log(Validate(data))


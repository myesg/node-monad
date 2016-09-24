# node-monad


## Using the Either Monad to handle exceptions

# Either

The `Either` type is often used to represent the notion of failure in some way.The error represented with an `Either` can hold some value (perhaps an
exception or error message)

While the `Either` type is often used to represent potential errors, there is
nothing restricting it to this purpose. It is therefore perhaps more appropriate
to simply think of `Either` as a representation of two possible types of values,
sometimes referred to as the _disjoint union_, or _coproduct_ of two types.

## Construction

The `Either` type consists of two constructors, `Left :: a -> Either a b` and
`Right :: b -> Either a b`. When an `Either` type is used to represent the
possibility of an error, `Left` is typically used to hold the error value and
`Right` holds the "successful" value (as a mnemonic, you can think of `Right` as
being _the right_ value).

It is worth highlighting that the types of the value stored in an `Left` does
not have to be the same type as that in the `Right` of the same `Either`. This
is the reason why it is documented as having two type parameters `Either a b`,
where `a` represents the type contained within the `Left` and `b` for the value
contained in the `Right`.

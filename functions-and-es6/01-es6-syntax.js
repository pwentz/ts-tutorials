"use strict";

// let
//  - just like "var", except variable is block-scoped
function varVsLet() {
  if (true) {
    var x = 'wow'
    let y = 'wow'
  }
  // console.log(x)
  // console.log(y)
}
varVsLet()



// const
//   - unable to be reassigned
//   - does NOT mean immutability
const x = [1, 2, 3]
try {
  x = [4, 5, 6]
} catch (e) {
  console.log('ERROR:', e.message)
}

x.reverse()
console.log(x)

// // ---------------------- rule of thumb ----------------------
// //    get used to using const as much as possible



console.log('---------------------- parameter handling ----------------------')
console.log('------------ default args ------------')

// we can use an `=` sign to provide a default argument to a function
function logDefault(elt = "hi") { console.log('default:', elt) }
function logPipes(elt) { console.log('pipes:', elt || 'hi') }

logDefault()
logPipes()

// default arguments will _only_ default if the argument is undefined
logDefault(undefined)
logDefault(null)
logDefault(0)
logDefault('')

logPipes(null)
logPipes(0)
logPipes('')




console.log('------------ rest parameters ------------')
// instead of 'arguments' in es5, rest parameters allow us to aggregate remaining args
function logRest(x, ...xs) { console.log(`head: ${x}, rest: ${xs}`) }
logRest('a', 'b', 'c', 'd')

function logArgs(...args) { console.log(`Args: ${args}`) }
logArgs('a', 'b', 'c', 'd')




console.log('------------ spread operator ------------')
console.log('------------ arrays ------------')
// opposite of rest params: spread elements of an iterable collection into both literal
// elements and function parameters
//    - doesn't have to be last arg
const abcd = ['a', 'b', 'c', 'd', 'hi']
// into fn params
console.log(...abcd, 'e', 'f')
console.log(abcd, 'e', 'f')

// prepending to list
const myList = [1, 2, 3]
console.log([0, ...myList])

// appending to list
console.log([...myList, 4])

// concat two lists
const myOtherList = [4, 5, ...[6, 7]]
console.log([...myList, ...myOtherList])





console.log('------------ object literals ------------')
// updating object
const myObj = { a: 1, b: 2, c: 3 }
const otherObj = { e: 9 }
console.log({ ...myObj, d: 4, ...otherObj })

// can use variable name for short-hand syntax
const d = 4
console.log({ ...myObj, d })

// right-most values will overwrite
console.log({ ...myObj, c: 4 })
console.log({ c: 4, ...myObj })

// merge two objects
const myOtherObj = { d: 4, e: 5, a: 6 }
console.log({ ...myObj, ...myOtherObj })



console.log('---------------------- destructuring ----------------------')
console.log('------------ arrays ------------')
// can extract any element from an array using destructuring
const [head, ...tail] = ['a', 'b', 'c', 'd']
console.log(head)
console.log(tail)

// skipped the third!
const [fst, snd,, fourth, ...rest] = [1, 2, 3, 4]
console.log(fst)
console.log(snd)
console.log(fourth)
console.log(rest)

// don't have to put rest params
const [valA, valB] = ['a', 'b', 'c', 'd']
console.log(valA)
console.log(valB)

// can use default args here too
const [first, second, third = 3] = [1, 2]
console.log(first)
console.log(second)
console.log(third)

// but the rest parameter will ALWAYS be an array
const [val, ...vals] = []
console.log(val)
console.log(vals)




console.log('------------ object literals ------------')
// keys become variable names
console.log(someObj)
var someObj = { hi: 'wow', neat: 'cool', rad: { fun: 'swell' } }
const { hi, neat, ...restObj } = someObj
console.log(hi)
console.log(neat)
console.log(restObj)

// can use custom variable name too
const { hi: myKey } = someObj
console.log(myKey)

// nested destructure
const { rad: { fun: myNestedKey } } = someObj
console.log(myNestedKey)

// default args
const { missingKey = 'well' } = someObj
console.log(missingKey)

// default args only work with undefined (not falsey) values
const { zeroKey = 'not zero' } = { zeroKey: 0 }
console.log(zeroKey)

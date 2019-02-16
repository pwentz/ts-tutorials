// There are NAMED functions and ANONYMOUS functions
//
// similar to Ruby where "blocks" are just anonymous functions

// only difference between the bottom 2 is that the named fn "hoists"
console.log(addOne(10))

try {
  console.log(minusOne(10))
} catch (e) {
  console.log("ERROR: ", e.message) // minusOne is not a function
}

// named
function addOne(x) {
  return x + 1
}

// anonymous
var minusOne = function(x) {
  return x - 1
}


// why use anonymous functions?
//    -- IIFE
//    -- single use (passing fn as argument)

// wrap in parens to immediately invoke
// commonly seen as top-most "main" fn for Node applications
((function(xs) { console.log(xs + ['tail']) })(['head']))

function logFn(fn) { console.log(fn()) }

// passing as arg
logFn(function() { return "I'm convenient!" })









console.log('------------ arrow functions ------------')
//
// Introduced in ES2016, used for anonymous functions
//  -- take out word "function"
//  -- place fat arrow between parens and braces
var noop =        function() {}
const arrowNoop = () => {}





// with arrow functions, we can omit the curly braces AND return statement
// if our function is a single expression
logFn(() => "I'm very convenient!")
//
// also, if we only have a single argument to the fn, we can even omit the parens around
// the arguments
const plusOne = x => x + 1




// this makes things like currying convenient
const curry = fn => x => y => fn(x, y)
// function curry(fn) {
//   return function(x) {
//     return function(y) {
//       return fn(x, y)
//     }
//   }
// }
const add = curry((x, y) => x + y)
const addTen = add(10)

console.log(addTen(5))
console.log(add(10)(5))
console.log(
  [1, 2, 3].map(add(5))
)

// ---------------------- rule of thumb ----------------------
//    - `const` instead of `function`

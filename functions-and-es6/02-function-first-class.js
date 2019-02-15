// In JS (as in Ruby), functions are "first-class citizens"
//    -- can be saved as a variable
//    -- can be returned from a function
//    -- can be passed into a function
//    -- can be stored in a list
//

// But they work a bit different than Ruby. Instead of having to worry
// about procs vs lambdas vs methods, JS just has functions.

// always use "return" when you want your function to return a value
//
function ten() {
  return 10
}

// functions can be referenced just like anything else
console.log(ten)
// we invoke a function with () <- where the args go
console.log(ten())

// so if we want to pass a function to another function, we
// would pass the reference
function runFn(fn) {
  return fn()
}

runFn(ten) // 10
// be careful not to accidentally invoke the function, or
// else you'll pass the value the function returns
runFn(ten())

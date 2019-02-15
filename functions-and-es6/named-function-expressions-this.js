'use strict';
// 5
//
// Function expressions have their "this" value set at the point of invocation:
//  -- each function has its own "this"
//  -- when called as an object method, it will take the "this" of the object it is called on
//  -- will be "undefined" otherwise unless explicitly set

let example = {
  prop: 31,
  func: function() {
    return this && this.prop
  }
}

console.log(example.func())

// if not invoked on object, then context will be undefined (in strict mode)

var logFn = function(fn) { console.log(fn()) }
logFn(example.func)

logFn(function() { return example.func() })


// ---------------------------------------------------------------------------------
// What if we want to pass an object method while retaining the original context?
//
//
console.log('------------ bind ------------')
example = {
  prop: 31,
  func: function() {
    return this && this.prop
  },
  funcWithArgs: function(x) {
    return this && (this.prop + x)
  }
}

logFn(example.func)

// can use "bind" to set "this" context of function w/ first argument
//  -- "bind" returns you the same function, except with "this" context applied.
//  -- "bind" does NOT call the function
logFn(example.func.bind(example))

// "bind" can also be used to bind arguments to function, which are passed after "this"
//    -- i.e. partial application
logFn(example.funcWithArgs.bind(example, 10)) // 41

// However using bind for a single-usage like this isn't usually common.

class HousePet {
  constructor(type) {
    this.type = type
    this.noise = this.noise.bind(this)
  }

  noise() {
    if (this === undefined) {
      return "WHO AM I?"
    }

    if (this.type === 'dog') {
      return 'BARK!'
    }

    if (this.type === 'cat') {
      return 'MEOW!'
    }
  }
}

const dog = new HousePet('dog')
logFn(dog.noise)

// We know that in constructor, the "this" will always be the new instance
//  -- so we can bind our function in the constructor to guarantee that it will ALWAYS
//     has the "this" value that we expect.
//  -- another common approach is to use CLASS BOUND ARROW FUNCTION syntax

console.log('------------ call ------------')

// let's say we want to set the "this" during the call?
const logFnAs = function(fn, thisCtx, ...args) {
  console.log(fn.call(thisCtx, ...args))
}

logFnAs(example.func, example)
logFnAs(example.funcWithArgs, example, 10)


// "call" is good to know about, but I don't think I've ever used it.
//    -- given what you now know about how the context of "this" changes,
//       you won't see too many situations where "call" proves super useful

// ---------------------------------------------------------------------------------


class PetOwner {
  constructor() {
    this.name = 'Bob'
    this.pets = ['Baron', 'Harold', 'Arthur']
  }

  description() {
    return this.pets.map(function(pet) {
      return `${this.name} knows an awesome dog named ${pet}.`
    })
  }
}

try {
  console.log(new PetOwner('Amy').description())
} catch (e) {
  console.log('ERROR: ', e.message)
}
//     -- the "this" in the descriptions function is the instance
//     -- however the "this" of the anonymous function we're passing to "map"
//        ends up being undefined because it is not set explicitly
//     -- for these cases, it is best to use arrow functions!


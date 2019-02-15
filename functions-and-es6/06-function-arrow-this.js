'use strict';
// Unlike function expressions, the context ("this") in arrow functions get assigned on declaration:
//   - arrow functions DO NOT have their own "this"
//   - will take the lexical "enclosing" scope of the context it is defined in
let example = {
  prop: 31,
  func: () => this.prop
}

function Example() {
  this.prop = 31
  this.func = () => this.prop
}

// the enclosing scope of the "example" declaration is the global context, so
// the following returns undefined (global object in non-strict mode)
console.log(example.func())
console.log(new Example().func())


// ---------------------------------------------------------------------------------

// So what makes them useful?
//   - convenience!
//     - don't have to worry about "this" getting changed
//     - syntax makes it easy to write quick 1 line computation

// picking up from last example...
class PetOwner {
  constructor(name) {
    this.name = name
    this.pets = ['Baron', 'Harold', 'Arthur']
  }

  description() {
    return this.pets.map((pet) => `${this.name} knows a good dog named ${pet}.`)
  }
}

console.log(new PetOwner('Todd').description())

// ---------------------------------------------------------------------------------
//    Takeaways:
//      - you shouldn't ever need to use "function" expressions
//      - for quick computations or functional js, you can use arrow functions
//      - for OO js, method syntax

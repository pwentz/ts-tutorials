// Pre es6, you would use functions as constructors for prototypes and for
// performing operations
//
// constructor function
function Person(name, age) {
  this.name = name
  this.age = age
}

Person.prototype.salutations = function() {
  return "Hi my name is " + this.name + " and I am " + this.age + " years old!"
}





// es6 classes (just syntactic sugar)
class Human {
  constructor(name, age) {
    this.name = name
    this.age = age
  }

  // new method-like syntax allows for more convenience
  salutations() {
    return `Hi my name is ${this.name} and I am ${this.age} years old!`
  }
}

const sara = new Human('sara', 21)
const bill = new Person('bill', 53)

console.log(new Person("Bill", 52).salutations())
console.log(new Human("Sara", 23).salutations())

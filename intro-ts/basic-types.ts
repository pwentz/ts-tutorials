// ANY
const addNumbers = (x: number, y: number): number => x + y;

const anyValue: any = 'hi';

// compiler does not check
addNumbers(anyValue, 4);

// ---------------------- SCALAR TYPES ----------------------

// encapsulates float, double, int, etc. (js isn't great w/ numbers)
const _number: number = 10;
const _string: string = 'hi';
const _boolean: boolean = true;

// ---------------------- LITERAL TYPES ----------------------
const _stringLiteral: 'hi' = 'hi';
const _objectLiteral: { val: string } = { val: _string };
const _booleanLiteral: false = false;
const _functionLiteral: () => number = () => 10;

// 2 ways to declare functions:

//  1) annotate with type literal after declaration
const longFn: (x: number) => string = n => 'hi';

// 2) annotate args and return value (colons indicate type annotation)
const shortFn = (x: number): string => 'hi';

// ---------------------- UNKNOWN ----------------------
const unknownValue: unknown = 'hi';

// unknown cannot be inferred as any other type, must be asserted first
addNumbers(unknownValue, 4);
// can be asserted to whatever
addNumbers(unknownValue as number, 4);

// ---------------------- NEVER ----------------------
const neverVal: never = 'hi';
const neverFn = (val: never): string => 'hi';
neverFn();
neverFn(undefined);

// ---------------------- VOID ----------------------
// represents the lack of a value
const voidVal: void = undefined;
const voidFn = (val: void): string => 'hi';
const undefinedFn = (val: undefined): string => 'hi';
voidFn();
voidFn(undefined);
voidFn(null);

undefinedFn();
undefinedFn(undefined);
undefinedFn('hi');
// ---------------------- INTERFACE ----------------------
interface IShape {
  readonly length: number;
  width: number;
}

// interfaces can be used to type object literals
const pt: IShape = { length: 10, width: 10 };
// readonly means you can't change once obj is created
pt.length = 12;
pt.width = 25;

// or implemented by classes
class Square implements IShape {
  // public readonly length: number = 15;
  // public readonly width: number = 15;
  public length: number;
  public width: number;

  constructor(l: number) {
    this.length = l;
    this.width = l;
  }
}

const sq: Square = new Square(10);

// sq.width = 15;

// we can annotate with a reference to an interface property w/ square bracket notation
const _length: IShape['length'] = 10;

// interfaces can extend interfaces
interface I3DShape extends IShape {
  depth: number;
}

class Cube extends Square implements I3DShape {
  public depth: number;
  constructor(l: number) {
    super(l);
    this.depth = this.width;
  }
}

// interfaces can be callable (for function overloading)
interface IShapeFactory {
  (length: number, width: number): IShape;
  (length: number, width: number, depth: number): I3DShape;
}

// must declare annotations for each callable instance
function mkShape(l: number, w: number): IShape;
function mkShape(l: number, w: number, d: number): I3DShape;
// generic implementation
function mkShape(...args: number[]): any {
  const [length, width, depth] = args;
  if (args.length === 2) {
    return { length, width };
  }
  return { length, width, depth };
}

// then set overloaded value
const shapeFactory: IShapeFactory = mkShape;

const my2dShape = shapeFactory(10, 20);
const my3dShape = shapeFactory(10, 20, 30);

// ---------------------- ASSERTION ----------------------

// cannot just assert any type
const _str = 'cool';
// _str as number

// if you want to force a type cast, you can cast as unknown first, but this is a sign of incomplete types
const _castStr = (_str as unknown) as number;

// use casting as a last resort

// ---------------------- TYPE ALIAS ----------------------
type MyString = string;

const hi: MyString = 'wow';

// ---------------------- PROPERTY TYPES ---------------------

interface ICircle {
  // optional
  radius?: number;
  diameter?: number;
}

// TODO: revisit this w/ advanced types
const mkCircle = (radius?: number): ICircle => {
  // 1) trying to return below won't compile bc radius could be undefined
  //      { diameter: radius * 2 }
  // 2) but if we null-check them first we can
  if (!radius) {
    return {};
  }

  return { radius, diameter: radius * 2 };
};

// we use optionals/undefined over null

// use void for functions that don't return
const noop = (): void => {
  return;
};

// ---------------------- INDEX --------------------

// sometimes we need to access an object when we don't know the keys at build-time
// TODO: revisit this w/ keyof type
const updateShape = (key: string, value: number, shape: IShape): void => {
  shape[key] = value;
};

// or if we want to have additional properties on our interface for a one-time use case
const xtraCirc: IShape = { length: 10, width: 23, someOtherProperty: 24 };

// to combat this we can declare a homogenous idx type
interface IdxObject {
  [someKey: string]: string;
}

interface Indexable2DShape {
  [shapeKey: string]: number;
  length: number;
  width: number;
}

// or
// interface Indexable2DShape extends IShape {
//   [shapeKey: string]: number
// }

// ---------------------- TYPE GUARDS --------------------

const _mkCircle = (radius?: number): ICircle => {
  // we can write our own null check (explain why we would do this later)
  const isMissing = (val: any): val is void => val === undefined;

  if (isMissing(radius)) {
    return {};
  }

  return { radius, diameter: radius * 2 };
};

// instanceof & typeof

// ---------------------- ENUM --------------------
enum Direction {
  North,
  South,
  East,
  West
}

// standard enums use integers to represent values, which isn't very useful
const dir: Direction.North = 0;

// a little bit more useful is string enums
enum _Direction {
  North = 'north',
  South = 'south',
  East = 'east',
  West = 'west'
}

// enums can be used as concrete values
const _dir = _Direction.North;

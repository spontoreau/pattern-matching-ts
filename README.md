# pattern-matching-ts
A simple &amp; ambitionless pattern matching library built with TypeScript!

## Installation

```bash
$ npm install pattern-matching-ts
```

## Getting started
The library use currying to achieve pattern matching. Nothing really hard to understand if you're familiar with functional programming. Otherwise, you can take a look on [Eric Eliott](https://twitter.com/_ericelliott?lang=fr)'s post: [Curry and Function Composition](https://medium.com/javascript-scene/curry-and-function-composition-2c208d774983).

To match someting, you have to use the **match** function. This one needs a value and a collection of patterns. Each pattern can be built with the **when** function. The **when** combine a condition and something to execute. If the condition succeed then the result will be returned by the function to execute.

Also, a wildcare is available as the last parameter to handle the default return if no pattern is matched (this parameter is optional).

Example with JavaScript:
```javascript
import { match, when } from "pattern-matching-ts";

const isJohnOrEvelyn = (name) => {
  return match(name)(
    when(n => n === "John")((n /* original value is available as a parameter */) => true),
    when(n => n === "Evelyn")(() => true)
  )(() => false);
};

const isJohn = isJohnOrEvelyn("John"); // true
const isEvelyn = isJohnOrEvelyn("Eveyln"); // true
const isNotJohnOrEvelyn = isJohnOrEvelyn("Mike"); // false
```

This library is built with TypeScript so types are inferred correctly:

```typescript
import { match, when } from "pattern-matching-ts";

const isJohn: boolean = match("John")(
  when(n => n === "John")(() => true)
)(_ => false);
```

With TypeScript, the **when** function only helps to infer the return type. If you want to match complex structure with it, you need to specify the type as generic argument.

```typescript
import { match, when } from "pattern-matching-ts";

type Person = {
  readonly firstName: string; 
}

const john: Person = {
  firstName = "John"
}

const isJohn: boolean = match(john)(
  when<Person>(n => n.firstName === "John")(() => true)
)(_ => false);
```

Enjoy!

## Licence

[MIT](LICENCE)
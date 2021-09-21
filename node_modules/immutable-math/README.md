# immutable-math

[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](http://opensource.org/licenses/MIT)
[![github-issues](https://img.shields.io/github/issues/blueflag/immutable-math.svg)](https://github.com/blueflag/immutable-math/issues)

Some mathematatics for Immutable.js for aggregations and stuff.

[Documentation here](http://blueflag.github.io/immutable-math/).

# install

```
npm install immutable-math
```

# Usage

Functions in this library use partially applied functions.
For example, one way to use `average` is to call it, passing in any parameters required (`average` requires no extra params), then call the returned function passing in your data.

```js
const numbers = fromJS([1,1,1,5]);
return average()(numbers); // returns 2
```

For any immutable-math functions that return an `Iterable`, this design of using a partially applied function allows for easy chaining by using them inside of an `update()` method, if your input `Iterable` has an update function.

```js
return fromJS([1,1,1,5])
    .update(exampleFunction()) // using an exampleFunction from immutable-math in a chain
    .sort()
    .toJS();
```

You can also define a function to perform a specific operation, and use it multiple times by passing in different input data.

```js
const numbersA = fromJS([
	{num: 1},
	{num: 1},
	{num: 1},
	{num: 5}
]);

const numbersB = fromJS([
	{num: 3},
	{num: 5}
]);

const averageByNum = averageBy(ii => ii.get('num'));
const averageA = numbersA.update(averageByNum); // averageA is 2
const averageB = numbersB.update(averageByNum); // averageB is 4
```

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});


/**
 * @module aggregations
 */

/**
 * Finds the minimum number in an `Iterable`. Accepts no parameters.
 *
 * @return {InputFunction} A partially applied function which accepts a single `Iterable`, and returns the result of the operation.
 */

function min() {
  return function (input) {
    return input.isEmpty() ? undefined : input.min();
  };
}

/**
 * Like `min`, but also accepts a `valueMapper` function which allows you to process child properties.
 * @param {ValueMapper} valueMapper A function that allows you to specify what value gets processed on each item in the input `Iterable`.
 * @return {InputFunction} A partially applied function which accepts a single `Iterable`, and returns the result of the operation.
 */

function minBy(valueMapper) {
  return function (input) {
    return min()(input.map(valueMapper));
  };
}

/**
 * Finds the maximum number in an `Iterable`. Accepts no parameters.
 *
 * @return {InputFunction} A partially applied function which accepts a single `Iterable`, and returns the result of the operation.
 */

function max() {
  return function (input) {
    return input.isEmpty() ? undefined : input.max();
  };
}

/**
 * Like `max`, but also accepts a `valueMapper` function which allows you to process child properties.
 * @param {ValueMapper} valueMapper A function that allows you to specify what value gets processed on each item in the input `Iterable`.
 * @return {InputFunction} A partially applied function which accepts a single `Iterable`, and returns the result of the operation.
 */

function maxBy(valueMapper) {
  return function (input) {
    return max()(input.map(valueMapper));
  };
}

/**
* Sums the elements in an `Iterable`. Accepts no parameters.
*
* @return {InputFunction} A partially applied function which accepts a single `Iterable`, and returns the result of the operation.
*/

function sum() {
  return function (input) {
    return input.reduce(function (sum, val) {
      return sum + val;
    }, 0);
  };
}

/**
 * Like `sum`, but also accepts a `valueMapper` function which allows you to process child properties.
 * @param {ValueMapper} valueMapper A function that allows you to specify what value gets summed on each item in the input `Iterable`.
 * @return {InputFunction} A partially applied function which accepts a single `Iterable`, and returns the result of the operation.
 */

function sumBy(valueMapper) {
  return function (input) {
    return sum()(input.map(valueMapper));
  };
}

/**
 * Averages the elements in an `Iterable`. Accepts no parameters.
 *
 * @return {InputFunction} A partially applied function which accepts a single `Iterable`, and returns the result of the operation.
 */

function average() {
  return function (input) {
    return input.isEmpty() ? undefined : sum()(input) / input.count();
  };
}

/**
 * Like `average`, but also accepts a `valueMapper` function which allows you to process child properties.
 * @param {ValueMapper} valueMapper A function that allows you to specify what value gets averaged on each item in the input `Iterable`.
 * @return {InputFunction} A partially applied function which accepts a single `Iterable`, and returns the result of the operation.
 */

function averageBy(valueMapper) {
  return function (input) {
    return average()(input.map(valueMapper));
  };
}

/**
 * An alias for {@link average}.
 * @return {InputFunction} A partially applied function which accepts a single `Iterable`, and returns the result of the operation.
 */

function mean() {
  return average();
}

/**
 * An alias for {@link averageBy}.
 *
 * @param {ValueMapper} valueMapper A function that allows you to specify what value gets averaged on each item in the input `Iterable`.
 * @return {InputFunction} A partially applied function which accepts a single `Iterable`, and returns the result of the operation.
 */

function meanBy(valueMapper) {
  return averageBy(valueMapper);
}

/**
 * Averages the elements in an `Iterable`. Accepts no parameters.
 *
 * @return {InputFunction} A partially applied function which accepts a single `Iterable`, and returns the result of the operation.
 */

function median() {
  return function (input) {
    if (input.isEmpty()) {
      return undefined;
    }
    var sorted = input.sort();
    var count = input.count();
    return count % 2 == 0 ? (sorted.get(count / 2) + sorted.get(count / 2 - 1)) / 2 : sorted.get(Math.floor(count / 2));
  };
}

/**
 * Like `median`, but also accepts a `valueMapper` function which allows you to process child properties.
 *
 * @param {ValueMapper} valueMapper A function that allows you to specify what value gets read from each item in the input `Iterable`.
 * @return {InputFunction} A partially applied function which accepts a single `Iterable`, and returns the result of the operation.
 */

function medianBy(valueMapper) {
  return function (input) {
    return median()(input.map(valueMapper));
  };
}

exports.min = min;
exports.minBy = minBy;
exports.max = max;
exports.maxBy = maxBy;
exports.sum = sum;
exports.sumBy = sumBy;
exports.average = average;
exports.averageBy = averageBy;
exports.mean = mean;
exports.meanBy = meanBy;
exports.median = median;
exports.medianBy = medianBy;

/**
 * InputFunction is a partially applied function returned from aggregations in immutable-math.
 * It accepts an `Iterable` of the data you wish to operate on,
 * and returns the result of the function you're calling.
 *
 * For example, one way to use `average` is to call it, passing in any parameters required (`average requires no extra params`), then call the returned function passing in your data.
 *
 * ```js
 * const numbers = fromJS([1,1,1,5]);
 * return average()(numbers); // returns 2
 * ```
 *
 * For any immutable-math functions that return an `Iterable`, this design of using a partially applied function allows for easy chaining by using them inside of an `update()` method, if your input `Iterable` has an update function.
 * 
 * ```js
 * return fromJS([1,1,1,5])
 *     .update(exampleFunction()) // using an exampleFunction from immutable-math in a chain
 *     .sort()
 *     .toJS();
 * ```
 * 
 *
 * You can also define a function to perform a specific operation, and use it multiple times by passing in different input data.
 * 
 * 
 *  ```js
 * const numbersA = fromJS([
 *  {num: 1},
 *  {num: 1},
 *  {num: 1},
 *  {num: 5}
 * ]);
 * 
 * const numbersB = fromJS([
 *  {num: 3},
 *  {num: 5}
 * ]);
 * 
 * const averageByNum = averageBy(ii => ii.get('num'));
 * const averageA = numbersA.update(averageByNum); // averageA is 2
 * const averageB = numbersB.update(averageByNum); // averageB is 4
 * ```
 *
 * @callback InputFunction
 * @param {Iterable} input The input Iterable to be processed by one of the functions.
 * @return {Number} The result of the function
 */

/**
 * A function required by some operations that allows you to specify what value gets pulled from each item in the input `Iterable` when performing a calculation.
 *
 * @callback ValueMapper
 * @param {*} value The value of the current item in the input `Iterable`.
 * @param {*} key The key of the current item in the input `Iterable`.
 * @param {Iterable} iter The original `input` `Iterable`.
 * @return {Number} The number to use in the operation.
 */
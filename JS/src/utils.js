module.exports.ignoreErrors = function (fn) {
  return function () {
    try {
      return fn.apply(this, arguments);
    } catch {}
  };
};

module.exports.sum = (a, b) => a + b;
module.exports.product = (a, b) => a * b;
module.exports.min = (a, b) => Math.min(a, b);

/**
 * Repeats a given function a specified number of times.
 *
 * @param {number} times - The number of times to repeat the function.
 * @param {Function} fn - The function to be repeated.
 */
module.exports.repeat = (times, fn) => {
  for (let i = 0; i < times; i++) {
    fn();
  }
};

/**
 * Memoizes a function by caching its results.
 * The arguments are serialized to JSON to be used as keys in the cache.
 *
 * WARNING - Non-primitive arguments will be serialized to the same
 * values so be careful when using them as arguments.
 *
 * @param {Function} fn - The function to be memoized
 * @returns {Function} - A memoized version of the function
 */
module.exports.memoize = (fn) => {
  const cache = new Map();

  return function (...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);

    const result = fn.apply(this, args);
    cache.set(key, result);

    return result;
  };
};

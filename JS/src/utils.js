module.exports.ignoreErrors = function (fn) {
  return function () {
    try {
      return fn.apply(this, arguments);
    } catch {}
  };
};

module.exports.sum = (a, b) => a + b;
module.exports.product = (a, b) => a * b;

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

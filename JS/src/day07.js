module.exports.part1 = (input) => {
  return input
    .map(parse)
    .filter((calibration) => isValid1(calibration))
    .map((calibration) => calibration[0])
    .reduce((agg, testValue) => agg + testValue, 0);
};

module.exports.part2 = (input) => {
  return input
    .map(parse)
    .filter((calibration) => isValid2(calibration))
    .map((calibration) => calibration[0])
    .reduce((agg, testValue) => agg + testValue, 0);
};

parse = (line) => {
  const [sTarget, sNumbers] = line.split(": ");
  const target = Number(sTarget);
  const numbers = sNumbers.split(" ").map(Number);
  return [target, numbers];
};

isValid1 = ([target, numbers], soFar = 0) => {
  if (soFar > target) return false;
  if (numbers.length === 0) return soFar === target;
  const [head, ...tail] = numbers;
  return (
    isValid1([target, tail], soFar + head) ||
    isValid1([target, tail], soFar * head)
  );
};

isValid2 = ([target, numbers], soFar = 0) => {
  if (soFar > target) return false;
  if (numbers.length === 0) return soFar === target;
  const [head, ...tail] = numbers;
  return (
    isValid2([target, tail], soFar + head) ||
    isValid2([target, tail], soFar * head) ||
    isValid2([target, tail], Number(`${soFar}${head}`))
  );
};

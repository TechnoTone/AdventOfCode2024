module.exports.part1 = (input) => {
  const matcher = /mul\(\d{1,3}\,\d{1,3}\)/g;
  const matches = input.match(matcher);
  return matches.reduce((agg, instruction) => {
    const [a, b] = instruction.slice(4, -1).split(",");
    return agg + a * b;
  }, 0);
};

module.exports.part2 = (input) => {
  const matcher = /mul\(\d{1,3}\,\d{1,3}\)|do\(\)|don\'t\(\)/g;
  const matches = input.match(matcher);
  return matches.reduce(
    (agg, instruction) => {
      const [enabled, total] = agg;
      if (instruction === "do()") return [true, total];
      if (instruction === "don't()") return [false, total];
      if (!enabled) return agg;
      const [a, b] = instruction.slice(4, -1).split(",");
      return [true, total + a * b];
    },
    [true, 0]
  )[1];
};

const { sum } = require("./utils");

module.exports.part1 = (input) => {
  return countPossibleDesigns(parse(input));
};

module.exports.part2 = (input) => {
  return countAllPossibleDesigns(parse(input));
};

const parse = (input) => {
  const towels = input[0].split(", ");
  const designs = input.slice(2);
  return { towels, designs };
};

const countPossibleDesigns = ({ towels, designs }) => {
  const isPossible = (design) => {
    if (design === "") return true;
    return towels.some((towel) => {
      if (design.startsWith(towel)) {
        return isPossible(design.slice(towel.length));
      }
      return false;
    });
  };

  return designs.filter(isPossible).length;
};

const countAllPossibleDesigns = ({ towels, designs }) => {
  const memo = new Map();

  const possibilities = (design) => {
    if (design === "") return 1;
    if (memo.has(design)) return memo.get(design);

    const count = towels
      .map((towel) => {
        if (design.startsWith(towel)) {
          return possibilities(design.slice(towel.length));
        }
        return 0;
      })
      .reduce(sum);

    memo.set(design, count);
    return count;
  };

  return designs.map(possibilities).reduce(sum);
};

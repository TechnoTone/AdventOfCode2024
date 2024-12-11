module.exports.part1 = (input) => {
  return blink(parse(input), 25);
};

module.exports.part2 = (input) => {
  return blink(parse(input), 75);
};

const parse = (input) => input.split(" ").map(Number);

const blink = (stones, times) => {
  // Memo is a Map of Maps.
  // The outer map is the number of times to blink.
  // The inner map is the stone value to blink.
  // The value of the inner map is the resulting number of stones.
  const memo = new Map();
  Array(times)
    .fill(null)
    .forEach((_, ix) => memo.set(ix + 1, new Map()));

  const blinkStone = (stone) => {
    if (stone === 0) return [1];
    const stoneStr = stone.toString();
    if (stoneStr.length % 2) return [stone * 2024];
    return [
      Number(stoneStr.slice(0, stoneStr.length / 2)),
      Number(stoneStr.slice(stoneStr.length / 2)),
    ];
  };

  const blinker = (stone, times) => {
    if (times === 0) return 1;

    if (memo.get(times).has(stone)) return memo.get(times).get(stone);

    const blinkResult = blinkStone(stone);
    const result = blinkResult.reduce(
      (acc, stone) => acc + blinker(stone, times - 1),
      0
    );

    memo.get(times).set(stone, result);
    return result;
  };

  return stones.reduce((acc, stone) => acc + blinker(stone, times), 0);
};

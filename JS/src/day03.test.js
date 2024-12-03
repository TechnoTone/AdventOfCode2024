const { test } = require("@jest/globals");
const { part1, part2 } = require("./day03");
const Input = require("./input");
const EXAMPLE_INPUT_1 =
  "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))";
const EXAMPLE_INPUT_2 =
  "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))";

test("Part 1 Example", () => {
  expect(part1(EXAMPLE_INPUT_1)).toBe(161);
});

test("Part 1", () => {
  const input = new Input(3).get();
  expect(part1(input)).toBe(182619815);
});

test("Part 2 Example", () => {
  expect(part2(EXAMPLE_INPUT_2)).toBe(48);
});

test("Part 2", () => {
  const input = new Input(3).get();
  expect(part2(input)).toBe(80747545);
});
